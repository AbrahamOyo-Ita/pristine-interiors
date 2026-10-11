import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { getProjectBySlug } from '@/lib/db';
import { categoryLabel, projectCategories } from '@/lib/config';
import { waMessage } from '@/lib/whatsapp';
import Gallery from '@/components/Gallery';
import { CTALink, SectionTag, WhatsAppLink } from '@/components/ui';

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProjectBySlug(params.slug);
  return {
    title: project ? `${project.title} · Portfolio` : 'Project not found',
    description: project?.summary.slice(0, 160),
  };
}

export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  return (
    <div className="container-site py-10 md:py-14">
      <nav aria-label="Breadcrumb" className="mb-8 text-sm text-ink-soft">
        <Link href="/" className="hover:text-bronze">Home</Link>
        <span aria-hidden="true"> / </span>
        <Link href="/portfolio" className="hover:text-bronze">Portfolio</Link>
        <span aria-hidden="true"> / </span>
        <span className="text-ink">{project.title}</span>
      </nav>

      <div className="max-w-3xl">
        <div className="flex flex-wrap items-center gap-3">
          <SectionTag>{categoryLabel(project.category, projectCategories)}</SectionTag>
        </div>
        <h1 className="font-display text-3xl md:text-5xl">{project.title}</h1>
        <p className="mt-3 flex items-center gap-2 text-sm text-ink-soft">
          <MapPin className="h-4 w-4 text-bronze" aria-hidden="true" /> {project.location}
        </p>
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <Gallery images={project.images} alt={project.title} />
        <div>
          <h2 className="font-display text-xl">The Brief</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">{project.summary}</p>
          <h2 className="mt-8 font-display text-xl">Design Approach</h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">{project.approach}</p>
          {project.materials.length > 0 ? (
            <>
              <h2 className="mt-8 font-display text-xl">Materials & Finishes</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.materials.map((m) => (
                  <li key={m} className="rounded-full bg-linen px-3.5 py-1.5 text-xs font-semibold text-ink-soft">
                    {m}
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          <div className="mt-10 grid gap-3">
            <CTALink href="/book-consultation">
              Book a Consultation <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </CTALink>
            <WhatsAppLink message={waMessage.consultation()} variant="outline">
              Enquire About a Similar Space
            </WhatsAppLink>
          </div>
        </div>
      </div>
    </div>
  );
}
