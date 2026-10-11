'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import fs from 'node:fs';
import path from 'node:path';
import { getDB, saveDB } from './db';
import { createSession, destroySession, requireAdmin, verifyDemoCredentials } from './auth';
import { slugify, uid } from './format';
import {
  consultationSchema,
  contactSchema,
  productFormSchema,
  projectFormSchema,
  serviceFormSchema,
  settingsFormSchema,
  type ConsultationInput,
  type ContactInput,
  type ProductFormInput,
  type ProjectFormInput,
  type ServiceFormInput,
  type SettingsFormInput,
} from './zod-schemas';
import type { ConsultationStatus, EnquiryStatus } from './types';

type Result = { ok: true; id?: string } | { ok: false; error: string };

/* ── auth ────────────────────────────────────────────────────────────── */

export async function loginAction(_prevState: Result | null, formData: FormData): Promise<Result | null> {
  const email = String(formData.get('email') ?? '');
  const password = String(formData.get('password') ?? '');
  if (!verifyDemoCredentials(email, password)) {
    return { ok: false, error: 'Invalid email or password. Demo credentials are shown on this page.' };
  }
  await createSession();
  redirect('/admin');
}

export async function logoutAction(): Promise<void> {
  await destroySession();
  redirect('/admin/login');
}

/* ── public forms ────────────────────────────────────────────────────── */

export async function submitConsultation(input: ConsultationInput): Promise<Result> {
  const parsed = consultationSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid form data.' };
  const db = getDB();
  const record = {
    id: uid(),
    ...parsed.data,
    email: parsed.data.email || '',
    budget: parsed.data.budget ?? '',
    preferredDate: parsed.data.preferredDate ?? '',
    status: 'new' as const,
    createdAt: new Date().toISOString(),
  };
  db.consultations.unshift(record);
  saveDB(db);
  revalidatePath('/admin', 'layout');
  return { ok: true, id: record.id };
}

export async function submitEnquiry(input: ContactInput & { source?: string }): Promise<Result> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid form data.' };
  const db = getDB();
  const record = {
    id: uid(),
    name: parsed.data.name,
    phone: parsed.data.phone || '',
    email: parsed.data.email || '',
    message: parsed.data.message,
    source: input.source || 'contact',
    status: 'new' as const,
    createdAt: new Date().toISOString(),
  };
  db.enquiries.unshift(record);
  saveDB(db);
  revalidatePath('/admin', 'layout');
  return { ok: true, id: record.id };
}

/* ── admin: products ─────────────────────────────────────────────────── */

export async function saveProduct(id: string, input: ProductFormInput): Promise<Result> {
  await requireAdmin();
  const parsed = productFormSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid product data.' };
  const d = parsed.data;
  const price = d.price.trim() === '' ? null : Number(d.price);
  if (price !== null && (!Number.isFinite(price) || price < 0)) {
    return { ok: false, error: 'Price must be zero or a positive number.' };
  }
  const images = d.imagesText.split(/\n+/).map((s) => s.trim()).filter(Boolean);
  const db = getDB();
  if (id) {
    const existing = db.products.find((p) => p.id === id);
    if (!existing) return { ok: false, error: 'Product not found.' };
    Object.assign(existing, {
      name: d.name, category: d.category, price, description: d.description,
      images, stock: d.stock, published: d.published,
      slug: uniqueSlug(db.products.map((p) => p.slug), slugify(d.name), id),
    });
  } else {
    db.products.unshift({
      id: uid(),
      slug: uniqueSlug(db.products.map((p) => p.slug), slugify(d.name)),
      name: d.name, category: d.category, price, description: d.description,
      images, stock: d.stock, published: d.published, featured: false,
      createdAt: new Date().toISOString().slice(0, 10),
    });
  }
  saveDB(db);
  revalidatePath('/', 'layout');
  return { ok: true };
}

export async function deleteProduct(id: string): Promise<Result> {
  await requireAdmin();
  const db = getDB();
  db.products = db.products.filter((p) => p.id !== id);
  db.settings.featuredProductIds = db.settings.featuredProductIds.filter((f) => f !== id);
  saveDB(db);
  revalidatePath('/', 'layout');
  return { ok: true };
}

/* ── admin: projects ─────────────────────────────────────────────────── */

export async function saveProject(id: string, input: ProjectFormInput): Promise<Result> {
  await requireAdmin();
  const parsed = projectFormSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid project data.' };
  const d = parsed.data;
  const images = d.imagesText.split(/\n+/).map((s) => s.trim()).filter(Boolean);
  const cover = images.includes(d.cover) ? d.cover : images[0];
  const materials = d.materialsText.split(/\n+/).map((s) => s.trim()).filter(Boolean);
  const db = getDB();
  if (id) {
    const existing = db.projects.find((p) => p.id === id);
    if (!existing) return { ok: false, error: 'Project not found.' };
    Object.assign(existing, {
      title: d.title, category: d.category, location: d.location, cover, images,
      summary: d.summary, approach: d.approach, materials, published: d.published,
      slug: uniqueSlug(db.projects.map((p) => p.slug), slugify(d.title), id),
    });
  } else {
    db.projects.unshift({
      id: uid(),
      slug: uniqueSlug(db.projects.map((p) => p.slug), slugify(d.title)),
      title: d.title, category: d.category, location: d.location, cover, images,
      summary: d.summary, approach: d.approach, materials, published: d.published,
      featured: false, createdAt: new Date().toISOString().slice(0, 10),
    });
  }
  saveDB(db);
  revalidatePath('/', 'layout');
  return { ok: true };
}

export async function deleteProject(id: string): Promise<Result> {
  await requireAdmin();
  const db = getDB();
  db.projects = db.projects.filter((p) => p.id !== id);
  db.settings.featuredProjectIds = db.settings.featuredProjectIds.filter((f) => f !== id);
  saveDB(db);
  revalidatePath('/', 'layout');
  return { ok: true };
}

/* ── admin: services ─────────────────────────────────────────────────── */

export async function saveService(id: string, input: ServiceFormInput): Promise<Result> {
  await requireAdmin();
  const parsed = serviceFormSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid service data.' };
  const d = parsed.data;
  const points = d.pointsText.split(/\n+/).map((s) => s.trim()).filter(Boolean);
  const db = getDB();
  const existing = db.services.find((s) => s.id === id);
  if (!existing) return { ok: false, error: 'Service not found.' };
  Object.assign(existing, { title: d.title, blurb: d.blurb, points, active: d.active });
  saveDB(db);
  revalidatePath('/', 'layout');
  return { ok: true };
}

/* ── admin: enquiries & consultations status ─────────────────────────── */

export async function updateEnquiryStatus(id: string, status: EnquiryStatus): Promise<Result> {
  await requireAdmin();
  const db = getDB();
  const e = db.enquiries.find((x) => x.id === id);
  if (!e) return { ok: false, error: 'Enquiry not found.' };
  e.status = status;
  saveDB(db);
  return { ok: true };
}

export async function updateConsultationStatus(id: string, status: ConsultationStatus): Promise<Result> {
  await requireAdmin();
  const db = getDB();
  const c = db.consultations.find((x) => x.id === id);
  if (!c) return { ok: false, error: 'Consultation request not found.' };
  c.status = status;
  saveDB(db);
  return { ok: true };
}

/* ── admin: homepage settings ────────────────────────────────────────── */

export async function saveSettings(input: SettingsFormInput): Promise<Result> {
  await requireAdmin();
  const parsed = settingsFormSchema.safeParse(input);
  if (!parsed.success) return { ok: false, error: parsed.error.issues[0]?.message ?? 'Invalid settings.' };
  const db = getDB();
  db.settings = { ...db.settings, ...parsed.data };
  saveDB(db);
  revalidatePath('/', 'layout');
  return { ok: true };
}

/* ── admin: image upload (demo storage) ──────────────────────────────── */

export async function uploadImage(
  formData: FormData,
): Promise<{ ok: true; url: string } | { ok: false; error: string }> {
  await requireAdmin();
  const file = formData.get('file');
  if (!(file instanceof File)) return { ok: false, error: 'No file provided.' };
  if (!file.type.startsWith('image/')) return { ok: false, error: 'Only image files are allowed.' };
  if (file.size > 4 * 1024 * 1024) return { ok: false, error: 'Images must be under 4 MB.' };
  const ext = path.extname(file.name).toLowerCase().replace(/[^.a-z0-9]/g, '') || '.jpg';
  const name = `${Date.now()}-${slugify(path.basename(file.name, path.extname(file.name))) || 'image'}${ext}`;
  const dir = path.join(process.cwd(), 'public', 'uploads');
  try {
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, name), Buffer.from(await file.arrayBuffer()));
  } catch {
    return { ok: false, error: 'Storage is read-only in this environment. Use an image URL instead.' };
  }
  return { ok: true, url: `/uploads/${name}` };
}

/* ── helpers ────────────────────────────────────────────────────────── */

function uniqueSlug(existing: string[], base: string, excludeId?: string): string {
  void excludeId;
  let slug = base || 'item';
  let n = 2;
  while (existing.includes(slug)) slug = `${base}-${n++}`;
  return slug;
}
