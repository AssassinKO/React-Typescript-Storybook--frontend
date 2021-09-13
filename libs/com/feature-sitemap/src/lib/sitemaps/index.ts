import { buildSitemapUrls } from '../util';

export const getIndexSitemap = async (basePath: string) => {
  const allUrls = await buildSitemapUrls(
    basePath,
    {},
    {
      filter: ([path]) =>
        !path.includes('company') && !path.includes('sector') && !path.includes('job'),
    }
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
      <sitemap>
        <loc>${basePath}/sitemap.Job.xml</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </sitemap>
      <sitemap>
        <loc>${basePath}/sitemap.Company.xml</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </sitemap>
       <sitemap>
        <loc>${basePath}/sitemap.Sector.xml</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </sitemap>
      ${allUrls.join('')}
    </urlset>
  `;

  return sitemap;
};
