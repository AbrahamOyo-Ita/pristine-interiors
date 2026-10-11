import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Armchair,
  Building2,
  Facebook,
  Gem,
  Home,
  Instagram,
  MapPin,
  MessageCircle,
  Paintbrush,
  PencilRuler,
  Phone,
  Quote,
} from 'lucide-react';
import { getDB, publicProducts, publicProjects } from '@/lib/db';
import { business, categoryLabel, projectCategories } from '@/lib/config';
import { waHref, waMessage } from '@/lib/whatsapp';
import { CTALink, SectionTag, WhatsAppLink } from '@/components/ui';
import HeroShow from '@/components/HeroShow';
import ShowreelBand from '@/components/ShowreelBand';
import Reveal from '@/components/Reveal';

// Always render fresh so admin homepage edits appear without a rebuild.
export const dynamic = 'force-dynamic';

const serviceIcons = [Home, Building2, PencilRuler, Armchair, Gem, Paintbrush];

export default function HomePage() {
  const db = getDB();
  const { settings } = db;
  const products = publicProducts();
  const projects = publicProjects();
  const featuredProjects = settings.featuredProjectIds
    .map((id) => projects.find((p) => p.id === id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const activeServices = db.services.filter((s) => s.active);

  const headline = settings.heroHeadline;
  const highlight = settings.heroHighlight;
  const headParts = highlight && headline.includes(highlight) ? headline.split(highlight) : null;

  const stats = [
    { value: `${products.length}+`, label: 'Curated Furniture Pieces', href: '/shop', dark: false },
    { value: `${projects.length}`, label: 'Design Projects Showcased', href: '/portfolio', dark: false },
    { value: `${activeServices.length}`, label: 'Proposed Service Categories', href: '/services', dark: false },
    { value: '100%', label: 'Tailored, Client-Focused Design', href: '/about', dark: true },
  ];

  return (
    <>
      {/* ── Hero ────────────────────────────────────────────────────── */}
      <section className="relative">
        <div className="relative overflow-hidden rounded-b-[40px] bg-ink">
          <HeroShow />
          <div className="absolute inset-0 bg-ink/50" aria-hidden="true" />
          <div className="container-site relative flex min-h-[92vh] flex-col items-start justify-center pb-28 pt-36">
            <Reveal>
              <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-widest2 text-cream/85">
                <span className="h-px w-8 bg-bronze" aria-hidden="true" />
                Premium Interior Design & Furniture, Uyo
              </p>
            </Reveal>
            <Reveal delay={120}>
              <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-[1.1] text-cream md:text-6xl">
                {headParts ? (
                  <>
                    {headParts[0]}
                    <span className="text-bronze">{highlight}</span>
                    {headParts[1]}
                  </>
                ) : (
                  headline
                )}
              </h1>
            </Reveal>
            <Reveal delay={240}>
              <p className="mt-6 max-w-xl text-sm leading-relaxed text-cream/80 md:text-[15px]">{settings.heroSub}</p>
            </Reveal>
            <Reveal delay={360}>
              <div className="mt-9">
                <CTALink href="/shop" variant="light">
                  Explore Furniture <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </CTALink>
              </div>
            </Reveal>
          </div>

          <p className="absolute bottom-6 left-6 flex items-center gap-2 text-[11px] font-semibold text-cream/80 md:left-10">
            Scroll Down <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
          </p>
          <div className="absolute bottom-6 right-6 flex gap-2.5 md:right-10">
            {business.social.instagram ? (
              <a href={business.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="icon-circle bg-cream text-ink hover:bg-bronze">
                <Instagram className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : null}
            {business.social.facebook ? (
              <a href={business.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="icon-circle bg-cream text-ink hover:bg-bronze">
                <Facebook className="h-4 w-4" aria-hidden="true" />
              </a>
            ) : null}
            <a href={waHref(waMessage.general())} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="icon-circle bg-cream text-ink hover:bg-bronze">
              <Phone className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      {/* ── About split ──────────────────────────────────────────────── */}
      <section className="container-site grid items-center gap-16 py-20 md:py-28 lg:grid-cols-2">
        <Reveal>
          <SectionTag>About Us</SectionTag>
          <h2 className="max-w-lg text-3xl leading-[1.15] md:text-[2.6rem]">
            Design Rooted in Craft, Materiality, and <span className="text-bronze">Emotion</span>
          </h2>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-ink-soft">
            We are a boutique interior design studio dedicated to crafting warm, intentional, and beautifully balanced
            spaces. Through a thoughtful blend of creativity and technical expertise, we transform homes and commercial
            environments into places that support how you live, work, and feel.
          </p>
          <CTALink href="/about" variant="outline" className="mt-8">
            Learn More <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </CTALink>
        </Reveal>
        <Reveal delay={150}>
          <div className="blob-c relative overflow-hidden shadow-soft">
            <Image
              src="/images/kitchen-round.jpg"
              alt="Warm wooden kitchen and dining space with soft natural light"
              width={1200}
              height={900}
              sizes="(min-width: 1024px) 46vw, 92vw"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </Reveal>
      </section>

      {/* ── What we cover strip ──────────────────────────────────────── */}
      <section className="border-y border-ink/5 py-9">
        <div className="container-site flex flex-wrap items-center justify-between gap-x-8 gap-y-5">
          {activeServices.slice(0, 6).map((s, i) => {
            const Icon = serviceIcons[i % serviceIcons.length];
            return (
              <Link key={s.id} href="/services" className="flex items-center gap-2 text-sm font-bold text-ink/45 transition-colors hover:text-bronze-dark">
                <Icon className="h-4 w-4" aria-hidden="true" />
                {s.title}
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────── */}
      <section className="container-site grid items-center gap-14 py-20 md:py-28 lg:grid-cols-2">
        <Reveal className="order-2 lg:order-1">
          <div className="blob-d overflow-hidden shadow-soft">
            <Image
              src="/images/living-cream.jpg"
              alt="Softly styled cream living room with layered textures"
              width={1200}
              height={900}
              sizes="(min-width: 1024px) 46vw, 92vw"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </Reveal>
        <div className="order-1 lg:order-2">
          <div className="grid gap-5 sm:grid-cols-2">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 90}>
                <div className={`relative rounded-[24px] p-7 ${s.dark ? 'bg-cocoa text-cream' : 'card'}`}>
                  <p className="text-4xl font-extrabold tracking-tight">{s.value}</p>
                  <p className={`mt-2 text-sm font-medium ${s.dark ? 'text-cream/75' : 'text-ink-soft'}`}>{s.label}</p>
                  <Link
                    href={s.href}
                    aria-label={`Learn more about ${s.label}`}
                    className={`icon-circle absolute bottom-6 right-6 h-10 w-10 ${s.dark ? 'bg-bronze text-ink' : 'bg-ink text-cream hover:bg-bronze hover:text-ink'}`}
                  >
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Showreel band ────────────────────────────────────────────── */}
      <ShowreelBand videoSrc="/videos/hero-living.mp4" posterSrc="/images/living-beige.jpg" />

      {/* ── Services ─────────────────────────────────────────────────── */}
      {settings.showServices ? (
        <section className="container-site py-20 md:py-28">
          <Reveal className="mb-12 max-w-2xl">
            <SectionTag>What We Do</SectionTag>
            <h2 className="text-3xl leading-tight md:text-4xl">
              We Shape Interiors That <span className="text-bronze">Reflect Your Story</span>
            </h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activeServices.map((s, i) => {
              const Icon = serviceIcons[i % serviceIcons.length];
              const dark = i === 0;
              return (
                <Reveal key={s.id} delay={i * 80}>
                  <article className={`group h-full rounded-[24px] p-7 transition-shadow ${dark ? 'bg-cocoa text-cream' : 'card hover:shadow-soft'}`}>
                    <span className={`icon-circle ${dark ? 'bg-bronze text-ink' : 'bg-bronze-faint text-bronze-dark'}`}>
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className={`mt-5 text-lg font-bold ${dark ? 'text-cream' : ''}`}>{s.title}</h3>
                    <p className={`mt-2.5 text-sm leading-relaxed ${dark ? 'text-cream/65' : 'text-ink-soft'}`}>{s.blurb}</p>
                    <Link
                      href="/services"
                      className={`mt-6 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider ${dark ? 'text-bronze' : 'text-bronze-dark'}`}
                    >
                      Learn More <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                    </Link>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>
      ) : null}

      {/* ── Featured projects, stacked wide ──────────────────────────── */}
      <section className="container-site pb-20 md:pb-28">
        <Reveal className="mb-12 text-center">
          <SectionTag center>Portfolio</SectionTag>
          <h2 className="mx-auto max-w-2xl text-3xl md:text-4xl">
            A Curated Selection of Our <span className="text-bronze">Interior Projects</span>
          </h2>
        </Reveal>
        <div className="space-y-6">
          {featuredProjects.map((p, i) => (
            <Reveal key={p.id} delay={i * 100}>
              <Link href={`/portfolio/${p.slug}`} className="group relative block h-[380px] overflow-hidden rounded-[28px] md:h-[440px]">
                <Image
                  src={p.images[0]}
                  alt={p.title}
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/20 to-transparent" aria-hidden="true" />
                <span className="absolute right-6 top-6 rounded-full bg-cream/90 px-4 py-1.5 text-[11px] font-bold text-ink">
                  {categoryLabel(p.category, projectCategories)}
                </span>
                <div className="absolute inset-x-0 bottom-0 flex flex-wrap items-end justify-between gap-4 p-6 md:p-8">
                  <div>
                    <h3 className="text-2xl font-bold text-cream md:text-3xl">{p.title}</h3>
                    <p className="mt-2 flex items-center gap-2 text-xs font-semibold text-cream/75">
                      <MapPin className="h-3.5 w-3.5 text-bronze" aria-hidden="true" /> {p.location}
                    </p>
                  </div>
                  <span className="btn-gold pointer-events-none">
                    View Project <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center">
          <CTALink href="/portfolio" variant="primary">
            View Full Portfolio <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </CTALink>
        </Reveal>
      </section>

      {/* ── Process ──────────────────────────────────────────────────── */}
      <section className="bg-ink bg-noise py-20 md:py-24">
        <div className="container-site">
          <Reveal className="mb-12 text-center">
            <SectionTag center light>
              Our Process
            </SectionTag>
            <h2 className="mx-auto max-w-2xl text-3xl text-cream md:text-4xl">
              How We Turn Vision Into <span className="text-bronze">Well-Designed Spaces</span>
            </h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { n: '01', t: 'Consultation & Discovery', b: 'A consultation to understand your space, routines, taste and budget.', gold: true },
              { n: '02', t: 'Concept & Moodboard Development', b: 'Concepts, layouts, materials and a curated furniture list you approve.', gold: false },
              { n: '03', t: 'Design Development', b: 'Pieces made or sourced to specification, quality checked at every step.', gold: false },
              { n: '04', t: 'Execution & Final Styling', b: 'Delivery, placement and final styling. We hand over a finished space.', gold: false },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 90}>
                <div className={`relative h-full overflow-hidden rounded-[24px] p-7 ${s.gold ? 'bg-bronze text-ink' : 'bg-cream text-ink'}`}>
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
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────────────────────────── */}
      {settings.showTestimonials ? (
        <section className="container-site py-20 md:py-28">
          <Reveal className="mb-12 text-center">
            <SectionTag center>Kind Words</SectionTag>
            <h2 className="mx-auto max-w-xl text-3xl md:text-4xl">
              What Our <span className="text-bronze">Clients</span> Say About Working With Us
            </h2>
          </Reveal>
          <div className="grid gap-6 md:grid-cols-2">
            {db.testimonials.map((t, i) => (
              <Reveal key={t.id} delay={i * 90}>
                <figure className="card relative h-full rounded-[24px] p-8">
                  <Quote className="absolute right-8 top-8 h-6 w-6 text-bronze" aria-hidden="true" />
                  <blockquote className="max-w-xl pr-10 text-sm leading-relaxed text-ink-soft">“{t.quote}”</blockquote>
                  <figcaption className="mt-7 flex items-center gap-3">
                    <span className="icon-circle bg-bronze-faint text-sm font-extrabold text-bronze-dark">
                      {t.name.replace('Sample Client, ', '').charAt(0)}
                    </span>
                    <span>
                      <span className="block text-sm font-bold">{t.name}</span>
                      <span className="block text-xs text-ink-soft">{t.location}</span>
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}

      {/* ── Studio CTA ───────────────────────────────────────────────── */}
      <section className="relative">
        <div className="relative overflow-hidden bg-ink py-32 md:py-40">
          <Image src="/images/dining-villa.jpg" alt="" fill sizes="100vw" className="object-cover opacity-30" aria-hidden="true" />
          <p className="relative px-4 text-center text-[13vw] font-extrabold leading-none tracking-tight text-cream/20 md:text-[9vw]">
            Pristine Studio
          </p>
        </div>
        <div className="container-site relative z-10 -mt-24 pb-20 md:pb-24">
          <div className="card mx-auto max-w-3xl rounded-[32px] px-8 py-12 text-center md:px-14">
            <h2 className="text-3xl md:text-4xl">Start Your Interior Transformation Today</h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink-soft">
              From a single room to a full home, we design spaces that feel like you. Book a consultation or say hello
              on WhatsApp.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <CTALink href="/book-consultation" variant="primary">
                Book a Consultation <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </CTALink>
              <WhatsAppLink message={waMessage.general()} variant="gold">
                <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp Enquiry
              </WhatsAppLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
