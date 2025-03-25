import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://divider-docs.vercel.app/',
      lastModified: new Date(),
      changeFrequency: 'weekly',
    },
    {
      url: 'https://divider-docs.vercel.app/en',
      lastModified: new Date(),
      changeFrequency: 'weekly',
    },
    {
      url: 'https://divider-docs.vercel.app/nl',
      lastModified: new Date(),
      changeFrequency: 'weekly',
    },
    {
      url: 'https://divider-docs.vercel.app/ja',
      lastModified: new Date(),
      changeFrequency: 'weekly',
    },
  ];
}
