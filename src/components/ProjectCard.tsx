import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MapPin } from 'lucide-react';
import type { Project } from '@/lib/types';
import { categoryLabel, projectCategories } from '@/lib/config';

const ratios: Record<string, string> = {
  '4/3': 'aspect-[4/3]',
  '16/10': 'aspect-[16/10]',
  '21/9': 'aspect-[4/3] md:aspect-[21/9]',
};

export default function ProjectCard({ project, ratio = '4/3' }: { project: Project; ratio?: '4/3' | '16/10' | '21/9' }) {
  return (
    <article className="group relative h-full overflow-hidden rounded-[24px]">
      <Link href={`/portfolio/${project.slug}`} className="block h-full">
        <Image
          src={project.cover}
          alt={project.title}
          width={1200}
          height={900}
          sizes="(min-width: 1024px) 60vw, 100vw"
          className={`${ratios[ratio]} h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" aria-hidden="true" />
        <span className="icon-circle absolute right-5 top-5 -translate-y-2 bg-cream text-ink opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
        </span>
        <div className="absolute inset-x-0 bottom-0 p-6 text-cream md:p-7">
          <p className="text-[10px] font-bold uppercase tracking-widest2 text-bronze">
            {categoryLabel(project.category, projectCategories)}
          </p>
          <h3 className="mt-2 text-xl font-bold leading-tight md:text-2xl">{project.title}</h3>
          <p className="mt-2 flex items-center gap-1.5 text-xs text-cream/75">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> {project.location}
          </p>
        </div>
      </Link>
    </article>
  );
}
