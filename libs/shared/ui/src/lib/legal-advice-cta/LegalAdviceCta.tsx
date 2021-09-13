import React, { FC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Button } from '../buttons';
import { useMediaQuery, useTheme } from '@material-ui/core';

type LegalAdviceCtaProps = {
  href?: string;
};

const Wrapper = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  margin: 6rem 0;
  background: ${({ theme }) => theme.config.gradients.default};
  border-radius: ${({ theme }) => theme.config.defaultBorderRadius};
  box-shadow: 0 0 0.6rem rgb(22 22 21 / 20%);
  padding: 2.5rem 3rem;
  color: #fff;
  display: ${({ isMobile }) => !isMobile && 'flex'};
  align-items: center;
  justify-content: space-between;
  text-align: ${({ isMobile }) => isMobile && 'center'};
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const Text = styled(({ isMobile, ...restProps }) => <div {...restProps} />)`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  margin-bottom: ${({ isMobile }) => isMobile && '3rem'};
`;

export const LegalAdviceCta: FC<LegalAdviceCtaProps> = ({ href = null }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(700));

  return (
    <Wrapper isMobile={isMobile}>
      <div>
        <Title>{t('shared.legalAdviceCta.title')}</Title>
        <Text isMobile={isMobile}>{t('shared.legalAdviceCta.text')}</Text>
      </div>
      {!!href && (
        <Button variant={'white'} href={href} pill={false}>
          {t('shared.legalAdviceCta.button')}
        </Button>
      )}
    </Wrapper>
  );
};
