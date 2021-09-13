import React, { FC, useEffect } from 'react';
import { ImageWrapper, Title, Text } from '../Atoms';
import { RatingImageToShare } from '@homeproved/shared/ui';
import { CompanyData, Score } from '@homeproved/shared/data-access';
import { useTranslation } from 'react-i18next';

export interface ShareHomeprovedScoreProps {
  isMobile: boolean;
  companyScore: Score;
  company: CompanyData;
  handleImageGenerated: (url: string) => void;
  hideDownload: () => void;
}

export const ShareHomeprovedScore: FC<ShareHomeprovedScoreProps> = ({
  isMobile,
  companyScore,
  company,
  handleImageGenerated,
  hideDownload,
}) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (companyScore?.data === null) hideDownload();
  }, [companyScore, hideDownload]);

  return companyScore?.data !== null ? (
    <>
      <Title>{t('app.pro.pages.socialShare.shareScore')}</Title>
      <ImageWrapper>
        <RatingImageToShare
          score={companyScore?.data?.score}
          totalReviews={parseInt(companyScore?.data?.total)}
          isMobile={isMobile}
          companySlug={company.slug}
          onImageGenerated={handleImageGenerated}
        />
      </ImageWrapper>
    </>
  ) : (
    <Text>{t('app.pro.pages.socialShare.noScore')}</Text>
  );
};
