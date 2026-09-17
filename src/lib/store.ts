import { promises as fs } from "fs";
import path from "path";
import { watches, type Watch } from "./catalog";

const dataDir = process.env.VERCEL
  ? path.join("/tmp", "reflector-data")
  : path.join(process.cwd(), "data");

type Inquiry = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  city: string;
  watchSlug?: string;
  message: string;
  source: string;
};

type Subscriber = { id: string; email: string; createdAt: string };
type DatabaseShape = { inquiries: Inquiry[]; subscribers: Subscriber[] };

const emptyDb: DatabaseShape = { inquiries: [], subscribers: [] };
let memoryDb: DatabaseShape = { inquiries: [], subscribers: [] };

function filePath() {
  return path.join(dataDir, "atelier.json");
}

async function ensure() {
  await fs.mkdir(dataDir, { recursive: true });
  try {
    await fs.access(filePath());
  } catch {
    await fs.writeFile(filePath(), JSON.stringify(emptyDb, null, 2), "utf8");
  }
}

async function readDb(): Promise<DatabaseShape> {
  try {
    await ensure();
    const raw = await fs.readFile(filePath(), "utf8");
    const parsed = JSON.parse(raw) as DatabaseShape;
    memoryDb = {
      inquiries: Array.isArray(parsed.inquiries) ? parsed.inquiries : [],
      subscribers: Array.isArray(parsed.subscribers) ? parsed.subscribers : [],
    };
    return memoryDb;
  } catch {
    return {
      inquiries: [...memoryDb.inquiries],
      subscribers: [...memoryDb.subscribers],
    };
  }
}

async function writeDb(db: DatabaseShape) {
  memoryDb = {
    inquiries: [...db.inquiries],
    subscribers: [...db.subscribers],
  };
  try {
    await ensure();
    await fs.writeFile(filePath(), JSON.stringify(db, null, 2), "utf8");
  } catch {
    // Serverless disks can be read-only outside /tmp; memory still accepts the row.
  }
}

function id(prefix: string) {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function clean(value: unknown, max = 400) {
  return String(value ?? "").trim().slice(0, max);
}

export function listWatches(): Watch[] {
  return watches;
}

export function findWatch(slug: string): Watch | null {
  return watches.find((item) => item.slug === slug) ?? null;
}

export async function addInquiry(input: {
  name: unknown;
  email: unknown;
  city?: unknown;
  watchSlug?: unknown;
  message?: unknown;
  source?: unknown;
}) {
  const name = clean(input.name, 80);
  const email = clean(input.email, 120).toLowerCase();
  const city = clean(input.city, 80);
  const watchSlug = clean(input.watchSlug, 40);
  const message = clean(input.message, 1200);
  const source = clean(input.source, 40) || "site";

  if (name.length < 2) throw new Error("Please enter your name.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Please enter a valid email.");
  }
  if (watchSlug && !findWatch(watchSlug)) {
    throw new Error("That reference is not in the current collection.");
  }

  const db = await readDb();
  const inquiry: Inquiry = {
    id: id("inq"),
    createdAt: new Date().toISOString(),
    name,
    email,
    city,
    watchSlug: watchSlug || undefined,
    message,
    source,
  };
  db.inquiries.unshift(inquiry);
  db.inquiries = db.inquiries.slice(0, 500);
  await writeDb(db);
  return inquiry;
}

export async function addSubscriber(emailRaw: unknown) {
  const email = clean(emailRaw, 120).toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Please enter a valid email.");
  }
  const db = await readDb();
  const exists = db.subscribers.some((row) => row.email === email);
  if (exists) return { already: true, email };
  db.subscribers.unshift({
    id: id("sub"),
    email,
    createdAt: new Date().toISOString(),
  });
  db.subscribers = db.subscribers.slice(0, 2000);
  await writeDb(db);
  return { already: false, email };
}

export async function stats() {
  const db = await readDb();
  return {
    watches: watches.length,
    inquiries: db.inquiries.length,
    subscribers: db.subscribers.length,
    ok: true,
  };
}
