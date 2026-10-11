/**
 * ───────────────────────────────────────────────────────────────────────────
 * CENTRAL BUSINESS CONFIGURATION for Pristine Interiors
 *
 * Every business value shown on the site is environment driven
 * (NEXT_PUBLIC_* because these render on both server and client). Set them in
 * .env.local or in your host's dashboard to go fully live; see .env.example.
 *
 * Until a value is set, an honest placeholder is shown and the matching
 * `*IsSample` flag renders the small "to be confirmed" notes. Social URLs
 * left empty simply hide their icon, so no fake profile is ever linked.
 *
 * Secrets (admin credentials, Supabase keys) do NOT live here. They are read
 * server-side in src/lib/auth.ts and src/lib/db.ts only.
 * ───────────────────────────────────────────────────────────────────────────
 */
const env = process.env;

export const business = {
  name: 'Pristine Interiors',
  tagline: 'Interior Design & Furniture',
  legalName: 'Pristine Interiors',

  phone: env.NEXT_PUBLIC_BUSINESS_PHONE ?? '+234 800 000 0000',
  phoneIsSample: !env.NEXT_PUBLIC_BUSINESS_PHONE,

  /** Country code + digits only, e.g. 2348012345678. Drives every WhatsApp link. */
  whatsappNumber: env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '2348000000000',
  whatsappIsSample: !env.NEXT_PUBLIC_WHATSAPP_NUMBER,

  email: env.NEXT_PUBLIC_BUSINESS_EMAIL ?? 'hello@pristineinteriors.example',
  emailIsSample: !env.NEXT_PUBLIC_BUSINESS_EMAIL,

  address: env.NEXT_PUBLIC_BUSINESS_ADDRESS ?? 'Uyo, Akwa Ibom State, Nigeria. Full address to be confirmed.',
  addressIsSample: !env.NEXT_PUBLIC_BUSINESS_ADDRESS,

  hours: env.NEXT_PUBLIC_BUSINESS_HOURS ?? 'Mon to Sat, 9:00am to 6:00pm (to be confirmed)',
  hoursIsSample: !env.NEXT_PUBLIC_BUSINESS_HOURS,

  serviceArea: 'Uyo, Akwa Ibom State and nationwide delivery on request',

  /** Optional. Empty values hide the icon instead of linking to a placeholder. */
  social: {
    instagram: env.NEXT_PUBLIC_SOCIAL_INSTAGRAM ?? '',
    facebook: env.NEXT_PUBLIC_SOCIAL_FACEBOOK ?? '',
    pinterest: env.NEXT_PUBLIC_SOCIAL_PINTEREST ?? '',
  },
};

/** True when any contact detail is still a placeholder (drives small notes). */
export const hasSampleContactDetails =
  business.phoneIsSample ||
  business.whatsappIsSample ||
  business.emailIsSample ||
  business.addressIsSample;

export const nav = [
  { href: '/', label: 'Home' },
  { href: '/shop', label: 'Furniture Shop' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export const productCategories = [
  { slug: 'sofas', label: 'Sofas' },
  { slug: 'beds', label: 'Beds' },
  { slug: 'dining', label: 'Dining Furniture' },
  { slug: 'chairs', label: 'Chairs' },
  { slug: 'tables', label: 'Tables' },
  { slug: 'storage', label: 'Storage' },
  { slug: 'accessories', label: 'Accessories' },
];

export const projectCategories = [
  { slug: 'living-rooms', label: 'Living Rooms' },
  { slug: 'bedrooms', label: 'Bedrooms' },
  { slug: 'offices', label: 'Offices' },
  { slug: 'kitchens', label: 'Kitchens' },
  { slug: 'commercial', label: 'Commercial Spaces' },
  { slug: 'full-transformations', label: 'Full Transformations' },
];

export const stockLabels: Record<string, string> = {
  'in-stock': 'In stock',
  'made-to-order': 'Made to order',
  'out-of-stock': 'Out of stock',
};

export const priceRanges = [
  { slug: 'under-300', label: 'Under ₦300,000', min: 0, max: 300000 },
  { slug: '300-800', label: '₦300,000 to ₦800,000', min: 300000, max: 800000 },
  { slug: 'over-800', label: 'Over ₦800,000', min: 800000, max: Infinity },
];

export function categoryLabel(slug: string, list: { slug: string; label: string }[] = productCategories) {
  return list.find((c) => c.slug === slug)?.label ?? slug;
}

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://pristine-interiors.example';
