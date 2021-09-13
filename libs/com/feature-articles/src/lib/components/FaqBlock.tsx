import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';
import { Button } from '@homeproved/shared/ui';
import { Box } from '@material-ui/core';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { FaqBlockWrapper, FaqDescription, FaqTitle } from './Atoms';
import ReactHtmlParser from 'react-html-parser';

type FaqBlockProps = {
  isMobile: boolean;
  isTablet: boolean;
  getPath: GetPathFunction;
};

export const FaqBlock: FC<FaqBlockProps> = ({ isMobile, isTablet, getPath }) => {
  const { t } = useTranslation();
  return (
    <FaqBlockWrapper mobile={isMobile} tablet={isTablet}>
      <FaqTitle variant="h3" tablet={isTablet}>
        {t('app.com.pages.housingAdvice.bySector.titleFAQ')}
      </FaqTitle>
      <FaqDescription variant="body1" mobile={isMobile} tablet={isTablet}>
        {ReactHtmlParser(t('app.com.pages.housingAdvice.bySector.descriptionFAQ'))}
      </FaqDescription>
      <Box display="flex" justifyContent="center">
        <Button variant="white" href={getPath('/faq')}>
          {t('app.com.pages.housingAdvice.bySector.ctaFAQ')}
        </Button>
      </Box>
    </FaqBlockWrapper>
  );
};
