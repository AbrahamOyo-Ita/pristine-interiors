import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Pencil, Plus } from 'lucide-react';
import AdminShell from '@/components/admin/AdminShell';
import DeleteButton from '@/components/admin/DeleteButton';
import { getDB } from '@/lib/db';
import { deleteProject } from '@/lib/actions';
import { categoryLabel, projectCategories } from '@/lib/config';

export const metadata: Metadata = { title: 'Manage Projects' };

export default async function AdminProjectsPage() {
  const db = getDB();

  return (
    <AdminShell active="projects">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-display text-3xl">Portfolio Projects</h1>
        <Link href="/admin/projects/new" className="btn-primary !px-5 !py-2.5 text-xs">
          <Plus className="h-4 w-4" aria-hidden="true" /> New project
        </Link>
      </div>
      <div className="card mt-6 overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead>
            <tr className="border-b border-ink/10 text-xs uppercase tracking-wider text-ink-soft">
              <th className="px-4 py-3">Project</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Location</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/5">
            {db.projects.map((p) => (
              <tr key={p.id} className="hover:bg-linen/50">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Image src={p.cover} alt="" width={80} height={60} className="aspect-[4/3] w-12 rounded object-cover" />
                    <span className="font-semibold">{p.title}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-ink-soft">{categoryLabel(p.category, projectCategories)}</td>
                <td className="px-4 py-3 text-ink-soft">{p.location}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase ${p.published ? 'bg-moss/10 text-moss' : 'bg-ink/10 text-ink-soft'}`}>
                    {p.published ? 'Published' : 'Hidden'}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-1">
                    <Link href={`/admin/projects/${p.id}/edit`} aria-label={`Edit ${p.title}`} className="rounded-full p-2 text-ink/60 hover:bg-linen hover:text-bronze">
                      <Pencil className="h-4 w-4" aria-hidden="true" />
                    </Link>
                    <DeleteButton id={p.id} label={`Delete ${p.title}?`} action={deleteProject} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
