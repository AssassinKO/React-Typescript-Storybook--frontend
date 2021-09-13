import React, { FC } from 'react';
import styled from 'styled-components';
import { Button, Icons, IconTile, SectionTitle } from '@homeproved/shared/ui';
import { useTranslation } from 'react-i18next';
import { Box, useMediaQuery, useTheme } from '@material-ui/core';
import { HomepageContainerWrapper } from '../container/Container';
import { useLocalizedRoutes } from '@homeproved/com/feature-localized-routes';
import { Sector } from '@homeproved/shared/data-access';
import Link from 'next/link';

type CategoriesProps = {
  sectors: Sector[] | null;
};

const StyledHomePageCategories = styled.div`
  margin-top: 6rem;
  overflow: hidden;
`;

const CategoriesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -0.5rem;
  padding: 1rem 0 1.5rem;
`;

const IconTileWrapper = styled(({ isMobile, isTablet, ...restProps }) => <div {...restProps} />)`
  margin: 0.5rem;
  min-height: 12rem;
  flex: ${({ isMobile, isTablet }) =>
    isMobile
      ? '0 0 calc(50% - 1rem)'
      : isTablet
      ? '0 0 calc(25% - 1rem)'
      : '0 0 calc(12.5% - 1rem)'};

  > * {
    width: 100%;
    height: 100%;
  }
`;
const RotatedIconIconTile = styled(IconTile)`
  div {
    background: none;
  }
  svg {
    transform: rotate(90deg);
  }
`;

const StyledButton = styled(({ isTablet, ...restProps }) => <Button {...restProps} />)`
  display: ${({ isTablet }) => isTablet && 'table'};
  margin: ${({ isTablet }) => isTablet && 'auto'};
`;

export const Categories: FC<CategoriesProps> = ({ sectors }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.xs));
  const isTablet = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm));

  const subSectors =
    sectors?.length > 0 &&
    []
      .concat(
        ...sectors.map(({ data }) =>
          data.descendants.map((subSector: Sector) => {
            return { ...subSector?.data, sectorSlug: data.slug };
          })
        )
      )
      .slice(0, 7);
  const { getPath } = useLocalizedRoutes();

  if (!subSectors || subSectors.length === 0) return null;

  return (
    <HomepageContainerWrapper>
      <StyledHomePageCategories>
        <SectionTitle
          label={t('app.com.pages.landing.categories.header')}
          textAlign={isMobile ? 'center' : 'left'}
        />
        <CategoriesWrapper>
          {subSectors.map(
            (subSector) =>
              subSector.id != null && (
                <IconTileWrapper key={subSector.id} isMobile={isMobile} isTablet={isTablet}>
                  <Link
                    href={getPath('/sectors/:sector/:subsector', {
                      sector: subSector.sectorSlug,
                      subsector: subSector.slug,
                    })}
                  >
                    <Box display="flex">
                      <IconTile
                        icon={Icons[subSector.icon.toUpperCase()] || Icons.HELMET_OUTLINE}
                        label={subSector.name}
                      />
                    </Box>
                  </Link>
                </IconTileWrapper>
              )
          )}
          <IconTileWrapper isMobile={isMobile} isTablet={isTablet}>
            <Link href={getPath('/sectors')}>
              <Box display="flex">
                <RotatedIconIconTile
                  icon={Icons.KEBAB}
                  label={t('app.com.pages.landing.categories.button')}
                />
              </Box>
            </Link>
          </IconTileWrapper>
        </CategoriesWrapper>
        <StyledButton variant="light" size="large" isTablet={isTablet} href={getPath('/sectors')}>
          {t('app.com.pages.landing.categories.button')}
        </StyledButton>
      </StyledHomePageCategories>
    </HomepageContainerWrapper>
  );
};
