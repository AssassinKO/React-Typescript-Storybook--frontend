import { FC, useEffect } from 'react';
import { Box } from '@material-ui/core';
import { useFetchJobsPage } from './hooks/useFetchJobsPage';
import { SectionTitle } from '@homeproved/shared/ui';
import { FlexibleContentRenderer } from '@homeproved/shared/ui';
import { FlexibleContent } from '@homeproved/com/feature-basic-pages';

type VacaturesDetailPageProps = {
  slug: string;
};

export const VacaturesDetailPage: FC<VacaturesDetailPageProps> = ({ slug }) => {
  const { query } = useFetchJobsPage(slug);

  useEffect(() => {
    if (query.isError) {
      // TODO: show snackbar error
    }
  }, [query]);

  // TODO: page loader?
  if (query.isLoading) return null;

  return query.isSuccess ? (
    <Box pl={2} pr={2}>
      <SectionTitle label={query.data.data.title} morePadding underlineMobile />
      {query.data.data.flexibleContent.map((item: FlexibleContent, index) => (
        <FlexibleContentRenderer key={index} item={item.fields} type={item.name} />
      ))}
    </Box>
  ) : null;
};
