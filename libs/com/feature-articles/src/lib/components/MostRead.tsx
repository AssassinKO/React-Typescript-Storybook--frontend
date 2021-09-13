import { LargeTile, SectionTitle } from '@homeproved/shared/ui';
import { Box } from '@material-ui/core';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Slider from 'react-slick';
import { LoadingMessage, StyledA } from './Atoms';
import { Article, Realisation } from '@homeproved/shared/data-access';
import { MostReadArticlesHandler } from './MostReadArticlesHandler';
import { MostReadRealisationsHandler } from './MostReadRealisationsHandler';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';
import { useRouter } from 'next/router';

type MostReadProps = {
  isMobile: boolean;
  isTablet: boolean;
  type: 'realizations' | 'articles';
  getPath: GetPathFunction;
};

const Wrapper = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  padding: ${({ mobile }) => (mobile ? '3rem 2rem 5rem' : '5rem 2rem 7rem')};
  background-color: ${({ theme }) => theme.palette.grey['A200']};
  margin-top: 1rem;
  margin-left: -2rem;
  margin-right: -2rem;
  .slick-slider {
    padding-bottom: 3rem;
  }
  .slick-dots li {
    button:before {
      content: '';
      border-radius: 50%;
      background-color: #fff;
      opacity: 1;
      width: 1.3rem;
      height: 1.3rem;
    }
    &.slick-active button:before {
      background: ${({ theme }) => theme.palette.primary.main};
    }
  }
`;
const StyledSlider = styled(Slider)`
  margin-left: -1rem;
  margin-right: -1rem;

  .slick-track {
    display: flex !important;
  }
  .slick-slide {
    height: inherit !important;

    > div {
      height: 100%;
    }
  }
`;

const settings = {
  slidesToShow: 4,
  slidesToScroll: 4,
  arrows: false,
  dots: true,
  autoplay: true,
  autoplaySpeed: 5000,
  focusOnSelect: true,
  infinite: false,
  responsive: [
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

export const MostRead: FC<MostReadProps> = ({ isMobile, isTablet, type, getPath }) => {
  const { t } = useTranslation();
  const [data, setData] = useState<Article[] | Realisation[]>();
  const router = useRouter();
  const parsedData = useMemo(() => {
    if (type === 'articles') {
      return (data as Article[])?.['data']?.map((article) => ({
        id: article.data?.id,
        title: article.data?.relations?.['primarySector']?.data?.name,
        description: article.data?.title,
        image:
          article.data?.cover?.data?.conversions?.[
            isMobile ? 'square-s' : isTablet ? 'square-m' : 'square-l'
          ],
        url: getPath('/housing-advice/articles/:article', {
          article: article?.data?.slug,
        }),
        isFavorite: article?.data?.isFavorite,
      }));
    } else {
      return (data as Realisation[])?.['data'].map((realization) => ({
        id: realization?.data?.id,
        title: realization?.data?.relations?.['company']?.data.name,
        description: realization?.data?.title,
        image:
          realization.data?.cover?.data?.conversions?.[
            isMobile ? 'square-s' : isTablet ? 'square-m' : 'square-l'
          ],
        url: getPath('/company/:slug/realization/:rslug', {
          slug: realization?.data?.relations?.['company']?.data.slug,
          rslug: realization?.data?.slug,
        }),
        isFavorite: null,
      }));
    }
  }, [data, isMobile, isTablet, type, getPath]);

  const [dragging, setDragging] = useState(false);
  const handleBeforeChange = useCallback(() => {
    setDragging(true);
  }, [setDragging]);

  const handleAfterChange = useCallback(() => {
    setDragging(false);
  }, [setDragging]);

  const navigateToItem = (e, url: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (url && !dragging) {
      router.push(url).then();
    }
  };

  return (
    <>
      {type === 'articles' && data == null && <MostReadArticlesHandler onSuccess={setData} />}
      {type === 'realizations' && data == null && (
        <MostReadRealisationsHandler onSuccess={setData} />
      )}
      <Wrapper mobile={isMobile}>
        <Box maxWidth="115.6rem" margin="auto">
          <Box mb={3}>
            <SectionTitle
              label={t('app.com.pages.housingAdvice.mostRead.title')}
              textAlign={isMobile ? 'center' : 'left'}
            />
          </Box>
          {parsedData == null && (
            <LoadingMessage>{t('app.com.pages.housingAdvice.loading')}</LoadingMessage>
          )}
          {parsedData != null && (
            <StyledSlider
              {...settings}
              beforeChange={handleBeforeChange}
              afterChange={handleAfterChange}
            >
              {parsedData.slice(0, isMobile ? 5 : parsedData.length).map((item) => (
                <Box
                  pl={1}
                  pr={1}
                  key={item.id}
                  maxWidth={isMobile ? '41.6rem' : 'none'}
                  margin="auto"
                  display="block !important"
                  height="100%"
                >
                  <StyledA onClick={(e) => navigateToItem(e, item.url)}>
                    <LargeTile
                      title={item.title}
                      description={item.description}
                      image={item.image}
                      smallDarkBorder
                      clickable
                      isFavorite={item.isFavorite}
                    />
                  </StyledA>
                </Box>
              ))}
            </StyledSlider>
          )}
        </Box>
      </Wrapper>
    </>
  );
};
