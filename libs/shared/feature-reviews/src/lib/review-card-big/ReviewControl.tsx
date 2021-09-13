import { Icons, theme } from '@homeproved/shared/ui';
import { Box } from '@material-ui/core';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { ReviewControlText, StyledTextButton, ButtonWrapper, StyledIconButton } from './Atoms';

type ReviewControlProps = {
  isShared: boolean;
  isAnswered: boolean;
  isFavorite: boolean;
  isReported: boolean;
  isMobile: boolean;
  showUpgradeText: boolean;
  onClickAnswerPublic: () => void;
  onClickShare: () => void;
  onClickReport: () => void;
  onClickFavorite?: () => void;
};

export const ReviewControl: FC<ReviewControlProps> = ({
  isShared,
  isAnswered,
  isFavorite,
  isReported,
  isMobile,
  showUpgradeText,
  onClickAnswerPublic,
  onClickShare,
  onClickReport,
  onClickFavorite,
}) => {
  const { t } = useTranslation();
  return (
    <Box
      display="flex"
      justifyContent={isMobile ? 'space-between' : 'flex-start'}
      pt={isMobile ? 2 : 1}
      pb={2}
      borderBottom={isMobile ? `1px solid ${theme.palette.grey['A200']}` : 0}
    >
      {isMobile && (
        <>
          <ButtonWrapper>
            <StyledIconButton
              icon={Icons.SHARE}
              variant={isShared ? 'gradient' : 'white'}
              size={2}
              active={isShared}
            />
            <ReviewControlText>
              {isShared
                ? t('app.pro.pages.reviewDetail.buttons.shared')
                : t('app.pro.pages.reviewDetail.buttons.share')}
            </ReviewControlText>
          </ButtonWrapper>
          <ButtonWrapper>
            <StyledIconButton
              icon={Icons.BENT_ARROW}
              variant={isAnswered ? 'gradient' : 'white'}
              size={2}
              active={isAnswered}
              onClick={isAnswered ? null : onClickAnswerPublic}
            />
            <ReviewControlText>
              {isAnswered
                ? t('app.pro.pages.reviewDetail.buttons.answeredPublic')
                : t('app.pro.pages.reviewDetail.buttons.answerPublic')}
            </ReviewControlText>
          </ButtonWrapper>
          <ButtonWrapper>
            <StyledIconButton
              icon={Icons.HEART}
              variant={isFavorite ? 'gradient' : 'white'}
              size={2}
              active={isFavorite}
              onClick={!!onClickFavorite && onClickFavorite}
            />
            <ReviewControlText>
              {t('app.pro.pages.reviewDetail.buttons.favorites')}
            </ReviewControlText>
          </ButtonWrapper>
          <ButtonWrapper>
            <StyledIconButton
              icon={Icons.GEAR}
              variant={isReported ? 'gradient' : 'white'}
              size={2}
              active={isReported}
              onClick={!!onClickReport && onClickReport}
            />
            <ReviewControlText>
              {isReported
                ? t('app.pro.pages.reviewDetail.buttons.reported')
                : t('app.pro.pages.reviewDetail.buttons.report')}
            </ReviewControlText>
          </ButtonWrapper>
        </>
      )}
      {!isMobile && (
        <>
          <Box pr={2}>
            <StyledTextButton
              icon={isAnswered ? Icons.CHECKMARK : Icons.BENT_ARROW}
              variant="text"
              success={isAnswered}
              blocked={showUpgradeText}
              separator
              onClick={!isAnswered ? onClickAnswerPublic : null}
              biggerIcon={!isAnswered}
              framedIcon={isAnswered}
              frameSize={2}
              frameColor={theme.palette.green.light}
            >
              {isAnswered
                ? t('app.pro.pages.reviewDetail.buttons.answeredPublic')
                : t('app.pro.pages.reviewDetail.buttons.answerPublic')}
            </StyledTextButton>
          </Box>
          <Box pl={2} pr={2}>
            <StyledTextButton
              icon={isShared ? Icons.CHECKMARK : Icons.SHARE}
              variant="text"
              success={isShared}
              separator
              onClick={onClickShare}
              framedIcon={isShared}
              frameSize={2}
              frameColor={theme.palette.green.light}
            >
              {isShared
                ? t('app.pro.pages.reviewDetail.buttons.shared')
                : t('app.pro.pages.reviewDetail.buttons.share')}
            </StyledTextButton>
          </Box>
          <Box pl={2}>
            <StyledTextButton
              icon={Icons.FLAG_OUTLINE}
              variant="text"
              success={false}
              onClick={onClickReport}
            >
              {isReported
                ? t('app.pro.pages.reviewDetail.buttons.reported')
                : t('app.pro.pages.reviewDetail.buttons.report')}
            </StyledTextButton>
          </Box>
        </>
      )}
    </Box>
  );
};
