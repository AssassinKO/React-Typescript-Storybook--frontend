import React, { FC } from 'react';
import { SelectedActivity, SelectedList, SelectedWrapper } from './Atoms';
import { Icons, SvgIcon } from '@homeproved/shared/ui';
import { useTranslation } from 'react-i18next';
import { Sector } from '@homeproved/shared/data-access';

type ActivityPickerSelectionProps = {
  sectors: Sector[];
  selectedTags: number[];
  onChange: (id: number) => void;
  direction?: 'horizontal' | 'vertical';
  isMobile: boolean;
};

export const ActivityPickerSelection: FC<ActivityPickerSelectionProps> = ({
  sectors,
  selectedTags,
  onChange,
  direction = 'horizontal',
  isMobile,
}) => {
  const { t } = useTranslation();

  return (
    <SelectedWrapper direction={direction} mobile={isMobile}>
      <b>
        {t('activityPicker.selectedHeader')}&nbsp;<sup>*</sup>
      </b>
      {selectedTags.length === 0 ? (
        <span>{t('activityPicker.noneSelected')}</span>
      ) : (
        <SelectedList>
          {sectors
            .reduce((prev, curr) => [...prev, ...curr.data.descendants], [])
            .filter((sector) => selectedTags.includes(sector.data.id))
            .map((sector, index) => (
              <SelectedActivity key={index}>
                {sector.data.name}
                <span onClick={() => onChange(sector.data.id)}>
                  <SvgIcon icon={Icons.CROSS} size={1.5} />
                </span>
              </SelectedActivity>
            ))}
        </SelectedList>
      )}
    </SelectedWrapper>
  );
};
