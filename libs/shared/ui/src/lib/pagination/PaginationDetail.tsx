import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { IconButton } from '../buttons';
import { Icons } from '../svg-icon';

export type PaginationDetailProps = {
  goToPage: (page: number) => void;
  defaultPagesToShow?: number;
  currentPage: number;
  pages: number[];
  isMobile: boolean;
  noNegativeMargin?: boolean;
};

const Wrapper = styled(({ mobile, noNegativeMargin, ...restProps }) => <li {...restProps} />)`
  display: flex;
  justify-content: center;
  margin-top: ${({ mobile }) => (mobile ? 0 : '4rem')};
  margin-left: ${({ noNegativeMargin }) => (noNegativeMargin ? 0 : '-3rem')};
  margin-right: ${({ noNegativeMargin }) => (noNegativeMargin ? 0 : '-3rem')};
  ${({ mobile }) =>
    mobile &&
    `
      background-color: #fff;
      padding: 2rem 0;
  `}
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

const Separator = styled.div`
  width: 0.1rem;
  height: 3.4rem;
  background-color: ${({ theme }) => theme.palette.grey[500]};
`;

export const PaginationDetail: FC<PaginationDetailProps> = ({
  pages,
  goToPage,
  currentPage,
  defaultPagesToShow = 5,
  isMobile,
  noNegativeMargin,
}) => {
  const { t } = useTranslation();
  const calculatePagesToShow = () => {
    return Math.ceil(pages.length / defaultPagesToShow) -
      Math.ceil((pages.indexOf(currentPage) + 1) / defaultPagesToShow) ===
      0 && pages.length % defaultPagesToShow !== 0
      ? pages.length % defaultPagesToShow
      : defaultPagesToShow;
  };
  return (
    <Wrapper mobile={isMobile} noNegativeMargin={noNegativeMargin}>
      {pages.indexOf(currentPage) > 0 && (
        <ButtonLeft onClick={() => goToPage(pages[pages.indexOf(currentPage) - 1])}>
          <IconButton
            icon={Icons.DOUBLE_ANGLE_LEFT}
            iconColor="gradient"
            size={2}
            variant="transparent"
          />
          <span>{t('app.com.pages.companySearch.mainSection.pagination.previous')}</span>
        </ButtonLeft>
      )}
      {isMobile ? (
        <>
          {pages.indexOf(currentPage) > 0 && pages.indexOf(currentPage) + 1 < pages.length && (
            <Separator />
          )}
        </>
      ) : (
        <Pager>
          <PagerList>
            {pages.slice(0, calculatePagesToShow()).map((_, count) => {
              const pageNumber =
                1 +
                count +
                defaultPagesToShow * Math.floor(pages.indexOf(currentPage) / defaultPagesToShow);
              return (
                <PagerListItem
                  active={pageNumber === pages.indexOf(currentPage) + 1}
                  onClick={() =>
                    pageNumber === pages.indexOf(currentPage) + 1
                      ? null
                      : goToPage(pages[pageNumber - 1])
                  }
                  key={count}
                >
                  {pageNumber}
                </PagerListItem>
              );
            })}
          </PagerList>
        </Pager>
      )}
      {pages.indexOf(currentPage) + 1 < pages.length && (
        <ButtonRight onClick={() => goToPage(pages[pages.indexOf(currentPage) + 1])}>
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
