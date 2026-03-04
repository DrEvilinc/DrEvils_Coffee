export interface Coffee {
  id: string;
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
    id: 'costa-rica-zarcero',
    origin: 'COSTA RICA — ZARCERO',
    producer: 'Monte Brisas — Villa Sarchi',
    process: 'Washed',
    elevation: '1,500–1,750 MASL',
    tier: 'FOUNDATION',
    tierLabel: 'Foundation Series',
    descriptor: 'Balanced. Versatile. Controlled.',
    flavorProfile: ['Raw sugar', 'Apple', 'Cocoa nibs', 'Toffee almond'],
    description: [
      'This lot bridges brightness and chocolate. At lighter development it presents tea-like structure and brisk acidity. Darker, it moves into espresso territory with chocolate core and almond sweetness.',
      'A daily driver without compromise.',
    ],
    flame: 3.5,
    clarity: 4,
    lotSize: 40,
  },
  {
    id: 'ethiopia-gera',
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
