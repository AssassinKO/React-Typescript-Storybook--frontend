import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import ReactHtmlParser from 'react-html-parser';
import { Box, useMediaQuery, useTheme } from '@material-ui/core';
import { Icons, SectionTitle, SvgIcon } from '@homeproved/shared/ui';
import { SectorData } from '@homeproved/shared/data-access';
import { IntroText, Intro, SelectASector } from './sector-page/Atoms';
import { SectorList } from './sector-page/SectorList';
import { useSectors } from './useSectors';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';

type SectorsPageProps = {
  getPath: GetPathFunction;
};

export const SectorsPage: FC<SectorsPageProps> = ({ getPath }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.xs));
  const isTablet = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm));
  const { data, isLoading, error } = useSectors();

  if (isLoading) return <>{t('app.com.pages.sectors.loading')}</>;
  if (error) return <>{error.toString()}</>;
  if (!data) return <>{t('app.com.pages.sectors.invalid')}</>;

  const sectors: SectorData[] = data.map((e) => e.data).filter((e) => e != null) as SectorData[];

  return (
    <Box pl={isTablet ? 2 : 0} pr={isTablet ? 2 : 0}>
      {!isTablet && (
        <SectionTitle
          label={t('app.com.pages.sectors.header')}
          textAlign="center"
          icon={Icons.HELMET_OUTLINE}
        />
      )}
      <Intro tablet={isTablet}>
        <IntroText tablet={isTablet}>
          <div className="header">{ReactHtmlParser(t('app.com.pages.sectors.introduction'))}</div>
          <p>{ReactHtmlParser(t('app.com.pages.sectors.paragraph'))}</p>
        </IntroText>
        {!isTablet && (
          <SelectASector>
            <SvgIcon icon={Icons.ARROW_CLICK} size={5} color="gradient" />
            <b>{t('app.com.pages.sectors.select')}</b>
            <SvgIcon icon={Icons.DOUBLE_ANGLE_DOWN} size={2} />
          </SelectASector>
        )}
      </Intro>
      {sectors && (
        <Box mt={2}>
          <SectorList sectors={sectors} getPath={getPath} isMobile={isMobile} isTablet={isTablet} />
        </Box>
      )}
    </Box>
  );
};

export default SectorsPage;
