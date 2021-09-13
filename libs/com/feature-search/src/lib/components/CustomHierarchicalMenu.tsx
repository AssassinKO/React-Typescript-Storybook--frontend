import { Checkbox } from '@homeproved/shared/feature-forms';
import React, { useEffect, useState } from 'react';
import { connectHierarchicalMenu } from 'react-instantsearch-dom';
import { FilteredList, FilteredListItem } from './Atoms';

const HierarchicalMenu = ({ items, mobile, refine, currentRefinement }) => {
  const [refinedItem, setRefinedItem] = useState(null);
  const [removedRefinedItem, setRemovedRefinedItem] = useState(null);

  useEffect(() => {
    if (refinedItem && !items.find((item) => item.label === refinedItem.label)) {
      setRemovedRefinedItem(refinedItem);
    } else {
      setRefinedItem(items.find(({ isRefined }) => isRefined));
      setRemovedRefinedItem(null);
    }
  }, [items, refinedItem]);

  const refineItem = (item, removeRemovedRefinedItem?) => {
    refine(item.value);
    if (removeRemovedRefinedItem) {
      setRefinedItem(null);
      setRemovedRefinedItem(null);
    }
  };

  return (
    <FilteredList>
      {removedRefinedItem && (
        <FilteredListItem key={removedRefinedItem.label}>
          <Checkbox
            label={removedRefinedItem.label}
            labelSize={1.5}
            value={removedRefinedItem.isRefined}
            onChange={() => refineItem(removedRefinedItem, true)}
            height={mobile ? 3.5 : 3}
            labelWeight={removedRefinedItem.isRefined && 700}
          />
          {removedRefinedItem.items && (
            <HierarchicalMenu
              items={removedRefinedItem.items}
              mobile={mobile}
              refine={refine}
              currentRefinement={currentRefinement}
            />
          )}
        </FilteredListItem>
      )}
      {items.map((item) => (
        <FilteredListItem key={item.label}>
          <Checkbox
            label={item.label}
            labelSize={1.5}
            value={item.isRefined}
            onChange={() => refineItem(item)}
            height={mobile ? 3.5 : 3}
            labelWeight={item.isRefined && 700}
          />
          {item.items && (
            <HierarchicalMenu
              items={item.items}
              mobile={mobile}
              refine={refine}
              currentRefinement={currentRefinement}
            />
          )}
        </FilteredListItem>
      ))}
    </FilteredList>
  );
};

export const CustomHierarchicalMenu = connectHierarchicalMenu(HierarchicalMenu);
