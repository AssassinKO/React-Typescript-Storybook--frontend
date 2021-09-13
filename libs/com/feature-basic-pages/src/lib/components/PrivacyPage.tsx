import React, { FC, useEffect } from 'react';
import { useFetchBasicPage } from '../hooks/useFetchBasicPage';
import { FlexibleContentRenderer, Icons, SectionTitle } from '@homeproved/shared/ui';
import { FlexibleContent } from '../types';
import { Box } from '@material-ui/core';
import styled from 'styled-components';

const StyledSectionTitle = styled(SectionTitle)`
  height: 6rem;
  margin-top: -2rem;
  @media screen and (max-width: ${({ theme }) => theme.breakpoints.values.xs + 'px'}) {
    margin-top: 0rem;
  }
  svg {
    margin-right: 1rem;
    margin-left: -4rem;
  }
`;

export const PrivacyPage: FC = () => {
  const { query } = useFetchBasicPage('privacy');

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
        icon={Icons.HELMET_OUTLINE}
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
