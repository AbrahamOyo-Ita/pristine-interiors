import type { MetadataRoute } from 'next';
import { publicProducts, publicProjects } from '@/lib/db';
import { siteUrl } from '@/lib/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes = ['/', '/shop', '/portfolio', '/services', '/about', '/contact', '/book-consultation', '/cart'];

  return [
    ...staticRoutes.map((route) => ({
      url: `${siteUrl}${route}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: route === '/' ? 1 : 0.8,
    })),
    ...publicProducts().map((p) => ({
      url: `${siteUrl}/shop/${p.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    })),
    ...publicProjects().map((p) => ({
      url: `${siteUrl}/portfolio/${p.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];
}
