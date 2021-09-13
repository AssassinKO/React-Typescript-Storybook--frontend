import React, { FC } from 'react';
import { Counter, Icons, SvgIcon } from '@homeproved/shared/ui';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

type RatingPlatformProps = {
  tablet?: boolean;
  mobile?: boolean;
};

const Wrapper = styled(({ tablet, mobile, ...restProps }) => <div {...restProps} />)`
  text-align: center;
  padding-top: ${({ mobile }) => (mobile ? '4rem' : '15rem')};
  padding-bottom: ${({ mobile }) => (mobile ? '1rem' : '0')};
  background-color: ${({ mobile, theme }) => (mobile ? theme.palette.grey['A200'] : 'transparent')};
  img {
    width: 8rem;
    height: auto;
  }
  h2 {
    font-size: ${({ mobile }) => mobile && '2rem'};
    text-align: center;
    margin: ${({ mobile }) => (mobile ? '0rem' : '2rem 0')};
  }
`;

const ReviewSplit = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RatingIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 3rem;
`;

const Label = styled.div`
  font-size: 1.4rem;
  font-weight: bolder;
  margin: 1rem 0;
`;

export const RatingPlatform: FC<RatingPlatformProps> = ({ tablet = false, mobile = false }) => {
  const { t } = useTranslation();

  return (
    <Wrapper tablet={tablet} mobile={mobile}>
      {!mobile && <img src="/approved2.png" alt="" loading="lazy" />}
      <h2>
        <div>{t('app.com.pages.landing.primary.slogan1')}</div>
        <div>{t('app.com.pages.landing.primary.slogan2')}</div>
      </h2>
      {!mobile && (
        <ReviewSplit>
          {[
            {
              icon: Icons.HELMET_OUTLINE,
              label: t('app.com.pages.landing.primary.jobCount'),
              count: 11400,
            },
            {
              icon: Icons.STAR_OUTLINE,
              label: t('app.com.pages.landing.primary.reviewCount'),
              count: 2674,
            },
          ].map((e, index) => (
            <RatingIcon key={index}>
              <SvgIcon icon={e.icon} color="gradient" />
              <Label>{e.label}</Label>
              <Counter count={e.count} />
            </RatingIcon>
          ))}
        </ReviewSplit>
      )}
    </Wrapper>
  );
};
