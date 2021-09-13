import React, { FC, useEffect } from 'react';
import { useFetchBasicPage } from '../hooks/useFetchBasicPage';
import { Icons, SectionTitle, FlexibleContentRenderer } from '@homeproved/shared/ui';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { FlexibleContent } from '../types';
import { Box } from '@material-ui/core';

const SubTitle = styled.div`
  font-size: 2.4rem;
  font-weight: 700;
  text-align: center;
  margin: 3rem;
`;

export const LegalAdvicePage: FC = () => {
  const { t } = useTranslation();
  const { query } = useFetchBasicPage('legal-advice');

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
        icon={Icons.BALANCE}
        morePadding
        underlineMobile
      />
      <SubTitle>{t('basicPages.legalAdvice.subtitle')}</SubTitle>
      {query.data.data.flexibleContent.map((item: FlexibleContent, index) => (
        <FlexibleContentRenderer key={index} item={item.fields} type={item.name} />
      ))}
    </Box>
  ) : null;
};
