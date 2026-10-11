import { redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { isAdmin, isDemoMode } from '@/lib/auth';
import LoginForm from '@/components/admin/LoginForm';

export const metadata: Metadata = {
  title: 'Admin Sign In',
  description: 'Administrator sign-in for the Pristine Interiors website.',
};

export default async function AdminLoginPage() {
  if (await isAdmin()) redirect('/admin');
  const demo = isDemoMode();

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <h1 className="text-center font-display text-3xl">
          Admin <span className="text-bronze">Sign In</span>
        </h1>
        <p className="mt-2 text-center text-sm text-ink-soft">Manage products, projects, enquiries and homepage content.</p>
        <div className="mt-8">
          <LoginForm />
        </div>
        {demo ? (
          <p className="mt-6 rounded-md border border-bronze/30 bg-bronze-faint px-4 py-3 text-center text-xs leading-relaxed text-bronze-dark">
            Demo mode: credentials are set via the DEMO_ADMIN_EMAIL and DEMO_ADMIN_PASSWORD environment variables (see
            README). Production uses Supabase Auth.
          </p>
        ) : (
          <p className="mt-6 text-center text-xs text-ink-soft">Sign in with your Supabase administrator account.</p>
        )}
      </div>
    </div>
  );
}
