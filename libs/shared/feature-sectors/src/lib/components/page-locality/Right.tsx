import React, { FC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Typography } from '@material-ui/core';

type RightProps = {
  mobile?: boolean;
  sectorName: string;
  locality: string;
};

const Wrapper = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  padding-top: ${({ tablet, mobile }) => (mobile ? '0' : tablet ? '2rem' : '5rem')};
  flex-basis: 35%;
`;

const IntroTitle = styled(({ mobile, ...restProps }) => <Typography {...restProps} />)`
  font-size: ${({ mobile }) => mobile && '1.8rem'};
  text-align: left;
  line-height: 3rem;
  color: #fff;
  margin-bottom: 1rem;
`;
const IntroCopy = styled(({ mobile, ...restProps }) => <Typography {...restProps} />)`
  font-size: 1.4rem;
  text-align: left;
  color: #fff;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;

export const Right: FC<RightProps> = ({ mobile = false, sectorName, locality }) => {
  const { t } = useTranslation();

  return (
    <Wrapper mobile={mobile}>
      <IntroTitle variant="h2" mobile={mobile}>
        {t('app.com.pages.sectors.subSectorByLocality.in')
          .replace('%SECTOR%', sectorName)
          .replace('%LOCALITY%', locality)}
      </IntroTitle>
      <IntroCopy variant="body1">
        {t('app.com.pages.sectors.subSectorByLocality.intro')
          .replace('%SECTOR%', sectorName)
          .replace('%LOCALITY%', locality)}
      </IntroCopy>
    </Wrapper>
  );
};
