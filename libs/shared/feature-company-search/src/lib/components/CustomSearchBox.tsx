import { connectSearchBox } from 'react-instantsearch-dom';
import { Search } from '@homeproved/shared/ui';
import { FC } from 'react';
import { SearchBoxExposed, SearchBoxProvided } from 'react-instantsearch-core';
import { usePersistentData } from '@homeproved/shared/data-access';

type OwnProps = {
  placeholder: string;
};

type CustomSearchBoxProps = SearchBoxProvided & OwnProps;

const SearchBox: FC<CustomSearchBoxProps> = ({ currentRefinement, refine, placeholder }) => {
  const { setSearchTerm } = usePersistentData();
  return (
    <Search
      mode="compact"
      onChange={(data) => {
        setSearchTerm(data.searchTerm);
        refine(data.searchTerm);
      }}
      value={currentRefinement}
      placeholder={placeholder}
      onSubmit={(data) => refine(data.searchTerm)}
    />
  );
};

export const CustomSearchBox = connectSearchBox(SearchBox) as React.ComponentClass<
  SearchBoxExposed & OwnProps
>;
