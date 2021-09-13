import React, { FC, useState } from 'react';
import set from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep';
import { FormWrapper, SearchWrapper, SectorListTitle } from './Atoms';
import { Search, SearchFormData } from '@homeproved/shared/ui';
import { SectorList } from './SectorList';
import { Sector, SectorDescendant } from '@homeproved/shared/data-access';
import { useTranslation } from 'react-i18next';
import { toggledArray } from '@homeproved/shared/util';

type ActivityPickerFormProps = {
  sectors: Sector[];
  selectedTags: number[];
  onChange: (id: number) => void;
};

const sectorNameMatchesTerm = (sector: Sector, term: string): boolean =>
  sector.data.name.toLowerCase().includes(term);

const filterSubSectorsByTerm = (sector: Sector, term: string): SectorDescendant[] =>
  sector.data.descendants.filter((sectorDescendant: SectorDescendant) =>
    sectorDescendant.data.name.toLowerCase().includes(term)
  );

export const ActivityPickerForm: FC<ActivityPickerFormProps> = ({
  sectors,
  selectedTags,
  onChange,
}) => {
  const { t } = useTranslation();
  const [searchInput, setSearchInput] = useState('');
  const [expandedTags, setExpandedTags] = useState([]);

  const handleSearch = (data: SearchFormData) => {
    const newExpandedTags = [];
    sectors
      .filter((sector) => {
        const searchTerm = data.searchTerm.toLowerCase();
        return (
          sectorNameMatchesTerm(sector, searchTerm) ||
          filterSubSectorsByTerm(sector, searchTerm).length > 0
        );
      })
      .forEach((sector) => newExpandedTags.push(sector.data.id));
    setExpandedTags(newExpandedTags);
    setSearchInput(data.searchTerm);
  };

  const handleExpandTag = (id: number) => {
    setExpandedTags(toggledArray(expandedTags, id));
  };

  const lowerCaseSearchInput = searchInput.toLowerCase();
  const filteredSectors: Sector[] = lowerCaseSearchInput
    ? sectors
        .map(
          (sector): Sector =>
            sectorNameMatchesTerm(sector, lowerCaseSearchInput)
              ? sector
              : set(
                  cloneDeep(sector),
                  'data.descendants',
                  filterSubSectorsByTerm(sector, lowerCaseSearchInput)
                )
        )
        .filter((sector) => sector.data.descendants.length > 0)
    : sectors;

  return (
    <FormWrapper>
      <SearchWrapper>
        <Search
          mode="compact"
          placeholder={t('activityPicker.searchPlaceholder')}
          onChange={handleSearch}
        />
      </SearchWrapper>
      <SectorListTitle>{t('activityPicker.header')}</SectorListTitle>
      <SectorList
        sectors={filteredSectors}
        expandedTags={expandedTags}
        selectedTags={selectedTags}
        onExpandTag={handleExpandTag}
        onChange={onChange}
      />
    </FormWrapper>
  );
};
