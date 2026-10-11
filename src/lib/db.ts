import fs from 'node:fs';
import path from 'node:path';
import type { DB, Product, Project } from './types';
import { seedDB } from './seed';

/**
 * Demo-mode data store.
 *
 * When Supabase environment variables are NOT configured, the site runs on a
 * local JSON database (data/db.json) so every feature (products, portfolio,
 * enquiries, admin CRUD) works end-to-end without faking anything.
 *
 * In production on Vercel, connect Supabase (see supabase/schema.sql and
 * README.md): the same data model is mirrored in PostgreSQL with Row Level
 * Security, and this file-based store is replaced by the Supabase client.
 */
const DB_PATH = path.join(process.cwd(), 'data', 'db.json');

let cache: DB | null = null;
let writable = true;

export function isSupabaseConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export function isDemoMode(): boolean {
  return !isSupabaseConfigured();
}

export function getDB(): DB {
  if (cache) return cache;
  try {
    cache = JSON.parse(fs.readFileSync(DB_PATH, 'utf8')) as DB;
  } catch {
    cache = seedDB();
    persist(cache);
  }
  return cache;
}

export function saveDB(db: DB): void {
  cache = db;
  persist(db);
}

function persist(db: DB): void {
  try {
    fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
    fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
    writable = true;
  } catch {
    // Read-only filesystem (e.g. serverless production without Supabase):
    // keep working from memory for the life of the instance.
    writable = false;
  }
}

export function storageIsWritable(): boolean {
  return writable;
}

/* ── public read helpers ─────────────────────────────────────────────── */

export function publicProducts(): Product[] {
  return getDB().products.filter((p) => p.published);
}

export function getProductBySlug(slug: string): Product | undefined {
  return getDB().products.find((p) => p.slug === slug && p.published);
}

export function publicProjects(): Project[] {
  return getDB().projects.filter((p) => p.published);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getDB().projects.find((p) => p.slug === slug && p.published);
}

export function relatedProducts(product: Product, count = 4): Product[] {
  return publicProducts()
    .filter((p) => p.id !== product.id)
    .sort((a, b) => {
      const sameCatA = a.category === product.category ? 0 : 1;
      const sameCatB = b.category === product.category ? 0 : 1;
      return sameCatA - sameCatB || b.createdAt.localeCompare(a.createdAt);
    })
    .slice(0, count);
}
