export type Watch = {
  slug: string;
  name: string;
  collection: string;
  tagline: string;
  price: number;
  currency: string;
  image: string;
  caseSize: string;
  caseMaterial: string;
  movement: string;
  water: string;
  strap: string;
  limited: boolean;
  edition?: string;
  description: string;
  highlights: string[];
};

export const maison = {
  name: "REFLECTOR",
  founded: 2018,
  city: "Geneva",
  tagline: "Light, held in time.",
  email: "atelier@reflector.watch",
  phone: "+41 22 555 0140",
};

export const watches: Watch[] = [
  {
    slug: "aurora",
    name: "Aurora",
    collection: "Atelier",
    tagline: "Rose gold. Quiet fire.",
    price: 8400,
    currency: "USD",
    image: "/watches/aurora.jpg",
    caseSize: "40 mm",
    caseMaterial: "18k 5N rose gold",
    movement: "RF-71 automatic, 70h reserve",
    water: "50 m",
    strap: "Alligator, hand-stitched",
    limited: false,
    description: "Aurora is the maison’s dress watch reduced to light. A champagne sunburst dial is cut so a single beam can travel from index to index.",
    highlights: ["Hand-finished sunburst dial", "Domed sapphire with inner anti-reflective coat", "Solid gold dauphine hands", "Geneva atelier regulation"],
  },
  {
    slug: "nocturne",
    name: "Nocturne",
    collection: "City",
    tagline: "Steel that disappears after dark.",
    price: 6250,
    currency: "USD",
    image: "/watches/nocturne.jpg",
    caseSize: "41 mm",
    caseMaterial: "316L steel, mixed finish",
    movement: "RF-40 automatic, date",
    water: "100 m",
    strap: "Integrated steel bracelet",
    limited: false,
    description: "Nocturne is built for the hours after work. A black sunburst dial, sharp indices, and an integrated bracelet that sits low on the wrist.",
    highlights: ["Integrated bracelet with on-the-fly clasp", "Date at 3 with a black disk", "Brushed-polished case architecture", "100 m water resistance"],
  },
  {
    slug: "meridian",
    name: "Meridian",
    collection: "Complication",
    tagline: "A movement, left unhidden.",
    price: 24800,
    currency: "USD",
    image: "/watches/meridian.jpg",
    caseSize: "41.5 mm",
    caseMaterial: "Black DLC titanium & rose gold",
    movement: "RF-S9 skeleton, flying tourbillon",
    water: "30 m",
    strap: "Black alligator",
    limited: true,
    edition: "99 pieces",
    description: "Meridian opens the architecture. Bridges are black-polished and skeletonized by hand. A flying tourbillon sits at six.",
    highlights: ["In-house flying tourbillon", "Hand-skeletonized bridges", "DLC titanium mid-case, rose gold bezel", "Limited to 99 numbered pieces"],
  },
  {
    slug: "celeste",
    name: "Céleste",
    collection: "Atelier",
    tagline: "Ice light on platinum.",
    price: 19200,
    currency: "USD",
    image: "/watches/celeste.jpg",
    caseSize: "36 mm",
    caseMaterial: "950 platinum",
    movement: "RF-36 automatic",
    water: "30 m",
    strap: "Navy alligator",
    limited: false,
    description: "Céleste is cut for evening and for quieter days. An ice-blue fumé dial is set with twelve diamond indices.",
    highlights: ["950 platinum case", "Ice-blue fumé dial", "Twelve diamond indices", "36 mm elegant proportion"],
  },
  {
    slug: "littoral",
    name: "Littoral",
    collection: "Element",
    tagline: "Bronze that keeps a season.",
    price: 7100,
    currency: "USD",
    image: "/watches/littoral.jpg",
    caseSize: "40 mm",
    caseMaterial: "CuSn8 bronze",
    movement: "RF-40 automatic",
    water: "200 m",
    strap: "Tropical rubber",
    limited: false,
    description: "Littoral is the maison’s tool watch. A bronze case will take on the owner’s weather. The brown fumé dial stays readable in glare.",
    highlights: ["CuSn8 bronze case and bezel", "200 m water resistance", "Lumed block indices", "Quick-release tropical strap"],
  },
  {
    slug: "verdant",
    name: "Verdant",
    collection: "City",
    tagline: "Two metals. One green.",
    price: 9800,
    currency: "USD",
    image: "/watches/verdant.jpg",
    caseSize: "39 mm",
    caseMaterial: "Steel and 18k gold",
    movement: "RF-39 automatic",
    water: "100 m",
    strap: "Integrated two-tone bracelet",
    limited: false,
    description: "Verdant is the maison’s integrated sports watch in two tones. A deep green sunburst dial sits inside a gold bezel.",
    highlights: ["Steel and 18k gold architecture", "Green sunburst dial", "Integrated bracelet", "39 mm balanced case"],
  },
];

export function formatPrice(value: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function getWatch(slug: string) {
  return watches.find((watch) => watch.slug === slug) ?? null;
}

export function getCollections() {
  return [...new Set(watches.map((watch) => watch.collection))];
}
