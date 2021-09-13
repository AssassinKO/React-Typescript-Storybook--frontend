import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  CompactSearchField,
  ExpandedButton,
  ExpandedSearchField,
  FlyoutSearchField,
  FlyoutSearchFieldInput,
  FlyoutSearchIconWrapper,
  StyledIconButton,
  StyledInput,
  Wrapper,
} from './SearchStyling';
import { useTheme } from '@material-ui/core';
import { Icons } from '../svg-icon';
import { IconButton } from '../buttons';

export type SearchProps = {
  mode?: 'compact' | 'expanded' | 'flyoutMenu';
  placeholder?: string;
  onSubmit?: (data: SearchFormData) => void;
  onChange?: (data: SearchFormData) => void;
  className?: string;
  value?: string;
};

export type SearchFormData = {
  searchTerm: string;
};

export const Search: FC<SearchProps> = ({
  mode = 'expanded',
  onChange,
  onSubmit,
  placeholder,
  className,
  value,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onChange && onChange({ searchTerm: e.target.value });
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (onSubmit) onSubmit({ searchTerm });
    }
  };

  return (
    <Wrapper className={className}>
      {
        {
          compact: (
            <CompactSearchField>
              <StyledInput
                autoComplete="off"
                name="searchTerm"
                placeholder={placeholder || t('app.com.pages.landing.primary.searchPlaceholder')}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                value={searchTerm}
              />
              <StyledIconButton
                icon={Icons.SEARCH}
                onClick={() => onSubmit && onSubmit({ searchTerm })}
              />
            </CompactSearchField>
          ),
          expanded: (
            <>
              <ExpandedSearchField
                autoComplete="off"
                name="searchTerm"
                placeholder={placeholder || t('app.com.pages.landing.primary.searchPlaceholder')}
                onChange={handleChange}
              />
              <ExpandedButton
                variant="dark"
                size="large"
                arrow="none"
                onClick={() => onSubmit && onSubmit({ searchTerm })}
              >
                {t('app.com.pages.landing.primary.button')}
              </ExpandedButton>
            </>
          ),
          flyoutMenu: (
            <FlyoutSearchField>
              <FlyoutSearchFieldInput
                autoComplete="off"
                name="searchTerm"
                placeholder={placeholder || t('app.com.pages.landing.primary.searchPlaceholder')}
                onChange={handleChange}
              />
              <FlyoutSearchIconWrapper>
                <IconButton
                  icon={Icons.SEARCH}
                  variant="transparent"
                  iconColor={theme.palette.primary.main}
                  size={2}
                  onClick={() => onSubmit && onSubmit({ searchTerm })}
                />
              </FlyoutSearchIconWrapper>
            </FlyoutSearchField>
          ),
        }[mode]
      }
    </Wrapper>
  );
};
