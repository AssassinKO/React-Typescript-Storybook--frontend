import React, { FC, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { toPng } from 'html-to-image';
import { useTranslation } from 'react-i18next';
import { LogoCom } from '../logos';
import { Box, Typography, useTheme } from '@material-ui/core';
import { ReviewData } from '@homeproved/shared/data-access';
import { Icons, SvgIcon } from '../svg-icon';
import Stars from '../stars/Stars';
import { useSnackbar } from 'notistack';

export type ReviewImageToShareProps = {
  companyName: string;
  companySlug: string;
  template: 'plain' | 'gradient';
  max?: number;
  onImageGenerated: (base64: string) => void;
  isMobile: boolean;
} & ReviewData;

const ShareableImage = styled(({ template, innerRef, mobile, ...restProps }) => (
  <div ref={innerRef} {...restProps} />
))`
  width: ${({ mobile }) => (mobile ? '100%' : '50rem')};
  height: 50rem;
  padding: ${({ mobile }) => (mobile ? '3rem 2rem 2.5rem' : '3.5rem 7rem 3.5rem')};
  background: ${({ theme, template }) =>
    template === 'gradient' ? theme.config.gradients.rotated : '#fff'};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-shadow: ${({ template }) =>
    template === 'gradient' ? '0 3px 6px rgba(0, 0, 0, 0.29)' : '0 3px 6px rgba(0, 0, 0, 0.16)'};
`;
const ReviewContainer = styled(({ template, ...restProps }) => <div {...restProps} />)`
  background-color: #fff;
  padding: 4rem 2rem;
  border-radius: 1rem;
  position: relative;
  width: 100%;
  box-shadow: ${({ template }) =>
    template === 'gradient' ? '0 3px 6px rgba(0, 0, 0, 0.16)' : 'none'};
  display: flex;
  flex-direction: column;
  align-items: center;
  &:after {
    display: block;
    content: '';
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 22px 22px 0 22px;
    border-color: #fff transparent transparent transparent;
    position: absolute;
    bottom: 0;
    transform: translate(-50%, 100%);
    left: 50%;
  }
`;
const PoweredBy = styled.div`
  display: flex;
  align-items: center; ;
`;
const PoweredByText = styled(Typography)`
  font-size: 2rem;
  color: #fff;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  white-space: nowrap;
  padding-right: 1rem;
`;
const ReadAllReviewsText = styled(Typography)`
  font-size: 1.6rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  white-space: nowrap;
  padding-right: 1rem;
`;
const Rating = styled.div`
  display: flex;
  white-space: nowrap;
  align-items: baseline;
`;
const Score = styled(Typography)`
  font-size: 4.4rem;
  font-weight: 700;
`;

const Max = styled(Typography)`
  font-size: 1.6rem;
  font-weight: 700;
`;
const Description = styled(Typography)`
  font-weight: bold;
  font-size: 1.8rem;
  text-align: center;
  line-height: 2.9rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  margin-bottom: 2rem;
`;
const CompanyText = styled.div`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-style: italic;
`;
const WrittenByText = styled.div`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.8rem;
  display: flex;
  justify-content: center;
  align-items: baseline;
  font-style: italic;
`;

export const ReviewImageToShare: FC<ReviewImageToShareProps> = ({
  companyName,
  companySlug,
  template,
  screenName,
  rating,
  description,
  max = 10,
  isMobile,
  onImageGenerated,
}) => {
  const { t } = useTranslation();
  const ref = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const [, setGeneratedImage] = useState(null);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (
      ref.current == null ||
      rating == null ||
      description == null ||
      companyName == null ||
      screenName == null
    ) {
      return;
    }
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
  }, [ref, rating, description, companyName, screenName, template]);

  return (
    <ShareableImage innerRef={ref} template={template} mobile={isMobile}>
      <ReviewContainer template={template}>
        <Rating>
          <Score variant="body1">{rating?.toString().replace('.', ',')}</Score>
          <Max variant="body1">/ {max}</Max>
        </Rating>
        <Box mb={2}>
          <Stars count={(rating / 10) * 5} size={2.5} />
        </Box>
        <Description variant="body1">"{description}"</Description>
        {template === 'gradient' && (
          <CompanyText>
            <Box mr={1}>
              <SvgIcon icon={Icons.HELMET_SOLID} size={3} color={theme.palette.primary.main} />
            </Box>
            {`${t('shared.social.shareableImages.about')} ${companyName}`}
          </CompanyText>
        )}
        {template === 'plain' && (
          <WrittenByText>
            <Box mr={1}>
              <SvgIcon
                icon={Icons.PENCIL_SOLID}
                size={2.5}
                color={theme.palette.primary.main}
                mirrored
              />
            </Box>
            {`${t('shared.social.shareableImages.writtenBy')} ${screenName}`}
          </WrittenByText>
        )}
      </ReviewContainer>
      <PoweredBy>
        {template === 'gradient' && (
          <>
            <PoweredByText variant="body1">
              {t('shared.social.shareableImages.readAllReviews')}
            </PoweredByText>
            <LogoCom />
          </>
        )}
        {template === 'plain' && (
          <>
            <ReadAllReviewsText variant="body1">
              {t('shared.social.shareableImages.poweredBy')}
            </ReadAllReviewsText>
            <LogoCom fullColor />
          </>
        )}
      </PoweredBy>
    </ShareableImage>
  );
};
