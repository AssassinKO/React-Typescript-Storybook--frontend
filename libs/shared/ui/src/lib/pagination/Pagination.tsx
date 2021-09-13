import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { IconButton } from '../buttons';
import { Icons } from '../svg-icon';
import { PaginationMeta } from '@homeproved/shared/data-access';

export type PaginationProps = {
  goToPage: (page: number) => void;
  defaultPagesToShow?: number;
} & PaginationMeta;

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 4rem;
`;

const ButtonLeft = styled.div`
  display: flex;
  align-items: center;
  margin-right: 2rem;
  cursor: pointer;
  span {
    font-family: ${({ theme }) => theme.config.fonts.PTSans};
    text-transform: uppercase;
    font-weight: 700;
  }
`;
const ButtonRight = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2rem;
  cursor: pointer;
  span {
    font-family: ${({ theme }) => theme.config.fonts.PTSans};
    text-transform: uppercase;
    font-weight: 700;
  }
`;

const Pager = styled.div``;

const PagerList = styled.ul`
  padding: 0;
  list-style-type: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PagerListItem = styled(({ active, ...restProps }) => <li {...restProps} />)`
  padding: 0 1rem;
  color: ${({ theme, active }) => (active ? theme.palette.primary.main : theme.palette.grey[800])};
  font-weight: 700;
  font-size: 1.6rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  text-transform: uppercase;
  cursor: ${({ active }) => (active ? 'default' : 'pointer')};
`;

export const Pagination: FC<PaginationProps> = ({
  currentPage,
  perPage,
  total,
  goToPage,
  defaultPagesToShow = 5,
}) => {
  const { t } = useTranslation();

  const calculatePagesToShow = () => {
    return Math.ceil(Math.ceil(total / perPage) / defaultPagesToShow) -
      Math.ceil(currentPage / defaultPagesToShow) ===
      0
      ? Math.ceil(total / perPage) % defaultPagesToShow
      : defaultPagesToShow;
  };
  return (
    <Wrapper>
      {currentPage > 1 && (
        <ButtonLeft onClick={() => goToPage(currentPage - 1)}>
          <IconButton
            icon={Icons.DOUBLE_ANGLE_LEFT}
            iconColor="gradient"
            size={2}
            variant="transparent"
          />
          <span>{t('app.com.pages.companySearch.mainSection.pagination.previous')}</span>
        </ButtonLeft>
      )}
      <Pager>
        <PagerList>
          {new Array(Math.ceil(total / perPage))
            .fill(undefined)
            .slice(0, calculatePagesToShow())
            .map((_, count) => {
              const pageNumber =
                1 + count + defaultPagesToShow * Math.floor((currentPage - 1) / defaultPagesToShow);
              return (
                <PagerListItem
                  key={count}
                  active={pageNumber === currentPage}
                  onClick={() => (pageNumber === currentPage ? null : goToPage(pageNumber))}
                >
                  {pageNumber}
                </PagerListItem>
              );
            })}
        </PagerList>
      </Pager>
      {currentPage < Math.ceil(total / perPage) && (
        <ButtonRight onClick={() => goToPage(currentPage + 1)}>
          <span>{t('app.com.pages.companySearch.mainSection.pagination.next')}</span>
          <IconButton
            icon={Icons.DOUBLE_ANGLE_RIGHT}
            iconColor="gradient"
            size={2}
            variant="transparent"
          />
        </ButtonRight>
      )}
    </Wrapper>
  );
};
