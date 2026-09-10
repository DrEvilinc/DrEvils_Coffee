const SHOP_BASE = 'https://shop.drevil.coffee';

// Keep in sync with live products at shop.drevil.coffee
export interface Coffee {
  id: string;
  /** Base SKU (LAB-001..LAB-006). Roast variants append -LV / -FC / -MO. */
  sku: string;
  /** Shopify product handle at shop.drevil.coffee. */
  handle: string;
  shopUrl: string;
  /** Card image (origin landscape). Travels with the record so re-ordering never misaligns it. */
  image: string;
  origin: string;
  producer: string;
  variety?: string;
  process: string;
  elevation: string;
  tier: string;
  tierLabel: string;
  descriptor: string;
  flavorProfile: string[];
  description: string[];
  flame: number;
  clarity: number;
  lotSize: number;
  organic?: boolean;
}

const catalog: Coffee[] = [
  {
    id: 'colombia-santa-isabel',
    sku: 'LAB-005',
    handle: 'lab-005-colombia-edward-sandoval-chiroso',
    shopUrl: `${SHOP_BASE}/products/lab-005-colombia-edward-sandoval-chiroso`,
    image:
      'https://images.unsplash.com/photo-1620292361418-f48e64590736?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvbWJpYSUyMGNvZmZlZSUyMHBsYW50YXRpb24lMjBhbmRlc3xlbnwxfHx8fDE3NzI1OTQwMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    origin: 'COLOMBIA — SANTA ISABEL',
    producer: 'Edward Sandoval',
    variety: 'Chiroso',
    process: 'Washed',
    elevation: '1,850 MASL',
    tier: 'A',
    tierLabel: 'Precision',
    descriptor: 'Floral sweetness. Tartaric lift. Light-bodied and articulate.',
    flavorProfile: ['Panela', 'White grape', 'Hibiscus', 'Dried mango'],
    description: [
      'This high-altitude Chiroso is roasted lightly to preserve its aromatics and delicate acidity. The cup is structured yet transparent, built around clarity rather than weight.',
      'Development is restrained. The finish is tea-like and clean.',
    ],
    flame: 2.5,
    clarity: 5,
    lotSize: 20,
  },
  {
    id: 'colombia-aponte',
    sku: 'LAB-001',
    handle: 'lab-001-colombia-honey-aponte-javier-janamejoy',
    shopUrl: `${SHOP_BASE}/products/lab-001-colombia-honey-aponte-javier-janamejoy`,
    image:
      'https://images.unsplash.com/photo-1756121422046-8a3638d75efb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvbWJpYW4lMjBjb2ZmZWUlMjBjaGVycmllcyUyMGhhcnZlc3R8ZW58MXx8fHwxNzcyNTk0MDEyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    origin: 'COLOMBIA — APONTE',
    producer: 'Javier Janamejoy',
    process: 'Honey Process',
    elevation: '1,850 MASL',
    tier: 'S',
    tierLabel: 'Structure',
    descriptor: 'Dense sweetness. Dried fruit. Spice.',
    flavorProfile: ['Date sugar', 'Black cherry', 'Tamarind', 'Cocoa'],
    description: [
      'Honey processing creates weight without heaviness. The body is thick, the finish long and bittersweet. Fruit rises through chocolate tones with controlled acidity.',
      'Roasted to emphasize depth while preserving fruit character.',
      'Built for espresso or structured pour-over.',
    ],
    flame: 4,
    clarity: 3.5,
    lotSize: 12,
  },
  {
    id: 'colombia-buesaco',
    sku: 'LAB-006',
    handle: 'lab-006-colombia-buesaco-alianza-granjeros',
    shopUrl: `${SHOP_BASE}/products/lab-006-colombia-buesaco-alianza-granjeros`,
    image:
      'https://images.unsplash.com/photo-1712607613395-3f0612ad16eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvbWJpYSUyMGNvZmZlZSUyMGZhcm0lMjBtb3VudGFpbnxlbnwxfHx8fDE3NzI1OTQwMTJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    origin: 'COLOMBIA — BUESACO',
    producer: 'Alianza Granjeros',
    variety: 'Caturra, Colombia, Typica',
    process: 'Washed',
    elevation: '1,900 MASL',
    tier: 'FOUNDATION',
    tierLabel: 'Foundation Series',
    descriptor: 'Caramel sweetness. Balanced acidity. Bittersweet chocolate.',
    flavorProfile: ['Caramel', 'Unrefined sugar', 'Bittersweet chocolate', 'Pistachio', 'Dried fruit'],
    description: [
      'From the Alianza Granjeros cooperative in Buesaco, Nariño — approachable enough for daily drinking, complex enough to keep you interested.',
      'Caramel and unrefined sugar sweetness at the center, well-balanced acidity, bittersweet chocolate, a hint of pistachio, and subtle dried fruit in the finish.',
      'Push to fuller development and it becomes a formidable espresso base. Your everyday evil.',
    ],
    flame: 4,
    clarity: 3.5,
    lotSize: 40,
  },
  {
    id: 'ethiopia-gera',
    sku: 'LAB-003',
    handle: 'lab-003-ethiopia-organic-gera-nano-challa',
    shopUrl: `${SHOP_BASE}/products/lab-003-ethiopia-organic-gera-nano-challa`,
    image:
      'https://images.unsplash.com/photo-1712553935892-1c537df3e96c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxldGhpb3BpYSUyMGNvZmZlZSUyMHBsYW50YXRpb24lMjBoaWdobGFuZHN8ZW58MXx8fHwxNzcxMTQxNTI4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    origin: 'ETHIOPIA — GERA',
    producer: 'Nano Challa',
    process: 'Washed',
    elevation: '1,900–2,100 MASL',
    tier: 'A',
    tierLabel: 'Precision Fruit',
    descriptor: 'Fruited clarity. Honeyed sweetness.',
    flavorProfile: ['Peach', 'Apricot', 'Orange marmalade', 'Black tea'],
    description: [
      'Heirloom varieties grown at elevation deliver bright acidity with dark honey structure beneath. Floral notes linger as the cup cools.',
      'Medium development highlights fruit without fermentation excess.',
      'Clean. Expressive. Layered.',
    ],
    flame: 3,
    clarity: 4.5,
    lotSize: 80,
    organic: true,
  },
  {
    id: 'peru-cajamarca',
    sku: 'LAB-002',
    handle: 'lab-002-peru-huabal-san-pablo',
    shopUrl: `${SHOP_BASE}/products/lab-002-peru-huabal-san-pablo`,
    image:
      'https://images.unsplash.com/photo-1752067954948-fad43a7457de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJ1JTIwY29mZmVlJTIwZmFybSUyMG1vdW50YWluc3xlbnwxfHx8fDE3NzExNDE1MjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    origin: 'PERU — CAJAMARCA',
    producer: 'Huabal San Pablo',
    process: 'Washed',
    elevation: '1,900–2,000 MASL',
    tier: 'FOUNDATION',
    tierLabel: 'Foundation Series',
    descriptor: 'Sweet structure. Quiet complexity.',
    flavorProfile: ['Honey', 'Brown sugar', 'Torrone', 'Red apple', 'Dark chocolate'],
    description: [
      'Balanced across roast levels, this lot moves from layered sweetness to chocolate depth seamlessly. Satiny body. Clean finish.',
      'Approachable without being ordinary.',
    ],
    flame: 3.5,
    clarity: 4,
    lotSize: 32,
  },
  {
    id: 'yemen-haima',
    sku: 'LAB-004',
    handle: 'lab-004-yemen-mokha-haimi',
    shopUrl: `${SHOP_BASE}/products/lab-004-yemen-mokha-haimi`,
    image:
      'https://images.unsplash.com/photo-1759458494971-377d0492243c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5ZW1lbiUyMGNvZmZlZSUyMHRlcnJhY2VzJTIwbW91bnRhaW58ZW58MXx8fHwxNzcxMTQxNTI1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    origin: 'YEMEN — HAIMA DISTRICT',
    producer: 'Mokha Haimi',
    process: 'Natural',
    elevation: 'Mountain Grown',
    tier: 'X',
    tierLabel: 'Wild',
    descriptor: 'Rustic intensity. Ancient character.',
    flavorProfile: ['Molasses', 'Dried date', 'Cedar', 'Whole spice', 'Black pepper'],
    description: [
      'This is origin-driven complexity. Dense body. Tangy bittersweetness. Long, brooding finish.',
      'Roasted into Full City to develop its dark aromatic structure. Resting is essential.',
      'This coffee does not aim for cleanliness. It aims for depth.',
    ],
    flame: 5,
    clarity: 2.5,
    lotSize: 51,
  },
];

/**
 * Display order is ALWAYS LAB-001 -> LAB-006, sequential. Sorting here means
 * nobody has to remember that when they add or edit a record above.
 */
export const coffees: Coffee[] = [...catalog].sort((a, b) =>
  a.sku.localeCompare(b.sku)
);

export const coffeeBySku = (sku: string) =>
  coffees.find((c) => c.sku === sku.toUpperCase());
