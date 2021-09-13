import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Wrapper } from './activity-picker/Atoms';
import { useSectors } from './useSectors';
import { ActivityPickerForm } from './activity-picker/ActivityPickerForm';
import { ActivityPickerSelection } from './activity-picker/ActivityPickerSelection';
import { RequestCategoryLink } from './activity-picker/RequestCategoryLink';
import { toggledArray } from '@homeproved/shared/util';
import { ErrorMessage } from '@homeproved/shared/feature-forms';

type ActivityPickerProps = {
  value?: number[];
  onChange: (tags: number[]) => void;
  isMobile?: boolean;
  className?: string;
  direction?: 'horizontal' | 'vertical';
  error?: string | false;
  openRequestCategoryModal: () => void;
};

export const ActivityPicker: FC<ActivityPickerProps> = ({
  onChange,
  value = [],
  isMobile = false,
  direction = 'horizontal',
  className,
  error: validationError,
  openRequestCategoryModal,
}) => {
  const { t } = useTranslation();
  const { data: sectors, isLoading, error } = useSectors();
  const [selectedTags, setSelectedTags] = useState(value);

  useEffect(() => {
    setSelectedTags(value);
  }, [value]);

  if (isLoading) return <>{t('app.pro.pages.profile.activitypicker.loading')}</>;
  if (error) return <>{error.toString()}</>;
  if (!sectors) return <>{t('app.pro.pages.profile.activitypicker.invalid')}</>;

  return (
    <Wrapper isMobile={isMobile} direction={direction} className={className}>
      <ActivityPickerForm
        sectors={sectors}
        selectedTags={selectedTags}
        onChange={(id: number) => {
          onChange(toggledArray(selectedTags, id));
          setSelectedTags(toggledArray(selectedTags, id));
        }}
      />
      {validationError && <ErrorMessage>{validationError}</ErrorMessage>}
      {isMobile && (
        <RequestCategoryLink
          isMobile={isMobile}
          openRequestCategoryModal={openRequestCategoryModal}
        />
      )}
      <ActivityPickerSelection
        sectors={sectors}
        selectedTags={selectedTags}
        direction={direction}
        onChange={(id) => {
          onChange(toggledArray(selectedTags, id));
          setSelectedTags(toggledArray(selectedTags, id));
        }}
        isMobile={isMobile}
      />
      {!isMobile && <RequestCategoryLink openRequestCategoryModal={openRequestCategoryModal} />}
    </Wrapper>
  );
};

export default ActivityPicker;
