import React, { FC } from 'react';
import { Icons, SvgIcon } from '@homeproved/shared/ui';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';

type LeftProps = {
  tablet?: boolean;
  mobile?: boolean;
  sectorName: string;
  locality: string;
};

const Wrapper = styled(({ tablet, mobile, ...restProps }) => <div {...restProps} />)`
  text-align: center;
  padding-top: ${({ mobile }) => (mobile ? '3rem' : '15rem')};
  max-width: 30rem;

  img {
    width: 8rem;
    height: auto;
    margin-bottom: 1rem;
  }
`;

const ReviewsTitle = styled(({ mobile, ...restProps }) => <Typography {...restProps} />)`
  font-size: ${({ mobile }) => mobile && '1.8rem'};
  text-align: center;
  line-height: 3rem;
  margin-bottom: 2rem;
`;

export const Left: FC<LeftProps> = ({ tablet = false, mobile = false, sectorName, locality }) => {
  const { t } = useTranslation();

  return (
    <Wrapper tablet={tablet} mobile={mobile}>
      <img src="/approved2.png" alt="" loading="lazy" />
      <ReviewsTitle variant="h2" mobile={mobile}>
        {t('app.com.pages.sectors.subSectorByLocality.reviewsTitle')
          .replace('%SECTOR%', sectorName)
          .replace('%LOCALITY%', locality)}
      </ReviewsTitle>
      <SvgIcon icon={Icons.DOUBLE_ANGLE_DOWN} size={2} />
    </Wrapper>
  );
};
