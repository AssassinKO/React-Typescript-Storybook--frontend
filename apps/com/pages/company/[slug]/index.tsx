import { useEffect } from 'react';
import { PageWithAuthorization } from '@homeproved/shared/feature-auth';
import { useRouter } from 'next/router';
import { getPathWithLanguage, useLocalizedRoutes } from '@homeproved/com/feature-localized-routes';

export const Index: PageWithAuthorization = () => {
  const router = useRouter();
  const { getPath } = useLocalizedRoutes();
  const { slug } = router.query;

  useEffect(() => {
    if (!slug) router.push(getPath('/')).then();
    router
      .push(getPath('/company/:slug/reviews', { slug: slug as string }), undefined, {
        shallow: true,
      })
      .then();
  }, [router, getPath, slug]);

  return null;
};

export async function getServerSideProps({ res, locale, params: { slug } }) {
  const getPath = getPathWithLanguage(locale);

  if (res) {
    res.writeHead(301, {
      Location: getPath('/company/:slug/reviews', { slug }),
    });
    res.end();
  }

  return { props: {} };
}

export default Index;
