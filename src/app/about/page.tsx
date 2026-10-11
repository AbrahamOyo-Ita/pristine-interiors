import type { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight, Compass, Eye, HandHeart, Leaf, PencilRuler } from 'lucide-react';
import { business } from '@/lib/config';
import { CTALink, PageHero, SectionTag } from '@/components/ui';
import Reveal from '@/components/Reveal';

export const metadata: Metadata = {
  title: 'About Us',
  description: `The story, mission and values behind ${business.name}, a boutique interior design studio and furniture brand in Nigeria.`,
};

const values = [
  { icon: HandHeart, title: 'Warmth', body: 'Spaces should welcome you at the door. We design for comfort, gathering and everyday ease.' },
  { icon: Compass, title: 'Honesty', body: 'Clear communication, transparent pricing conversations and no promises we cannot keep.' },
  { icon: Eye, title: 'Craft & Detail', body: 'Material honesty, careful joinery and finishing details that reward a second look.' },
  { icon: Leaf, title: 'Longevity', body: 'We favour timeless over trendy: pieces and palettes that age gracefully.' },
];

const steps = [
  { n: '01', t: 'Listen', b: 'A consultation to understand your space, routines, tastes and budget.', gold: true },
  { n: '02', t: 'Design', b: 'Concepts, layouts, materials and a curated furniture list you can approve.', gold: false },
  { n: '03', t: 'Craft', b: 'Pieces made or sourced to specification, with quality checked at every step.', gold: false },
  { n: '04', t: 'Install', b: 'Delivery, placement and final styling. We hand over a finished, livable space.', gold: false },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        tag="About Us"
        title="A Boutique Studio for Considered Nigerian Interiors"
        intro={`${business.name} pairs interior design with furniture supply, so the journey from concept to installed space happens under one roof.`}
      />

      {/* ── Story ──────────────────────────────────────────────────── */}
      <section className="container-site grid items-center gap-16 py-20 md:py-28 lg:grid-cols-2">
        <Reveal>
          <div className="blob-c overflow-hidden shadow-soft">
            <Image
              src="/images/bedroom-japandi.jpg"
              alt="Calm neutral bedroom with clean lines and natural materials"
              width={1200}
              height={900}
              sizes="(min-width: 1024px) 46vw, 92vw"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </Reveal>
        <Reveal delay={120}>
          <SectionTag>Our Story</SectionTag>
          <h2 className="max-w-lg text-3xl leading-[1.15] md:text-[2.6rem]">
            From a Love of Homes to a Studio for <span className="text-bronze">Living Well</span>
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-ink-soft">
            {business.name} began with a simple observation: the rooms we love most are not the most expensive, they
            are the most intentional. Warm light, honest materials, furniture that fits both the room and the life
            lived in it.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-ink-soft">
            Today we work across homes and businesses in Nigeria, offering interior design, space planning, furniture
            supply and bespoke pieces. Through a thoughtful blend of creativity and technical care, we transform
            houses and commercial shells into places that support how you live, work and feel.
          </p>
          <p className="mt-6 rounded-[20px] bg-linen px-5 py-4 text-xs leading-relaxed text-ink-soft">
            Our team profiles, company history and client track record will be published here once verified. We do not
            display awards, years-of-experience figures or certifications that have not been supplied and confirmed.
          </p>
        </Reveal>
      </section>

      {/* ── Values ─────────────────────────────────────────────────── */}
      <section className="bg-linen py-20 md:py-24">
        <div className="container-site">
          <Reveal className="mb-12 text-center">
            <SectionTag center>Mission & Values</SectionTag>
            <h2 className="text-3xl md:text-4xl">
              What Guides <span className="text-bronze">Every Project</span>
            </h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <div className="card h-full rounded-[24px] p-7 transition-shadow hover:shadow-soft">
                  <span className="icon-circle bg-bronze-faint text-bronze-dark">
                    <v.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold">{v.title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Approach ──────────────────────────────────────────────── */}
      <section className="container-site py-20 md:py-28">
        <Reveal className="mb-12 max-w-2xl">
          <SectionTag>Our Approach</SectionTag>
          <h2 className="text-3xl leading-tight md:text-4xl">
            Listen. Design. Craft. <span className="text-bronze">Install.</span>
          </h2>
        </Reveal>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 90}>
              <div className={`relative h-full overflow-hidden rounded-[24px] p-7 ${s.gold ? 'bg-bronze text-ink' : 'card'}`}>
                <span className={`icon-circle ${s.gold ? 'bg-ink/10 text-ink' : 'bg-bronze-faint text-bronze-dark'}`}>
                  <PencilRuler className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{s.t}</h3>
                <p className={`mt-2.5 text-sm leading-relaxed ${s.gold ? 'text-ink/80' : 'text-ink-soft'}`}>{s.b}</p>
                <span className={`pointer-events-none absolute -bottom-6 right-4 text-[88px] font-extrabold leading-none ${s.gold ? 'text-ink/10' : 'text-ink/5'}`} aria-hidden="true">
                  {s.n}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <section className="container-site pb-20 md:pb-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-[40px] bg-ink bg-noise px-6 py-16 text-center md:py-20">
            <Image src="/images/living-minimal.jpg" alt="" fill sizes="100vw" className="object-cover opacity-20" aria-hidden="true" />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-3xl text-cream md:text-4xl">
                Let us design a space that feels like <span className="text-bronze">you</span>.
              </h2>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <CTALink href="/book-consultation" variant="light">
                  Book a Consultation <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </CTALink>
                <CTALink href="/portfolio" variant="outline-light">
                  See Our Work
                </CTALink>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
