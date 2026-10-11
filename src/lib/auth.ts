import { cookies } from 'next/headers';
import crypto from 'node:crypto';
import { getDB, saveDB, isDemoMode } from './db';

const COOKIE = 'pi_admin_session';
const SESSION_HOURS = 12;

export function demoCredentials() {
  return {
    email: process.env.DEMO_ADMIN_EMAIL || 'owner@pristineinteriors.example',
    password: process.env.DEMO_ADMIN_PASSWORD || 'pristine-demo',
  };
}

/** Demo-mode credential check. In production, replace with Supabase Auth. */
export function verifyDemoCredentials(email: string, password: string): boolean {
  const c = demoCredentials();
  return email.trim().toLowerCase() === c.email.toLowerCase() && password === c.password;
}

export async function createSession(): Promise<void> {
  const token = crypto.randomBytes(32).toString('hex');
  const now = new Date();
  const expiresAt = new Date(now.getTime() + SESSION_HOURS * 3600_000);
  const db = getDB();
  db.sessions = db.sessions.filter((s) => new Date(s.expiresAt) > now);
  db.sessions.push({ token, createdAt: now.toISOString(), expiresAt: expiresAt.toISOString() });
  saveDB(db);
  cookies().set(COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_HOURS * 3600,
  });
}

export async function isAdmin(): Promise<boolean> {
  const token = cookies().get(COOKIE)?.value;
  if (!token) return false;
  const db = getDB();
  const session = db.sessions.find((s) => s.token === token && new Date(s.expiresAt) > new Date());
  return Boolean(session);
}

export async function destroySession(): Promise<void> {
  const token = cookies().get(COOKIE)?.value;
  if (token) {
    const db = getDB();
    db.sessions = db.sessions.filter((s) => s.token !== token);
    saveDB(db);
  }
  cookies().delete(COOKIE);
}

/** Throws when called from an unauthenticated context. Used by every admin server action. */
export async function requireAdmin(): Promise<void> {
  const ok = await isAdmin();
  if (!ok) throw new Error('Unauthorized: admin sign-in required.');
}

export { isDemoMode };
