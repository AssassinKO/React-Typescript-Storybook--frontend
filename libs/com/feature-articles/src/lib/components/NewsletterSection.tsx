import { MediaResponseDataConversions } from '@homeproved/shared/data-access';
import Link from 'next/link';
import React, { FC } from 'react';
import styled from 'styled-components';
import { Cover } from './Cover';
import { NewsletterSubscriptionTile } from '@homeproved/shared/feature-newsletter';

type ArticleData = {
  image: MediaResponseDataConversions[];
  name: string;
  title: string;
  description?: string;
  isFavorite?: boolean;
  url: string;
};

type NewsletterSectionProps = {
  article: ArticleData;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isVisible: boolean;
};

const Wrapper = styled(({ isDesktop, isTablet, ...restProps }) => <div {...restProps} />)`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -1rem;
`;
const NewsletterSubscribeTileContainer = styled(
  ({ isMobile, isDesktop, isTablet, ...restProps }) => <div {...restProps} />
)`
  max-width: ${({ isMobile }) => (isMobile ? '40rem' : 'none')};
  margin: ${({ isMobile }) => (isMobile ? '0 auto 2rem' : '0 1rem 2rem')};
  flex-basis: ${({ isMobile, isTablet }) =>
    isMobile ? '100%' : isTablet ? 'calc(50% - 2rem)' : 'calc(25% - 2rem)'};
`;

const CoverContainer = styled(({ isDesktop, isTablet, ...restProps }) => <div {...restProps} />)`
  max-width: ${({ isTablet }) => (isTablet ? 'calc(50% - 2rem)' : 'calc(75% - 2rem)')};
  margin: 0 1rem 2rem;
  flex-basis: ${({ isTablet }) => (isTablet ? 'calc(50% - 2rem)' : 'calc(75% - 2rem)')};
`;

export const NewsletterSection: FC<NewsletterSectionProps> = ({
  article,
  isMobile,
  isTablet,
  isDesktop,
  isVisible,
}) => {
  return (
    <Wrapper>
      <NewsletterSubscribeTileContainer
        isMobile={isMobile}
        isTablet={isTablet}
        isDesktop={isDesktop}
      >
        <NewsletterSubscriptionTile />
      </NewsletterSubscribeTileContainer>
      {!isMobile && (
        <CoverContainer isTablet={isTablet} isDesktop={isDesktop}>
          <Link href={article.url} passHref>
            <a href={article.url}>
              <Cover
                article={article}
                isVisible={isVisible}
                isMobile={isMobile}
                isTablet={isTablet}
                height="100%"
                bannerMaxWidth="45rem"
              />
            </a>
          </Link>
        </CoverContainer>
      )}
    </Wrapper>
  );
};
