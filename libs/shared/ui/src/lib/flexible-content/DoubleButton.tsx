import React, { FC } from 'react';
import styled from 'styled-components';
import { FlexibleContent } from './types';
import { Button } from '../buttons';
import { useTranslation } from 'react-i18next';
import { useMediaQuery, useTheme } from '@material-ui/core';

type DoubleButtonProps = {
  fields: FlexibleContent;
};

const Wrapper = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  margin: 2rem 0;
  margin-bottom: ${({ mobile }) => (mobile ? '4rem' : '6rem')};
`;

const Title = styled.h3`
  font-size: 1.8rem;
  text-align: center;
`;

const ButtonsWrapper = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  display: ${({ mobile }) => (mobile ? 'block' : 'flex')};
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  text-align: center;
`;

const Or = styled.p`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.4rem;
  font-weight: 700;
  text-transform: uppercase;
  margin: 1.5rem 4rem;
`;

export const DoubleButton: FC<DoubleButtonProps> = ({ fields }) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.xs));

  return (
    <Wrapper mobile={isMobile}>
      {fields.title && <Title>{fields.title}</Title>}
      <ButtonsWrapper mobile={isMobile}>
        <Button href={fields.buttonLink} size="large">
          {fields.buttonTitle}
        </Button>
        <Or>{t('shared.or')}</Or>
        <Button href={fields.button2Link} size="large">
          {fields.button2Title}
        </Button>
      </ButtonsWrapper>
    </Wrapper>
  );
};
