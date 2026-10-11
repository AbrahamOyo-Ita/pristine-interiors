import type { Metadata } from 'next';
import AdminShell from '@/components/admin/AdminShell';
import ProjectForm from '@/components/admin/ProjectForm';

export const metadata: Metadata = { title: 'New Project' };

export default function NewProjectPage() {
  return (
    <AdminShell active="projects">
      <h1 className="font-display text-3xl">New Portfolio Project</h1>
      <p className="mt-2 text-sm text-ink-soft">New projects are presented as illustrative samples until verified.</p>
      <div className="mt-6">
        <ProjectForm />
      </div>
    </AdminShell>
  );
}
