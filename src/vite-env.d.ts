/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SITE_URL?: string;
  readonly VITE_WAITLIST_API_URL?: string;
  /** shop.drevil.coffee — enables the direct Storefront cart path. */
  readonly VITE_SHOPIFY_DOMAIN?: string;
  /** PUBLIC Storefront access token (cart-scoped). Never the Admin token. */
  readonly VITE_SHOPIFY_STOREFRONT_TOKEN?: string;
  readonly VITE_SHOPIFY_API_VERSION?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
