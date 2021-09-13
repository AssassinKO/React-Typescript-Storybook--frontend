import React, { FC } from 'react';
import styled from 'styled-components';
import {
  BackgroundGraphics,
  Button,
  CloudWithBrush,
  CloudWithSaw,
  HouseWithContent,
  Icons,
  Ladder,
  Level,
  SingleCloud,
  StyledPaintBucket,
  SvgIcon,
} from '@homeproved/shared/ui';
import { useTranslation } from 'react-i18next';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';

type ClaimCTAProps = {
  isMobile?: boolean;
  companyName: string;
  companyId: number;
  getPath: GetPathFunction;
};

const Wrapper = styled.div`
  position: relative;
  padding: 5rem 0 0 0;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100vw;
    height: 100%;
    background: ${({ theme }) => theme.palette.grey['A200']};
    z-index: 0;
  }
`;

const HouseContentText = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.4rem;
  font-weight: 300;
  margin-bottom: ${({ mobile }) => (mobile ? 0 : '3rem')};
  text-align: center;
`;

const StyledButton = styled(({ mobile, ...restProps }) => <Button {...restProps} />)`
  display: block;
  margin: ${({ mobile }) => (mobile ? '3rem auto 4rem' : '0 auto 3rem')};
`;

const StyledLadder = styled(Ladder)`
  position: absolute;
  left: -4rem;
  bottom: 0;
  width: 12rem;
`;

const StyledLevel = styled(Level)`
  position: absolute;
  top: 18rem;
  right: 0;
  width: 11rem;
`;

export const ClaimCTA: FC<ClaimCTAProps> = ({
  isMobile = false,
  companyName,
  companyId,
  getPath,
}) => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      {!isMobile && (
        <BackgroundGraphics>
          <StyledPaintBucket />
          <CloudWithSaw src="/cloud_with_saw.png" alt="" loading="lazy" />
          <SingleCloud src="/single_cloud.png" alt="" loading="lazy" />
          <CloudWithBrush src="/cloud_with_brush.png" alt="" loading="lazy" />
        </BackgroundGraphics>
      )}
      <HouseWithContent
        roofTopIcon={<SvgIcon icon={Icons.HELMET_SOLID} color="gradient" />}
        roofTopTitle={t('app.com.pages.addCompanyConfirmation.claim.title').replace(
          '%COMPANY_NAME%',
          companyName
        )}
        width={50}
        isMobile={isMobile}
      >
        <HouseContentText mobile={isMobile}>
          {t('app.com.pages.addCompanyConfirmation.claim.description')}
        </HouseContentText>
        {!isMobile && (
          <StyledButton
            variant="dark"
            size="large"
            href={`${process.env.NEXT_PUBLIC_PRO_URL}${getPath(
              '/registration/step1'
            )}?id=${companyId}`}
          >
            {t('app.com.pages.addCompanyConfirmation.claim.button')}
          </StyledButton>
        )}
      </HouseWithContent>
      {isMobile && (
        <StyledButton variant="dark" size="large" mobile={isMobile}>
          {t('app.com.pages.addCompanyConfirmation.claim.button')}
        </StyledButton>
      )}
      {!isMobile && (
        <>
          <StyledLadder />
          <StyledLevel angle={37} />
        </>
      )}
    </Wrapper>
  );
};
