import React, { FC, useEffect, useState } from 'react';
import {
  DesignOption,
  ImageWrapper,
  Label,
  ReviewHeader,
  ReviewSelect,
  ReviewWrapper,
  SelectDesign,
  Text,
} from '../Atoms';
import { Modal, ReviewCard, ReviewImageToShare } from '@homeproved/shared/ui';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { CompanyData, Review, ReviewData, useQueryFetch } from '@homeproved/shared/data-access';
import { QueryParams } from '@homeproved/shared/feature-reviews';
import { objectToQueryString } from '@homeproved/shared/util';

export interface ShareReviewProps {
  isMobile: boolean;
  company: CompanyData;
  handleImageGenerated: (url: string) => void;
  hideDownload: () => void;
}

type Reviews = {
  data: Review[];
};

export const ShareReview: FC<ShareReviewProps> = ({
  isMobile,
  company,
  handleImageGenerated,
  hideDownload,
}) => {
  const { t } = useTranslation();
  const [reviewDesign, setReviewDesign] = useState<'plain' | 'gradient'>('plain');
  const [showReviews, setShowReviews] = useState<boolean>(false);
  const [selectedReview, setSelectedReview] = useState<ReviewData>(null);
  const [firstReview, setFirstReview] = useState<ReviewData>(null);
  const [reviewsLoaded, setReviewsLoaded] = useState(false);
  const [apiRouteInit, setApiRouteInit] = useState(false);
  const [apiRoute, setApiRoute] = useState('');
  const [filterQueryParams] = useState<QueryParams>({
    date: 'desc',
    rating: '',
    page: 1,
    perPage: 10,
  });

  const getApiRoute = () => {
    return apiRoute + objectToQueryString(filterQueryParams);
  };

  const { query } = useQueryFetch<Reviews, unknown>('reviews', getApiRoute(), {
    options: {
      enabled: false,
    },
  });

  useEffect(() => {
    if (!apiRouteInit && !!company) {
      setApiRoute(`/api/companies/${company.id}/reviews?`);
      setApiRouteInit(true);
    }
  }, [apiRouteInit, company]);

  useEffect(() => {
    if (apiRouteInit && !reviewsLoaded) {
      query.refetch().then(({ status }) => {
        setReviewsLoaded(status === 'success');
      });
    }
  }, [apiRouteInit, reviewsLoaded, query]);

  useEffect(() => {
    if (!query.isSuccess) return;

    if (query.data.data.length === 0) {
      hideDownload();
    } else {
      setFirstReview(query.data?.data?.[0].data);
    }
  }, [query.isSuccess, query, hideDownload]);

  const handleSelectReview = (review) => {
    setSelectedReview(review.data);
    setShowReviews(false);
  };

  return query.isSuccess && query.data?.data.length > 0 && !!firstReview ? (
    <>
      <ReviewHeader>
        <SelectDesign>
          <Label>{`${t('app.pro.pages.socialShare.design')}:`}</Label>
          <DesignOption
            selected={reviewDesign === 'plain'}
            onClick={() => setReviewDesign('plain')}
          >
            1
          </DesignOption>
          <DesignOption
            selected={reviewDesign === 'gradient'}
            onClick={() => setReviewDesign('gradient')}
          >
            2
          </DesignOption>
        </SelectDesign>
        {!isMobile && (
          <ReviewSelect onClick={() => setShowReviews(true)}>
            {t('app.pro.pages.socialShare.otherReview')}
          </ReviewSelect>
        )}
      </ReviewHeader>
      <ImageWrapper>
        <ReviewImageToShare
          description={selectedReview?.description ?? firstReview.description}
          rating={selectedReview?.rating ?? firstReview.rating}
          screenName={selectedReview?.screenName ?? firstReview.screenName}
          companyName={company.name}
          companySlug={company.slug}
          template={reviewDesign}
          onImageGenerated={handleImageGenerated}
          isMobile={isMobile}
        />
      </ImageWrapper>
      {isMobile && (
        <ReviewSelect isMobile={isMobile} onClick={() => setShowReviews(true)}>
          {t('app.pro.pages.socialShare.otherReview')}
        </ReviewSelect>
      )}
      <Modal open={showReviews} onClose={() => setShowReviews(false)} maxWidth={80}>
        <ReviewWrapper>
          {query.data?.data.length > 0 &&
            query.data?.data.map((review) => (
              <ReviewCard
                selectable
                onClick={() => handleSelectReview(review)}
                review={{
                  id: review.data.id,
                  picture: null,
                  name: review.data.screenName,
                  date: moment(review.data.createdAt).format('l'),
                  rating: review.data.rating,
                  text: review.data.description,
                  title: review.data.title,
                  companyId: company.id,
                  companySlug: company.slug,
                  screenName: review.data.screenName,
                }}
                isMobile={isMobile}
              />
            ))}
        </ReviewWrapper>
      </Modal>
    </>
  ) : (
    <Text>{t('app.pro.pages.socialShare.noReviews')}</Text>
  );
};
