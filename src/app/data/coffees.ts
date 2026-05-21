const SHOP_BASE = 'https://shop.drevil.coffee';

// Keep in sync with live products at shop.drevil.coffee
export interface Coffee {
  id: string;
  shopUrl: string;
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

export const coffees: Coffee[] = [
  {
    id: 'colombia-santa-isabel',
    shopUrl: `${SHOP_BASE}/products/lab-005-colombia-edward-sandoval-chiroso`,
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
    shopUrl: `${SHOP_BASE}/products/lab-001-colombia-honey-aponte-javier-janamejoy`,
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
    shopUrl: `${SHOP_BASE}/products/lab-006-colombia-buesaco-alianza-granjeros`,
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
    shopUrl: `${SHOP_BASE}/products/lab-003-ethiopia-organic-gera-nano-challa`,
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
    shopUrl: `${SHOP_BASE}/products/lab-002-peru-huabal-san-pablo`,
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
    shopUrl: `${SHOP_BASE}/products/lab-004-yemen-mokha-haimi`,
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
