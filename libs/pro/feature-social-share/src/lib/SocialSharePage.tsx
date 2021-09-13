import React, { FC, useState, useEffect } from 'react';
import { SectionTitle, Icons } from '@homeproved/shared/ui';
import { useTranslation } from 'react-i18next';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { ButtonGroup } from './button-group/ButtonGroup';
import {
  CompaniesApiFactory,
  MediaApiFactory,
  useApiFactory,
  useMutationFetch,
  useQueryFetch,
  UserData,
} from '@homeproved/shared/data-access';
import { useCompany } from '@homeproved/shared/feature-company';
import {
  Wrapper,
  Sidebar,
  Content,
  Label,
  StyledButton,
  Select,
  SelectWrapper,
  StarIcon,
  Text,
} from './Atoms';
import { ShareHomeprovedScore } from './share-homeproved-score/ShareHomeprovedScore';
import { ShareReview } from './share-review/ShareReview';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';

type SocialSharePageProps = {
  user: UserData;
  getComPath: GetPathFunction;
};

export const SocialSharePage: FC<SocialSharePageProps> = ({ user, getComPath }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.xs));
  const isDesktop = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.md));
  const [shareMode, setShareMode] = useState<'score' | 'review'>('score');
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState<string>('');
  const [hideButtonGroup, setHideButtonGroup] = useState<boolean>(false);

  const { company, isSuccess } = useCompany(user?.relations?.company?.data?.id?.toString());

  const companiesApi = useApiFactory(CompaniesApiFactory);
  const { query: companyScore } = useQueryFetch('companyScore', () =>
    companiesApi.apiCompaniesCompanyScoreGet(company?.id?.toString())
  );

  const mediaApi = useApiFactory(MediaApiFactory);
  const { mutation: mediaMutation } = useMutationFetch('social-share', (body) =>
    mediaApi.apiImageUploadModelIdPost(company.id, body)
  );

  const handleSelect = (event) => {
    setShareMode(event.target.value);
    setHideButtonGroup(false);
  };

  const handleImageGenerated = (url) => {
    setImage(url);
    mediaMutation.mutate({
      collection: 'social_shares',
      model: 'company',
      photo: url,
    });
  };

  const hideDownload = () => {
    setHideButtonGroup(true);
  };

  useEffect(() => {
    if (!isSuccess) return;
    setUrl(process.env.NEXT_PUBLIC_COM_URL + getComPath('/company/:slug', { slug: company.slug }));
  }, [image, isSuccess, getComPath, company]);

  return (
    <>
      <SectionTitle
        label={t('app.pro.pages.socialShare.title')}
        uppercase={true}
        textAlign={isMobile ? 'center' : 'left'}
        ignoreMobile={true}
        font={'PTSans'}
      />
      <Wrapper>
        <Sidebar isDesktop={isDesktop}>
          <Label>{t('app.pro.pages.socialShare.selectTitle')}</Label>
          <SelectWrapper>
            <StarIcon icon={Icons.STAR_SOLID} size={1.5} color={theme.palette.grey['A200']} />
            <Select onChange={(e) => handleSelect(e)}>
              <option value="score">{t('app.pro.pages.socialShare.selectOptionScore')}</option>
              <option value="review">{t('app.pro.pages.socialShare.selectOptionReview')}</option>
            </Select>
          </SelectWrapper>
          {shareMode === 'review' && (
            <StyledButton size={'small'}>
              {t('app.pro.pages.socialShare.selectReview')}
            </StyledButton>
          )}
        </Sidebar>
        {isSuccess && companyScore.isSuccess ? (
          <>
            <Content isDesktop={isDesktop}>
              {shareMode === 'score' ? (
                <ShareHomeprovedScore
                  isMobile={isMobile}
                  companyScore={companyScore.data}
                  company={company}
                  handleImageGenerated={handleImageGenerated}
                  hideDownload={hideDownload}
                />
              ) : (
                <ShareReview
                  isMobile={isMobile}
                  company={company}
                  handleImageGenerated={handleImageGenerated}
                  hideDownload={hideDownload}
                />
              )}
              {!isMobile && !hideButtonGroup && <ButtonGroup image={image} url={url} />}
            </Content>
            {isMobile && !hideButtonGroup && <ButtonGroup image={image} url={url} />}
          </>
        ) : (
          <Content>
            <Text>{t('app.pro.pages.socialShare.loading')}</Text>
          </Content>
        )}
      </Wrapper>
    </>
  );
};
