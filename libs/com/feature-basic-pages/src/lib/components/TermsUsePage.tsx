import React, { FC, useEffect } from 'react';
import { useFetchBasicPage } from '../hooks/useFetchBasicPage';
import { Icons, SectionTitle, FlexibleContentRenderer } from '@homeproved/shared/ui';
import { FlexibleContent } from '../types';
import { Box } from '@material-ui/core';

export const TermsUsePage: FC = () => {
  const { query } = useFetchBasicPage('terms-use');

  useEffect(() => {
    if (query.isError) {
      // TODO: show snackbar error
    }
  }, [query]);

  // TODO: page loader?
  if (query.isLoading) return null;

  return query.isSuccess ? (
    <Box pl={2} pr={2}>
      <SectionTitle
        label={query.data.data.title}
        icon={Icons.SCROLL}
        iconSize={3}
        morePadding
        underlineMobile
      />
      {query.data.data.flexibleContent.map((item: FlexibleContent, index) => (
        <FlexibleContentRenderer key={index} item={item.fields} type={item.name} />
      ))}
    </Box>
  ) : null;
};
