import React, { FC, useEffect, useMemo, useState } from 'react';
import { useSectors, ActivityPicker } from '@homeproved/shared/feature-sectors';
import { TileSelector } from './tiles/TileSelector';
import { CompanyData, Sector } from '@homeproved/shared/data-access';
import { ActivityPickerWrapper, LoadMoreLink } from './tiles/Atoms';
import { useTranslation } from 'react-i18next';
import { useMediaQuery, useTheme } from '@material-ui/core';

type SectorsProps = {
  company: CompanyData;
  onSectorsChange: (selectedSectors: number[]) => void;
  readOnly: boolean;
  openRequestCategoryModal: () => void;
};

export const Sectors: FC<SectorsProps> = ({
  company,
  onSectorsChange,
  readOnly,
  openRequestCategoryModal,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const activityPickerMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.xs));
  const [selectedSectors, setSelectedSectors] = useState<number[]>([]);
  const [showActivityPicker, setShowActivityPicker] = useState(false);
  const { data: sectors } = useSectors();

  const sectorsToRender: Sector[] = useMemo(() => {
    if (!sectors) return;
    let subSectors: Sector[] = [];
    sectors.forEach((sector) => {
      subSectors = subSectors.concat(sector.data.descendants as Sector[]);
    });
    return subSectors.filter(
      (subSector) =>
        company.relations.sectors.find((item) => item.data.id === subSector.data.id) ||
        selectedSectors.includes(subSector.data.id)
    );
  }, [sectors, selectedSectors]);

  useEffect(() => {
    if (!sectorsToRender) return;
    if (sectorsToRender.length === 0) setShowActivityPicker(true);
  }, [sectorsToRender]);

  useEffect(() => {
    onSectorsChange(selectedSectors);
  }, [selectedSectors]);

  return sectorsToRender ? (
    <>
      <TileSelector
        type="sector"
        sectors={sectorsToRender}
        selectedSectors={selectedSectors}
        onChange={(value) => {
          setSelectedSectors(value);
        }}
        readOnly={readOnly}
      />
      {!readOnly && !showActivityPicker && (
        <LoadMoreLink onClick={() => setShowActivityPicker(true)}>
          {t('reviews.write.sectors.more')}
        </LoadMoreLink>
      )}
      {!readOnly && showActivityPicker && (
        <ActivityPickerWrapper hasRenderedSectors={sectorsToRender.length > 0}>
          <ActivityPicker
            value={selectedSectors}
            onChange={setSelectedSectors}
            isMobile={activityPickerMobile}
            openRequestCategoryModal={openRequestCategoryModal}
          />
        </ActivityPickerWrapper>
      )}
    </>
  ) : null;
};
