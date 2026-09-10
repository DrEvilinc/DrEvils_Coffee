/**
 * Shopify Storefront API cart helper for Dr. Evil's Coffee.
 *
 * Grind travels as a line-item ATTRIBUTE (Storefront API's name for what the
 * Admin/Liquid side calls a line-item property). Roast and bag size are baked
 * into the variant id (catalog option A), so they are never duplicated as
 * attributes, except before that import, when roast still rides as one.
 *
 * Env (Vite):
 *   VITE_SHOPIFY_DOMAIN=shop.drevil.coffee
 *   VITE_SHOPIFY_STOREFRONT_TOKEN=<public storefront access token>
 *   VITE_SHOPIFY_API_VERSION=2025-07   (optional)
 *
 * The Storefront token is public by design — it is scoped to unauthenticated
 * read + cart write. The Admin token must never appear in this bundle.
 */

const DOMAIN = import.meta.env.VITE_SHOPIFY_DOMAIN as string;
const TOKEN = import.meta.env.VITE_SHOPIFY_STOREFRONT_TOKEN as string;
const API_VERSION =
  (import.meta.env.VITE_SHOPIFY_API_VERSION as string) || "2025-07";

const ENDPOINT = `https://${DOMAIN}/api/${API_VERSION}/graphql.json`;
const CART_KEY = "drevil.cartId";

/** True when the bundle was built with Storefront credentials. */
export const isStorefrontConfigured = () => Boolean(DOMAIN && TOKEN);

export interface CartAttribute {
  key: string;
  value: string;
}

export interface CartLineInput {
  variantId: string;
  quantity?: number;
  attributes?: CartAttribute[];
}

export interface CartSummary {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
}

class StorefrontError extends Error {
  constructor(message: string, readonly detail?: unknown) {
    super(message);
    this.name = "StorefrontError";
  }
}

async function storefront<T>(
  query: string,
  variables: Record<string, unknown> = {}
): Promise<T> {
  if (!DOMAIN || !TOKEN) {
    throw new StorefrontError(
      "Shopify Storefront env vars are missing (VITE_SHOPIFY_DOMAIN / VITE_SHOPIFY_STOREFRONT_TOKEN)."
    );
  }

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new StorefrontError(`Storefront HTTP ${res.status}`, await res.text());
  }

  const json = await res.json();
  if (json.errors?.length) {
    throw new StorefrontError(json.errors[0]?.message ?? "GraphQL error", json.errors);
  }
  return json.data as T;
}

const CART_FRAGMENT = `
  fragment CartBits on Cart {
    id
    checkoutUrl
    totalQuantity
  }
`;

const CART_CREATE = `
  ${CART_FRAGMENT}
  mutation CartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart { ...CartBits }
      userErrors { field message }
    }
  }
`;

const CART_LINES_ADD = `
  ${CART_FRAGMENT}
  mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart { ...CartBits }
      userErrors { field message }
    }
  }
`;

const CART_QUERY = `
  ${CART_FRAGMENT}
  query CartGet($cartId: ID!) {
    cart(id: $cartId) { ...CartBits }
  }
`;

const PRODUCT_VARIANTS = `
  query ProductVariants($handle: String!) {
    product(handle: $handle) {
      id
      variants(first: 100) {
        nodes {
          id
          sku
          availableForSale
          price { amount currencyCode }
          selectedOptions { name value }
        }
      }
    }
  }
`;

export interface VariantInfo {
  id: string;
  sku: string | null;
  availableForSale: boolean;
  price: { amount: string; currencyCode: string } | null;
  /** Option name (lower-cased) -> value, e.g. { roast: "Full Charge", "bag size": "12 oz" }. */
  options: Record<string, string>;
}

/** Every variant of one product, with its options normalised for matching. */
export async function fetchVariants(handle: string): Promise<VariantInfo[]> {
  const data = await storefront<{
    product: {
      variants: {
        nodes: {
          id: string;
          sku: string | null;
          availableForSale: boolean;
          price: { amount: string; currencyCode: string } | null;
          selectedOptions: { name: string; value: string }[];
        }[];
      };
    } | null;
  }>(PRODUCT_VARIANTS, { handle });

  return (data.product?.variants.nodes ?? []).map((v) => ({
    id: v.id,
    sku: v.sku,
    availableForSale: v.availableForSale,
    price: v.price ?? null,
    options: Object.fromEntries(
      v.selectedOptions.map((o) => [o.name.trim().toLowerCase(), o.value])
    ),
  }));
}

export interface VariantWant {
  roast: string;
  bagSize: string;
  /** Only consulted while the legacy "Grind size" option still exists. */
  legacyGrind?: string;
}

/**
 * Pick the variant for a roast + bag size. Works on both catalog shapes:
 *   option A (Roast x Bag Size)            -> exact match on both
 *   legacy   (Bag Size x Grind size)       -> match size + nearest legacy grind;
 *                                             roast must then travel as an attribute
 * Options the variant doesn't carry are ignored, and so is "Default Title".
 */
export function resolveVariant(
  variants: VariantInfo[],
  want: VariantWant
): { variant: VariantInfo; roastIsVariant: boolean } | null {
  const eq = (a?: string, b?: string) =>
    (a ?? "").trim().toLowerCase() === (b ?? "").trim().toLowerCase();

  const match = variants.find((v) => {
    const o = v.options;
    if ("roast" in o && !eq(o.roast, want.roast)) return false;
    if ("bag size" in o && !eq(o["bag size"], want.bagSize)) return false;
    if ("grind size" in o && want.legacyGrind && !eq(o["grind size"], want.legacyGrind))
      return false;
    return true;
  });
  return match ? { variant: match, roastIsVariant: "roast" in match.options } : null;
}

function readCartId(): string | null {
  try {
    return window.localStorage.getItem(CART_KEY);
  } catch {
    return null;
  }
}

function writeCartId(id: string) {
  try {
    window.localStorage.setItem(CART_KEY, id);
  } catch {
    /* private mode / blocked storage — cart still works for this page load */
  }
}

function toLines(input: CartLineInput[]) {
  return input.map((l) => ({
    merchandiseId: l.variantId,
    quantity: l.quantity ?? 1,
    attributes: l.attributes ?? [],
  }));
}

/** Returns the existing cart id if Shopify still recognises it, else null. */
async function resolveCartId(): Promise<string | null> {
  const id = readCartId();
  if (!id) return null;
  try {
    const data = await storefront<{ cart: CartSummary | null }>(CART_QUERY, {
      cartId: id,
    });
    return data.cart ? id : null;
  } catch {
    return null;
  }
}

/**
 * Add a configured bag to the cart. Creates the cart on first call, reuses it
 * after. A cart that Shopify has expired is transparently replaced.
 */
export async function addToCart(
  lines: CartLineInput[]
): Promise<CartSummary> {
  const payload = toLines(lines);
  const cartId = await resolveCartId();

  if (cartId) {
    const data = await storefront<{
      cartLinesAdd: { cart: CartSummary | null; userErrors: { message: string }[] };
    }>(CART_LINES_ADD, { cartId, lines: payload });

    const { cart, userErrors } = data.cartLinesAdd;
    if (cart) {
      writeCartId(cart.id);
      return cart;
    }
    if (userErrors?.length) {
      throw new StorefrontError(userErrors[0].message, userErrors);
    }
  }

  const data = await storefront<{
    cartCreate: { cart: CartSummary | null; userErrors: { message: string }[] };
  }>(CART_CREATE, { lines: payload });

  const { cart, userErrors } = data.cartCreate;
  if (!cart) {
    throw new StorefrontError(
      userErrors?.[0]?.message ?? "Could not create cart",
      userErrors
    );
  }
  writeCartId(cart.id);
  return cart;
}

export function goToCheckout(cart: CartSummary) {
  window.location.href = cart.checkoutUrl;
}

export { StorefrontError };
