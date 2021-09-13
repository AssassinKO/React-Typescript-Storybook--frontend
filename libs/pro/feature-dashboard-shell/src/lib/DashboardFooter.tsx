import React, { FC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { DancingScriptQuote, Icons, LogoIcon, SvgIcon } from '@homeproved/shared/ui';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { useLocalizedRoutes } from '@homeproved/pro/feature-localized-routes';
import { useLocalizedRoutes as useComLocalizedRoutes } from '@homeproved/com/feature-localized-routes';

const MobileWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 6.5rem;
  padding: 1rem 4rem;
  background: ${({ theme }) => theme.palette.grey['800']};
`;

const MobileInner = styled.div`
  display: flex;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.2rem;
  color: #fff;
  align-items: center;
`;

const MobileLogoIcon = styled(LogoIcon)`
  margin-right: 1rem;
`;

const CompanyName = styled.div`
  font-family: ${({ theme }) => theme.config.fonts.Cabrito};
  font-weight: 700;
`;

const DesktopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 6.5rem;
  padding: 1rem 4rem;
  background: ${({ theme }) => theme.palette.grey['800']};

  & > div {
    display: flex;
    align-items: center;
  }
`;

const Center = styled.div`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.2rem;
  color: #fff;
  display: flex;
  align-items: center;

  & > div,
  & > a {
    margin-right: 2rem;
    color: #fff;
    text-decoration: none;
  }

  & > a:hover {
    text-decoration: underline;
  }
`;

const StyledSvgIcon = styled(SvgIcon)`
  vertical-align: middle;
  margin-right: 0.5rem;
`;

export const DashboardFooter: FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.proDashboard));
  const { getPath } = useLocalizedRoutes();
  const { getPath: getComPath } = useComLocalizedRoutes();

  return isMobile ? (
    <MobileWrapper>
      <MobileInner>
        <MobileLogoIcon size={5} />
        <div>
          <CompanyName>{t('app.pro.dashboard.footer.companyName')}</CompanyName>
          <div>{t('app.pro.dashboard.footer.address1')}</div>
          <div>{t('app.pro.dashboard.footer.address2')}</div>
        </div>
      </MobileInner>
    </MobileWrapper>
  ) : (
    <DesktopWrapper>
      <div>
        <DancingScriptQuote quote={t('app.pro.baseline')} color="white" size={1.8} />
      </div>
      <Center>
        <div>
          <StyledSvgIcon
            icon={Icons.LOCATION_OUTLINE}
            color={theme.palette.grey['A200']}
            size={1.4}
          />{' '}
          Langestraat 207 / 2240 Zandhoven
        </div>
        <a href="mailto:info@homeproved.com" target="_blank" rel="noreferrer">
          <StyledSvgIcon
            icon={Icons.ENVELOPE_OUTLINE}
            color={theme.palette.grey['A200']}
            size={1.4}
          />
          {t('app.pro.dashboard.footer.email')}
        </a>
        <a href="tel:0032032070701" target="_blank" rel="noreferrer">
          <StyledSvgIcon icon={Icons.PHONE} color={theme.palette.grey['A200']} size={1.4} />
          {t('app.pro.dashboard.footer.phone')}
        </a>
        <a
          href={
            process.env.NEXT_PUBLIC_COM_URL
              ? `${process.env.NEXT_PUBLIC_COM_URL}${getComPath('/')}`
              : getPath('/')
          }
          target="_blank"
          rel="noreferrer"
        >
          <StyledSvgIcon icon={Icons.GLOBE} color={theme.palette.grey['A200']} size={1.4} />
          {t('app.pro.dashboard.footer.url')}
        </a>
      </Center>
      <div>
        <LogoIcon />
      </div>
    </DesktopWrapper>
  );
};
