import React, { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { toPng } from 'html-to-image';
import { Stars } from '../stars/Stars';
import { ShareableHomeShapeScore } from '../homeproved-score/ShareableHomeShapeScore';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { LogoCom } from '../logos';
import { Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';

export type RatingImageToShareProps = {
  score: number;
  totalReviews: number;
  isMobile: boolean;
  companySlug: string;
  onImageGenerated: (base64: string) => void;
};

const ShareableImage = styled(({ innerRef, mobile, ...restProps }) => (
  <div ref={innerRef} {...restProps} />
))`
  width: ${({ mobile }) => (mobile ? '100%' : '50rem')};
  height: 50rem;
  padding: ${({ mobile }) => (mobile ? '3rem 2rem 2.5rem' : '4.5rem 7rem 3.5rem')};
  background: ${({ theme }) => theme.config.gradients.rotated};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.29);
`;

const StarsContainer = styled.div`
  background-color: #fff;
  padding: 1.2rem 1.5rem;
  border-radius: 0.5rem;
  width: 24rem;
  position: relative;
  &:after {
    display: block;
    content: '';
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 18px 18px 0 18px;
    border-color: #fff transparent transparent transparent;
    position: absolute;
    bottom: 0;
    transform: translate(-50%, 100%);
    left: 50%;
  }
`;

const PoweredBy = styled.div`
  display: flex;
  align-items: center;
`;

const PoweredByText = styled(Typography)`
  font-size: 2rem;
  color: #fff;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  white-space: nowrap;
  padding-right: 1rem;
`;

export const RatingImageToShare: FC<RatingImageToShareProps> = ({
  score,
  totalReviews,
  isMobile,
  companySlug,
  onImageGenerated,
}) => {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const [, setGeneratedImage] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (ref.current == null || score == null || totalReviews == null) return;

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        setGeneratedImage(dataUrl);
        onImageGenerated(dataUrl);
      })
      .catch((err) => {
        enqueueSnackbar(t('shared.social.shareableImages.error'), {
          variant: 'error',
        });
      });
  }, [ref, score, totalReviews]);

  return (
    <ShareableImage innerRef={ref} mobile={isMobile}>
      <StarsContainer>
        <Stars count={(score / 10) * 5} size={3} />
      </StarsContainer>
      <ShareableHomeShapeScore
        score={score.toString()}
        totalReviews={totalReviews.toString()}
        year={moment().year()}
      />
      <PoweredBy>
        <PoweredByText variant="body1">
          {t('shared.social.shareableImages.poweredBy')}
        </PoweredByText>
        <LogoCom />
      </PoweredBy>
    </ShareableImage>
  );
};
