import type { Metadata } from 'next';
import { publicProjects } from '@/lib/db';
import { projectCategories } from '@/lib/config';
import PortfolioFilter from '@/components/PortfolioFilter';
import ProjectCard from '@/components/ProjectCard';
import { CTALink, EmptyState, PageHero } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Interior Design Portfolio',
  description:
    'A visual gallery of interior projects across living rooms, bedrooms, offices, kitchens, commercial spaces and full transformations.',
};

export default function PortfolioPage({ searchParams }: { searchParams: { cat?: string } }) {
  const cat = searchParams.cat ?? 'all';
  const valid = projectCategories.some((c) => c.slug === cat);
  const active = valid ? cat : 'all';
  let list = publicProjects();
  if (active !== 'all') list = list.filter((p) => p.category === active);
  list = [...list].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <>
      <PageHero
        tag="Portfolio"
        title="Spaces We Have Shaped"
        intro="Browse projects by category, from single rooms to full interior transformations."
      />
      <div className="container-site py-10 md:py-14">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <PortfolioFilter current={active} />
        </div>
        {list.length === 0 ? (
          <div className="py-10">
            <EmptyState
              title="No projects in this category yet"
              body="We're adding new work all the time. Check another category or enquire about your own project."
              action={<CTALink href="/book-consultation">Start Your Project</CTALink>}
            />
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
