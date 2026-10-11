import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFloat from '@/components/WhatsAppFloat';
import { CartProvider } from '@/components/CartProvider';
import { business, siteUrl } from '@/lib/config';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${business.name} | Interior Design & Furniture in Uyo, Nigeria`,
    template: `%s | ${business.name}`,
  },
  description:
    'Pristine Interiors designs timeless interiors and supplies carefully crafted furniture for homes and businesses from Uyo, Akwa Ibom State, across Nigeria. Explore the collection, view the portfolio and book a consultation.',
  openGraph: {
    type: 'website',
    siteName: business.name,
    title: `${business.name} | Interior Design & Furniture in Uyo, Nigeria`,
    description:
      'Warm, elegant, functional interiors and quality furniture, designed and supplied for homes and businesses across Nigeria.',
    images: [{ url: '/images/living-luxury.jpg', width: 1600, height: 900, alt: 'Pristine Interiors: warm neutral living room' }],
  },
  twitter: { card: 'summary_large_image' },
};

const favicon =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><rect x="5" y="5" width="14" height="14" transform="rotate(45 12 12)" fill="#A87B3B"/></svg>`,
  );

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href={favicon} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CartProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <WhatsAppFloat />
        </CartProvider>
      </body>
    </html>
  );
}
