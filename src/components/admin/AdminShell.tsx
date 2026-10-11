import { redirect } from 'next/navigation';
import Link from 'next/link';
import {
  ExternalLink,
  Images,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Package,
  Settings,
  Wrench,
} from 'lucide-react';
import { isAdmin } from '@/lib/auth';
import { logoutAction } from '@/lib/actions';
import { isDemoMode, storageIsWritable } from '@/lib/db';

const links = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, key: 'dashboard' },
  { href: '/admin/products', label: 'Products', icon: Package, key: 'products' },
  { href: '/admin/projects', label: 'Projects', icon: Images, key: 'projects' },
  { href: '/admin/services', label: 'Services', icon: Wrench, key: 'services' },
  { href: '/admin/enquiries', label: 'Enquiries', icon: MessageSquare, key: 'enquiries' },
  { href: '/admin/settings', label: 'Homepage', icon: Settings, key: 'settings' },
];

export default async function AdminShell({ children, active }: { children: React.ReactNode; active: string }) {
  if (!(await isAdmin())) redirect('/admin/login');

  const nav = (
    <>
      {links.map((l) => (
        <Link
          key={l.key}
          href={l.href}
          className={`flex items-center gap-3 rounded-md px-3.5 py-2.5 text-sm font-semibold transition-colors ${
            active === l.key ? 'bg-ink text-cream' : 'text-ink-soft hover:bg-linen'
          }`}
          aria-current={active === l.key ? 'page' : undefined}
        >
          <l.icon className="h-4 w-4" aria-hidden="true" />
          {l.label}
        </Link>
      ))}
    </>
  );

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {isDemoMode() ? (
        <p className="mb-6 rounded-md border border-bronze/30 bg-bronze-faint px-4 py-3 text-xs leading-relaxed text-bronze-dark">
          <strong>Admin demo mode.</strong> Supabase is not connected, so data is stored in a local demo database
          {storageIsWritable() ? '' : ' (read-only filesystem, changes last only for this server instance)'}. In
          production, connect Supabase and sign in with Supabase Auth (see README).
        </p>
      ) : null}
      <div className="flex flex-col gap-8 md:flex-row">
        <aside className="w-full shrink-0 md:w-56">
          <nav className="flex gap-1 overflow-x-auto pb-2 md:sticky md:top-24 md:flex-col md:pb-0" aria-label="Admin navigation">
            {nav}
            <div className="mt-0 border-t border-ink/10 pt-2 md:mt-4">
              <Link href="/" className="flex items-center gap-3 rounded-md px-3.5 py-2.5 text-sm font-semibold text-ink-soft hover:bg-linen">
                <ExternalLink className="h-4 w-4" aria-hidden="true" /> View site
              </Link>
              <form action={logoutAction}>
                <button type="submit" className="flex w-full items-center gap-3 rounded-md px-3.5 py-2.5 text-sm font-semibold text-clay hover:bg-linen">
                  <LogOut className="h-4 w-4" aria-hidden="true" /> Sign out
                </button>
              </form>
            </div>
          </nav>
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
