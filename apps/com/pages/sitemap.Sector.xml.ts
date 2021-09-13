import { getSectorSitemap } from '@homeproved/com/feature-sitemap';

const Sitemap = () => null;

export const getServerSideProps = async ({ req, res }) => {
  if (!process.env.NEXT_PUBLIC_NX_API_ROUTE) {
    console.debug("Can't generate sitemap, process.env.NEXT_PUBLIC_NX_API_ROUTE not set.");
    return { props: {} };
  }
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const cityData = require('../all-cities.json');
  const sitemap = await getSectorSitemap(`https://${req.headers.host}`, cityData);

  res.setHeader('Content-Type', 'text/xml; charset=UTF-8');
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
