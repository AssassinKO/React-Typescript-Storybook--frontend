import { buildSitemapUrls, fetchData, generateAll } from '../util';
import { DynamicPaths, JobResponse } from '../types';

const data: { jobs: JobResponse } = {
  jobs: [],
};

export const getJobSitemap = async (basePath: string) => {
  await prefetchData();
  const allUrls = await buildSitemapUrls(basePath, dynamicPaths, {
    filter: ([path]) => path.includes('job'),
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
      ${allUrls.join('')}
    </urlset>
  `;

  return sitemap;
};

const prefetchData = async () => {
  data.jobs = await fetchData<JobResponse>(`${process.env.NEXT_PUBLIC_NX_API_ROUTE}/sitemap/jobs`);
};

const dynamicPaths: DynamicPaths = {
  '/jobs/:slug': {
    getStaticPaths: (localizedRoute) =>
      generateAll(localizedRoute, data.jobs, (path, localizedJobs, locale) =>
        path.replace(':slug', localizedJobs[locale].slug)
      ),
  },
};
