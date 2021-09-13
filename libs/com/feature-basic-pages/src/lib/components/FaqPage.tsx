import React, { FC, useEffect } from 'react';
import { useFetchBasicPage } from '../hooks/useFetchBasicPage';
import {
  SectionTitle,
  FlexibleContentRenderer,
  Icons,
  LegalAdviceCta,
} from '@homeproved/shared/ui';
import { FlexibleContent } from '../types';
import { Box } from '@material-ui/core';
import styled from 'styled-components';
import { useLocalizedRoutes } from '@homeproved/com/feature-localized-routes';

const StyledSectionTitle = styled(SectionTitle)`
  height: 6rem;
  margin-top: -2rem;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.values.xs + 'px'}) {
    margin-top: 0rem;
  }
  svg {
    margin-right: 1rem;
    margin-top: -2rem;
    margin-left: -4rem;
  }
`;

export const FaqPage: FC = () => {
  const { query } = useFetchBasicPage('faq');
  const { getPath } = useLocalizedRoutes();

  useEffect(() => {
    if (query.isError) {
      // TODO: show snackbar error
    }
  }, [query]);

  // TODO: page loader?
  if (query.isLoading) return null;
  return query.isSuccess ? (
    <Box pl={2} pr={2}>
      <StyledSectionTitle
        label={query.data.data.title}
        icon={Icons.QUESTIONMARK}
        iconSize={4}
        morePadding
        underlineMobile
      />
      {query.data.data.flexibleContent.map((item: FlexibleContent, index) => (
        <FlexibleContentRenderer key={index} item={item.fields} type={item.name} />
      ))}
      <LegalAdviceCta href={getPath('/legal-advice')} />
    </Box>
  ) : null;
};
