import React, { FC } from 'react';
import { connectAutoComplete } from 'react-instantsearch-dom';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import snakeCase from 'lodash/snakeCase';
import { AutocompleteExposed, AutocompleteProvided, BasicDoc } from 'react-instantsearch-core';
import { FlyoutMenu, Search, SearchProps } from '@homeproved/shared/ui';
import { Box } from '@material-ui/core';
import { useCurrentLanguage } from '@homeproved/shared/feature-i18n';
import { useLocalizedRoutes } from '@homeproved/com/feature-localized-routes';
import { ALGOLIA_INDEX, keyByIndex, CompanyHit } from '../algolia';
import { SuggestionTitle, SuggestionItem, Wrapper, SuggestionItems } from './Atoms';
import { Sector, usePersistentData } from '@homeproved/shared/data-access';
import { useRouter } from 'next/router';

type OwnProps = {
  searchMode: SearchProps['mode'];
  placeholder: SearchProps['placeholder'];
  sectors: Sector[] | null;
  onToggleOffCanvas?: () => void;
};
type Props = AutocompleteProvided<BasicDoc> & OwnProps;

const Autocomplete: FC<Props> = ({
  hits,
  currentRefinement,
  refine,
  searchMode,
  placeholder,
  sectors,
  onToggleOffCanvas,
}) => {
  const { t } = useTranslation();
  const hitsByIndex = keyByIndex(hits);
  const language = useCurrentLanguage();
  const { getPath } = useLocalizedRoutes();
  const { setSearchTerm } = usePersistentData();
  const router = useRouter();

  const submitSearch = () => {
    router.push(getPath('/company-search'), undefined, { shallow: true }).then();
  };

  const getParentSectorSlug = (slug) => {
    return sectors?.find((sector) =>
      sector.data?.descendants?.some((descendant) => descendant?.['data']?.slug === slug)
    )?.data?.slug;
  };
  const checkIfParentSector = (slug) => {
    return sectors?.some((sector) => sector.data?.slug === slug);
  };

  const results = (
    <Wrapper>
      <SuggestionTitle>
        {t('search.suggestions.title_local_companies', {
          context: snakeCase(ALGOLIA_INDEX.COMPANIES),
        })}
      </SuggestionTitle>
      <SuggestionItems>
        {hitsByIndex[ALGOLIA_INDEX.COMPANIES]?.hits.map((hit: CompanyHit) => (
          <Link href={getPath('/company/:slug/reviews', { slug: hit.slug })} key={hit.objectID}>
            <SuggestionItem button onClick={onToggleOffCanvas}>
              {hit.name}
            </SuggestionItem>
          </Link>
        ))}
      </SuggestionItems>

      <SuggestionTitle>
        {t('search.suggestions.title_local_sectors', { context: snakeCase(ALGOLIA_INDEX.SECTORS) })}
      </SuggestionTitle>
      <SuggestionItems>
        {hitsByIndex[ALGOLIA_INDEX.SECTORS]?.hits.map((hit) => (
          <Link
            href={
              checkIfParentSector(hit[language].slug)
                ? getPath('/sectors')
                : getPath('/sectors/:sector/:subsector', {
                    sector: getParentSectorSlug(hit[language].slug),
                    subsector: hit[language].slug,
                  })
            }
            key={hit.objectID}
          >
            <SuggestionItem button onClick={onToggleOffCanvas}>
              {hit[language].name}
            </SuggestionItem>
          </Link>
        ))}
      </SuggestionItems>

      <SuggestionTitle>
        {t('search.suggestions.title_local_articles', {
          context: snakeCase(ALGOLIA_INDEX.ARTICLES),
        })}
      </SuggestionTitle>
      <SuggestionItems>
        {hitsByIndex[ALGOLIA_INDEX.ARTICLES]?.hits.map((hit) => (
          <Link
            href={getPath('/housing-advice/articles/:article', {
              article: hit.slug,
            })}
            key={hit.objectID}
          >
            <SuggestionItem button onClick={onToggleOffCanvas}>
              {hit.title}
            </SuggestionItem>
          </Link>
        ))}
      </SuggestionItems>
    </Wrapper>
  );

  return (
    <Box position="relative">
      <Search
        mode={searchMode}
        onChange={(data) => {
          setSearchTerm(data.searchTerm);
          refine(data.searchTerm);
        }}
        placeholder={placeholder}
        onSubmit={submitSearch}
      />
      {searchMode !== 'flyoutMenu' ? (
        <FlyoutMenu open={Boolean(currentRefinement)} fullWidth>
          {results}
        </FlyoutMenu>
      ) : currentRefinement ? (
        <div>{results}</div>
      ) : null}
    </Box>
  );
};

export const CustomAutocomplete = connectAutoComplete(Autocomplete) as React.ComponentClass<
  AutocompleteExposed & OwnProps
>;
