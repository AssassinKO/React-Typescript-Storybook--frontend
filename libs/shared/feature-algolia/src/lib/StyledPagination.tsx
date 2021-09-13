import styled from 'styled-components';
import { Pagination } from 'react-instantsearch-dom';
import React, { FC } from 'react';
import { Box } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { Icons, IconButton } from '@homeproved/shared/ui';

type StyledPaginationProps = {
  onExecuteScroll?: () => void;
};

const Pager = styled(({ ...restProps }) => <Pagination {...restProps} />)`
  ul {
    padding: 0;
    list-style-type: none;
    display: flex;
    align-items: center;
    justify-content: center;
    li {
      padding: 0 1rem;
      a {
        text-decoration: none;
        color: ${({ theme }) => theme.palette.grey[800]};
        font-weight: 600;
      }
      span {
        font-size: 1.6rem;
        font-weight: 600;
        font-family: ${({ theme }) => theme.config.fonts.PTSans};
        text-transform: uppercase;
      }
      &.ais-Pagination-item--selected {
        a {
          color: ${({ theme }) => theme.palette.primary.main};
        }
      }
      &.ais-Pagination-item--disabled {
        display: none;
      }
    }
  }
`;

export const StyledPagination: FC<StyledPaginationProps> = ({ onExecuteScroll }) => {
  const { t } = useTranslation();

  return (
    <Pager
      showFirst={false}
      showPrevious={true}
      showNext={true}
      showLast={false}
      totalPages={5}
      translations={{
        previous: (
          <Box
            display="flex"
            alignItems="center"
            onClick={() =>
              onExecuteScroll ? onExecuteScroll() : window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          >
            <IconButton
              icon={Icons.DOUBLE_ANGLE_LEFT}
              iconColor="gradient"
              size={2}
              variant="white"
            />
            <span>{t('app.com.pages.companySearch.mainSection.pagination.previous')}</span>
          </Box>
        ),
        next: (
          <Box
            display="flex"
            alignItems="center"
            onClick={() =>
              onExecuteScroll ? onExecuteScroll() : window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          >
            <span>{t('app.com.pages.companySearch.mainSection.pagination.next')}</span>
            <IconButton
              icon={Icons.DOUBLE_ANGLE_RIGHT}
              iconColor="gradient"
              size={2}
              variant="white"
            />
          </Box>
        ),
        page(currentRefinement) {
          return (
            <Box
              onClick={() =>
                onExecuteScroll
                  ? onExecuteScroll()
                  : window.scrollTo({ top: 0, behavior: 'smooth' })
              }
            >
              <span>{currentRefinement}</span>
            </Box>
          );
        },
        ariaPrevious: 'Previous page',
        ariaNext: 'Next page',
        ariaFirst: 'First page',
        ariaLast: 'Last page',
        ariaPage(currentRefinement) {
          return `Page ${currentRefinement}`;
        },
      }}
    />
  );
};
