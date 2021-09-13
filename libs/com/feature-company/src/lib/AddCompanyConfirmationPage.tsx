import React, { FC, useEffect } from 'react';
import { Button, DancingScriptQuote } from '@homeproved/shared/ui';
import { useTranslation } from 'react-i18next';
import styled, { useTheme } from 'styled-components';
import ReactHtmlParser from 'react-html-parser';
import { ClaimCTA } from './components/add-company/ClaimCTA';
import { useMediaQuery } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useLocalizedRoutes as useComLocalizedRoutes } from '@homeproved/com/feature-localized-routes';
import { useLocalizedRoutes as useProLocalizedRoutes } from '@homeproved/pro/feature-localized-routes';
import { usePersistentData } from '@homeproved/shared/data-access';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 3rem;
`;

const ThankYouMessage = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  display: flex;
  margin-bottom: ${({ mobile }) => (mobile ? '2rem' : '4rem')};
`;

const ThumbsUp = styled.div`
  margin-left: 1.5rem;
  width: 5rem;

  img {
    width: 100%;
  }
`;

const Title = styled.div`
  font-family: ${({ theme }) => theme.config.fonts.Cabrito};
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 3rem;
`;

const ThanksDescription = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.4rem;
  font-weight: 300;
  margin-bottom: ${({ mobile }) => (mobile ? '4rem' : '6rem')};
  text-align: center;
`;

const ButtonsWrapper = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  display: flex;
  flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
  justify-content: ${({ isMobile }) => (isMobile ? 'center' : 'space-around')};
  margin-bottom: 6rem;
`;

const ButtonsDivider = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.4rem;
  font-weight: 700;
  text-transform: uppercase;
  display: flex;
  flex-direction: ${({ isMobile }) => (isMobile ? 'row' : 'column')};
  align-content: center;
  justify-content: center;
  margin: ${({ isMobile }) => (isMobile ? '1rem 0' : '0 4rem')};
`;

export const AddCompanyConfirmationPage: FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const { getPath: getComPath } = useComLocalizedRoutes();
  const { getPath: getProPath } = useProLocalizedRoutes();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.xs));
  const { company } = usePersistentData();

  useEffect(() => {
    if (company == null) {
      router.push(getComPath('/add-company'), undefined, { shallow: true }).then();
    }
  }, [company, getComPath, router]);

  if (company == null) return null;

  return (
    <Wrapper>
      <ThankYouMessage mobile={isMobile}>
        <DancingScriptQuote
          quote={t('app.com.pages.addCompanyConfirmation.thanks')}
          color="dark"
          size={4.8}
        />
        <ThumbsUp>
          <img src="/approved2.png" alt="" loading="lazy" />
        </ThumbsUp>
      </ThankYouMessage>
      <Title>
        {t('app.com.pages.addCompanyConfirmation.title').replace('%COMPANY_NAME%', company.name)}
      </Title>
      <ThanksDescription mobile={isMobile}>
        {ReactHtmlParser(
          t('app.com.pages.addCompanyConfirmation.thanksDescription').replace(
            '%COMPANY_NAME%',
            company.name
          )
        )}
      </ThanksDescription>
      <ButtonsWrapper isMobile={isMobile}>
        <Button
          variant="gradient"
          size="large"
          href={getComPath('/company/:slug/reviews', { slug: company.slug })}
        >
          {t('app.com.pages.addCompanyConfirmation.btnViewCompany')}
        </Button>
        <ButtonsDivider isMobile={isMobile}>
          {t('app.com.pages.addCompanyConfirmation.btnDivider')}
        </ButtonsDivider>
        <Button
          variant="light"
          size="large"
          href={getComPath('/write-review/:slug', { slug: company.slug })}
        >
          {t('app.com.pages.addCompanyConfirmation.btnWriteReview')}
        </Button>
      </ButtonsWrapper>
      <ClaimCTA
        isMobile={isMobile}
        companyName={company.name}
        companyId={company.id}
        getPath={getProPath}
      />
    </Wrapper>
  );
};
