import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SectorData, SectorDescendant } from '@homeproved/shared/data-access';
import { Button, Icons, ResponsiveImage, SvgIcon } from '@homeproved/shared/ui';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';
import {
  DotsOuter,
  DotsOuterPlaceholder,
  ExpandableClose,
  ExpandableWrapper,
  Icon,
  SectorCard,
  SectorDescendantsWrapper,
  SectorNotFound,
  SectorTitle,
  SubSectorEntry,
  GridItem,
} from './Atoms';
import { Grid } from '@material-ui/core';
import { useRouter } from 'next/router';

type SectorListProps = {
  sectors: SectorData[];
  getPath: GetPathFunction;
  isMobile: boolean;
  isTablet: boolean;
};

export const SectorList: FC<SectorListProps> = ({ sectors, getPath, isMobile, isTablet }) => {
  const { t } = useTranslation();
  const [expandedSector, setExpandedSector] = useState<number | undefined>();
  const router = useRouter();
  return (
    <Grid container spacing={3}>
      {sectors.map((sector, index) => (
        <GridItem item xs={6} sm={3} mobile={isMobile} key={'sector-' + sector.id}>
          <SectorCard key={index} mobile={isMobile} tablet={isTablet}>
            <ResponsiveImage
              src={
                isMobile
                  ? sector.cover?.data?.conversions?.['square-s']
                  : isTablet
                  ? sector.cover?.data?.conversions?.['square-m']
                  : sector.cover?.data?.conversions?.['square-l']
              }
              alt={sector.name}
              ratio={1}
              borderRadius={0.5}
            />
            <SectorTitle>
              {sector.icon && (
                <Icon icon={Icons[sector.icon.toUpperCase()] || Icons.HELMET_OUTLINE} />
              )}
              <b>{sector.name}</b>
            </SectorTitle>
            {sector.descendants.length !== 0 ? (
              <>
                <div>
                  <ExpandableWrapper visible={expandedSector === sector.id}>
                    <SectorDescendantsWrapper>
                      {sector.descendants.map((sectorDescendant: SectorDescendant) => {
                        return (
                          <SubSectorEntry
                            key={sectorDescendant.data.id}
                            onClick={() =>
                              router.push(
                                getPath('/sectors/:sector/:subsector', {
                                  sector: sector.slug,
                                  subsector: sectorDescendant.data.slug.toString(),
                                })
                              )
                            }
                          >
                            {sectorDescendant.data.name}
                          </SubSectorEntry>
                        );
                      })}
                    </SectorDescendantsWrapper>
                    <ExpandableClose>
                      <span
                        onClick={() => {
                          setExpandedSector(undefined);
                        }}
                      >
                        <SvgIcon icon={Icons.ANGLE_UP} />
                      </span>
                    </ExpandableClose>
                  </ExpandableWrapper>
                </div>
                <DotsOuter
                  onClick={() => {
                    setExpandedSector(sector.id);
                  }}
                >
                  <SvgIcon icon={Icons.KEBAB} size={1.5} />
                </DotsOuter>
              </>
            ) : (
              <DotsOuterPlaceholder />
            )}
          </SectorCard>
        </GridItem>
      ))}
      <GridItem item xs={6} sm={3} mobile={isMobile}>
        <SectorNotFound>
          <b>{t('app.com.pages.sectors.sector_not_found')}</b>
          <Button variant="light" href={getPath('/company-search')}>
            {t('app.com.pages.sectors.find_button')}
          </Button>
        </SectorNotFound>
      </GridItem>
    </Grid>
  );
};
