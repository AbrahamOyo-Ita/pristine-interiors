import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AdminShell from '@/components/admin/AdminShell';
import ProjectForm from '@/components/admin/ProjectForm';
import { getDB } from '@/lib/db';

export const metadata: Metadata = { title: 'Edit Project' };

export default function EditProjectPage({ params }: { params: { id: string } }) {
  const project = getDB().projects.find((p) => p.id === params.id);
  if (!project) notFound();

  return (
    <AdminShell active="projects">
      <h1 className="font-display text-3xl">Edit: {project.title}</h1>
      <div className="mt-6">
        <ProjectForm project={project} />
      </div>
    </AdminShell>
  );
}
