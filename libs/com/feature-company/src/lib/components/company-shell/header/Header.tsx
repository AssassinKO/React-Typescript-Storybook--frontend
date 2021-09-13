import React, { FC } from 'react';
import { Button, SvgIcon, Icons } from '@homeproved/shared/ui';
import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { CompanyData } from '@homeproved/shared/data-access';
import {
  Banner,
  BannerFree,
  Content,
  Logo,
  ImageWrapper,
  Title,
  MobileHeader,
  StyledA,
  Claimed,
  MobileScore,
  DesktopScore,
  MobileHeaderClaim,
  MobileLocation,
  MobileCity,
} from './Atoms';
import { useLocalizedRoutes as useComLocalizedRoutes } from '@homeproved/com/feature-localized-routes';
import { useLocalizedRoutes as useProLocalizedRoutes } from '@homeproved/pro/feature-localized-routes';
import { CompanyShellTab } from '../../../CompanyShell';
import { Box } from '@material-ui/core';

export interface HeaderProps {
  data: CompanyData;
  claimed?: boolean;
  isMobile?: boolean;
  isTablet?: boolean;
  hasReviews?: boolean;
  activeTab: CompanyShellTab;
}

export const Header: FC<HeaderProps> = ({
  data,
  claimed = false,
  isMobile,
  isTablet = false,
  hasReviews = false,
  activeTab,
}) => {
  const { t } = useTranslation();
  const { getPath: getComPath } = useComLocalizedRoutes();
  const { getPath: getProPath } = useProLocalizedRoutes();

  const ConditionalWrapper = ({ banner, wrapper, children }) =>
    !banner ? (
      <BannerFree
        isMobile={isMobile}
        isTablet={isTablet}
        banner={data.cover ? data.cover.data.original : false}
      >
        {children}
      </BannerFree>
    ) : (
      wrapper(children)
    );

  return (
    <>
      <ConditionalWrapper
        banner={!!data.cover}
        wrapper={(children) => (
          <Banner
            isMobile={isMobile}
            isTablet={isTablet}
            banner={data.cover ? data.cover.data.original : false}
          >
            {children}
          </Banner>
        )}
      >
        {!isTablet && (
          <>
            <Content isMobile={isMobile} banner={!!data.cover}>
              <Logo isMobile={isMobile} banner={!!data.cover}>
                {claimed && (
                  <Claimed isMobile={isMobile}>
                    <SvgIcon icon={Icons.CHECKMARK} size={1.3} color={'#fff'} />
                  </Claimed>
                )}
                <ImageWrapper isMobile={isMobile}>
                  <img
                    src={
                      data.logo ? data.logo.data.conversions['square-l'] : '/logo-default@2x.png'
                    }
                    alt="logo"
                  />
                </ImageWrapper>
              </Logo>
              <Title isTablet={isTablet} banner={!!data.cover}>
                {data.name}
              </Title>
              {claimed ? (
                <Button
                  href={getComPath('/write-review/:slug', {
                    slug: data.slug,
                  })}
                >
                  {t('app.com.pages.company.companyShell.writeReview')}
                </Button>
              ) : (
                <Box display="flex">
                  <Button
                    variant={isMobile ? 'transparent' : 'gradient'}
                    href={`${process.env.NEXT_PUBLIC_PRO_URL}${getProPath(
                      '/registration/step1'
                    )}?id=${data.id}`}
                    target={'_blank'}
                  >
                    {t('app.com.pages.company.companyShell.claim')}
                  </Button>
                  {hasReviews && (
                    <Box ml={2}>
                      <Button
                        href={getComPath('/write-review/:slug', {
                          slug: data.slug,
                        })}
                      >
                        {t('app.com.pages.company.companyShell.writeReview')}
                      </Button>
                    </Box>
                  )}
                </Box>
              )}
            </Content>
            <DesktopScore id={data.id} size={'large'} banner={!!data.cover} />
          </>
        )}
      </ConditionalWrapper>
      {isTablet && (
        <MobileHeader claimed={claimed}>
          {!claimed && (
            <MobileHeaderClaim variant={'white'}>
              <Link
                href={`${process.env.NEXT_PUBLIC_PRO_URL}${getProPath('/registration/step1')}?id=${
                  data.id
                }`}
                passHref
              >
                <StyledA
                  href={`${process.env.NEXT_PUBLIC_PRO_URL}${getProPath(
                    '/registration/step1'
                  )}?id=${data.id}`}
                  target="_blank"
                >
                  {t('app.com.pages.company.companyShell.claim')}
                </StyledA>
              </Link>
            </MobileHeaderClaim>
          )}
          <Logo isMobile={isMobile} isTablet={isTablet} banner={!!data.cover}>
            {claimed && (
              <Claimed isMobile={isMobile}>
                <SvgIcon icon={Icons.CHECKMARK} size={1.3} color={'#fff'} />
              </Claimed>
            )}
            <ImageWrapper isMobile={isMobile}>
              <img
                src={data.logo ? data.logo.data.conversions['square-l'] : '/logo-default@2x.png'}
                alt="logo"
              />
            </ImageWrapper>
            <MobileLocation>
              <SvgIcon icon={Icons.LOCATION_SOLID} size={1.2} />
              <MobileCity>{data.city}</MobileCity>
            </MobileLocation>
          </Logo>
          {activeTab !== 'realizations' && (
            <Title isTablet={isTablet} banner={!!data.cover}>
              {data.name}
            </Title>
          )}
          {hasReviews && (
            <>
              <Button
                href={getComPath('/write-review/:slug', {
                  slug: data.slug,
                })}
              >
                {t('app.com.pages.company.companyShell.writeReview')}
              </Button>
              <MobileScore id={data.id} />
            </>
          )}
        </MobileHeader>
      )}
    </>
  );
};
