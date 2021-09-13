import React, { FC } from 'react';
import styled from 'styled-components';
import { LargeTile } from '@homeproved/shared/ui';
import { MediaResponseDataConversions } from '@homeproved/shared/data-access';
import { StyledA, Tiles } from './Atoms';
import Link from 'next/link';

type ArticleData = {
  id: number;
  title: string;
  image: MediaResponseDataConversions[];
  name: string;
  url: string;
  isFavorite?: boolean;
};

type FourArticlesProps = {
  articles: ArticleData[];
  isMobile: boolean;
  isTablet: boolean;
};

const Wrapper = styled.div``;

export const FourArticles: FC<FourArticlesProps> = ({ articles, isMobile, isTablet }) => {
  return (
    <Wrapper>
      <Tiles isMobile={isMobile} isTablet={isTablet}>
        {articles.map((article) => (
          <Link key={article.id} href={article.url}>
            <StyledA href={article.url}>
              <LargeTile
                title={article.name}
                description={article.title}
                image={article.image?.['square-s']}
                isFavorite={article?.isFavorite}
                clickable
              />
            </StyledA>
          </Link>
        ))}
      </Tiles>
    </Wrapper>
  );
};
