import React, { FC } from 'react';
import styled from 'styled-components';
import { Button, Icons, SvgIcon } from '@homeproved/shared/ui';
import { useTranslation } from 'react-i18next';
import { Card } from '@material-ui/core';

type UpgradeTextProps = {
  isMobile: boolean;
};

const Wrapper = styled(({ mobile, ...restProps }) => <Card {...restProps} />)`
  padding: 2.5rem 5rem;
  box-shadow: 0px 3px 9px -1px rgb(0 0 0 / 20%);
  max-width: 75rem;
  position: relative;
  overflow: visible;
  margin-top: ${({ mobile }) => (mobile ? '3.5rem' : '1.5rem')};
  &:before {
    content: '';
    display: block;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 2.5rem 2.5rem 2.5rem;
    border-color: transparent transparent #fff transparent;
    position: absolute;
    left: 6rem;
    top: 0;
    transform: translateY(-100%);
  }
`;

const Title = styled.div`
  position: relative;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;
const StyledSvgIcon = styled(SvgIcon)`
  position: absolute;
  left: -2.5rem;
  top: 50%;
  transform: translateY(-50%);
`;

const Text = styled.div`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  margin-bottom: 1.5rem;
`;

export const UpgradeText: FC<UpgradeTextProps> = ({ isMobile }) => {
  const { t } = useTranslation();

  return (
    <Wrapper mobile={isMobile}>
      <Title>
        <StyledSvgIcon icon={Icons.DELETE} size={2} />
        {t('app.pro.pages.reviewDetail.limitReached.title')}
      </Title>
      <Text>{t('app.pro.pages.reviewDetail.limitReached.text')}</Text>
      <Button variant="gradient">{t('app.pro.pages.reviewDetail.limitReached.buttonText')}</Button>
    </Wrapper>
  );
};
