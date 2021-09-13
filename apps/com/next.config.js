// eslint-disable-next-line @typescript-eslint/no-var-requires
const enRoutes = require('../../libs/com/feature-localized-routes/src/lib/en.json');
const frRoutes = require('../../libs/com/feature-localized-routes/src/lib/fr.json');
const nlRoutes = require('../../libs/com/feature-localized-routes/src/lib/nl.json');

const withNx = require('@nrwl/next/plugins/with-nx');

const { i18n } = require('./next-i18next.config');

module.exports = withNx({
  i18n,
  async rewrites() {
    return [
      // we need to define a no-op rewrite to trigger checking
      // all pages/static files before we attempt proxying
      {
        source: '/api/:path*',
        destination: '/api/:path*',
      },
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_NX_API_ROUTE || ''}/api/:path*`,
      },
      ...enRoutes,
      ...frRoutes,
      ...nlRoutes,
    ];
  },
});
