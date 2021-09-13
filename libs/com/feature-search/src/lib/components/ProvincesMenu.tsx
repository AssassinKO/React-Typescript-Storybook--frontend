import {
  RefinementListProvided,
  RefinementListExposed,
  connectRefinementList,
} from 'react-instantsearch-core';
import React from 'react';
import { Checkbox } from '@homeproved/shared/feature-forms';
import { useTranslation } from 'react-i18next';
import { FilteredList, FilteredListItem } from './Atoms';

const provinces = [
  'antwerpen',
  'henegouwen',
  'limburg',
  'luik',
  'luxemburg',
  'namen',
  'oost-vlaanderen',
  'vlaams-brabant',
  'waals-brabant',
  'west-vlaanderen',
];

type Props = RefinementListProvided & { mobile: boolean };

const ProvincesMenuComponent = ({ items, refine, mobile }: Props) => {
  const { t } = useTranslation();
  const refinedItems = items.filter((item) => item.isRefined === true).map((item) => item.label);

  return (
    <FilteredList>
      {provinces.map((province) => {
        const isRefined = refinedItems.includes(province);
        return (
          <FilteredListItem key={province}>
            <Checkbox
              label={t(`provinces.be.${province}`)}
              labelSize={1.5}
              value={isRefined}
              onChange={() =>
                isRefined
                  ? refine(refinedItems.filter((refinedItem) => refinedItem !== province))
                  : refine([...refinedItems, province])
              }
              height={mobile ? 3.5 : 3}
              labelWeight={isRefined && 700}
              labelCapitalized
            />
          </FilteredListItem>
        );
      })}
    </FilteredList>
  );
};

export const ProvincesMenu = connectRefinementList(ProvincesMenuComponent) as React.ComponentClass<
  RefinementListExposed & { mobile: boolean }
>;
