import { FC } from 'react';
import { Configure, Index, InstantSearch } from 'react-instantsearch-dom';
import { CustomAutocomplete } from './SearchAutocomplete';
import { ALGOLIA_INDEX, searchableAttributes, searchClient } from '../algolia';
import { SearchProps } from '@homeproved/shared/ui';
import { useCurrentLanguage } from '@homeproved/shared/feature-i18n';
import { useCoordinates } from '@homeproved/shared/feature-company-search';
import { Sector } from '@homeproved/shared/data-access';

type Props = {
  searchMode: SearchProps['mode'];
  placeholder?: string;
  sectors: Sector[] | null;
  onToggleOffCanvas?: () => void;
};
export const SearchSuggestions: FC<Props> = ({
  searchMode,
  placeholder,
  sectors,
  onToggleOffCanvas,
}) => {
  const current = useCurrentLanguage();

  const { geoProps } = useCoordinates();

  return (
    <InstantSearch
      searchClient={{
        search(requests) {
          // Don't trigger search without user input
          if (!requests.some((request) => Boolean(request.params.query))) {
            return;
          }
          return searchClient.search(requests);
        },
      }}
      indexName={ALGOLIA_INDEX.COMPANIES}
    >
      <CustomAutocomplete
        searchMode={searchMode}
        placeholder={placeholder}
        sectors={sectors}
        onToggleOffCanvas={onToggleOffCanvas}
      />

      <Index indexName={ALGOLIA_INDEX.COMPANIES} key={ALGOLIA_INDEX.COMPANIES}>
        <Configure
          hitsPerPage={3}
          restrictSearchableAttributes={searchableAttributes[ALGOLIA_INDEX.COMPANIES](current)}
          {...geoProps}
        />
      </Index>

      <Index indexName={ALGOLIA_INDEX.SECTORS} key={ALGOLIA_INDEX.SECTORS}>
        <Configure
          hitsPerPage={3}
          restrictSearchableAttributes={searchableAttributes[ALGOLIA_INDEX.SECTORS](current)}
        />
      </Index>
      <Index indexName={ALGOLIA_INDEX.ARTICLES} key={ALGOLIA_INDEX.ARTICLES}>
        <Configure
          hitsPerPage={3}
          restrictSearchableAttributes={searchableAttributes[ALGOLIA_INDEX.ARTICLES](current)}
        />
      </Index>
    </InstantSearch>
  );
};
