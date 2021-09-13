import React, { FC, useEffect } from 'react';
import { useFetchBasicPage } from '../hooks/useFetchBasicPage';
import { FlexibleContentRenderer } from '@homeproved/shared/ui';
import { FlexibleContent } from '../types';
import { Box } from '@material-ui/core';

export const FaqIndividualsPage: FC = () => {
  const { query } = useFetchBasicPage('faq-individuals');

  useEffect(() => {
    if (query.isError) {
      // TODO: show snackbar error
    }
  }, [query]);

  // TODO: page loader?
  if (query.isLoading) return null;

  return query.isSuccess ? (
    <Box pl={2} pr={2}>
      {query.data.data.flexibleContent.map((item: FlexibleContent, index) => (
        <FlexibleContentRenderer key={index} item={item.fields} type={item.name} />
      ))}
    </Box>
  ) : null;
};
