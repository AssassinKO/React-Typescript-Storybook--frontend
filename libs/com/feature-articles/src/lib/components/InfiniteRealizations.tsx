import { Realisation } from '@homeproved/shared/data-access';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';
import { Button, LargeTile } from '@homeproved/shared/ui';
import { Box } from '@material-ui/core';
import Link from 'next/link';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { StyledA } from './Atoms';

type InfiniteRealizationsProps = {
  isMobile: boolean;
  isTablet: boolean;
  realizations: Realisation[];
  getPath: GetPathFunction;
  loadMore: () => void;
  isLoading: boolean;
  noMoreRealizations: boolean;
};

const Wrapper = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  padding: ${({ mobile }) => (mobile ? '2rem 2rem' : '2rem 0rem')};
`;
const ArticleWrapper = styled.div`
  margin-left: -0.6rem;
  margin-right: -0.6rem;
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 1rem;
`;

export const InfiniteRealizations: FC<InfiniteRealizationsProps> = ({
  isMobile,
  isTablet,
  realizations,
  getPath,
  loadMore,
  isLoading,
  noMoreRealizations,
}) => {
  const { t } = useTranslation();

  return (
    <Wrapper mobile={isMobile}>
      <Box maxWidth="115.6rem" margin="auto">
        <ArticleWrapper>
          {realizations.length > 0 &&
            realizations.map((realization) => (
              <Box
                paddingLeft="0.6rem"
                paddingRight="0.6rem"
                mb={2}
                key={realization.data?.id}
                maxWidth={isMobile ? '100%' : '33.3333333333%'}
                flexBasis={isMobile ? '100%' : '33.3333333333%'}
              >
                <Link
                  href={getPath('/company/:slug/realization/:rslug', {
                    slug: realization?.data.relations?.['company']?.data?.slug,
                    rslug: realization?.data?.slug,
                  })}
                >
                  <StyledA
                    href={getPath('/company/:slug/realization/:rslug', {
                      slug: realization?.data.relations?.['company']?.data?.slug,
                      rslug: realization?.data?.slug,
                    })}
                  >
                    <LargeTile
                      title={realization?.data?.relations?.['company']?.data.name}
                      description={realization.data?.title}
                      image={
                        realization.data?.cover?.data?.conversions?.[
                          isMobile ? 'square-s' : isTablet ? 'square-m' : 'square-l'
                        ]
                      }
                      clickable
                    />
                  </StyledA>
                </Link>
              </Box>
            ))}
        </ArticleWrapper>
        {!noMoreRealizations && (
          <Box display="flex" justifyContent="center">
            <Button variant="light" onClick={loadMore} disabled={isLoading}>
              {t('app.com.pages.realizations.loadMore')}
            </Button>
          </Box>
        )}
      </Box>
    </Wrapper>
  );
};
