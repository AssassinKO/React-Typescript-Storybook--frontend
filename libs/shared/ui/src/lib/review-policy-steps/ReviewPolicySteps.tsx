import React, { FC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Stars } from '../..';
import { Icons, SvgIcon } from '../svg-icon';
import { useTheme } from '@material-ui/core';

const Wrapper = styled.div`
  display: flex;
  margin: 4rem 0;
  justify-content: center;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.values.md + 'px'}) {
    flex-direction: column;
    align-items: center;
  }
`;

const StepWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 2rem;
  text-align: center;
  max-width: 25rem;
`;

const Step = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0.4rem;
  width: 8rem;
  height: 8rem;
  margin-bottom: 2rem;
  border-radius: 50% 50% 0 50%;
  font-size: 1.8rem;
  font-weight: 700;
  background: ${({ theme }) => theme.palette.grey['A200']};
`;

const Title = styled.div`
  margin-bottom: 2rem;
  font-size: 1.6rem;
  font-weight: 700;
`;

const List = styled.ul`
  padding-left: 2rem;
  text-align: left;
  font-size: 1.6rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;

const StyledSvgIcon = styled(({ ...restProps }) => <SvgIcon {...restProps} />)`
  margin-top: 1.5rem;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.values.md + 'px'}) {
    margin-top: 3rem;
    transform: rotate(90deg);
  }
`;

export const ReviewPolicySteps: FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <Wrapper>
      <StepWrapper>
        <Step>{t('Stap 1')}</Step>
        <Title>{'Je klant schrijft een beoordeling'}</Title>
        <Stars count={4} size={2.4} />
      </StepWrapper>
      <StyledSvgIcon icon={Icons.ANGLE_RIGHT} size={'large'} color={theme.palette.grey['200']} />
      <StepWrapper>
        <Step>{t('Stap 2')}</Step>
        <Title>{'Persoonlijke controle door Homeproved'}</Title>
        <List>
          <li>Automatische e-mailverificatie</li>
          <li>Controle persoonsgegevens</li>
          <li>Controle geschreven beoordeling</li>
          <li>Bij twijfel: contactopname</li>
        </List>
      </StepWrapper>
      <StyledSvgIcon icon={Icons.ANGLE_RIGHT} size={'large'} color={theme.palette.grey['200']} />
      <StepWrapper>
        <Step>{t('Stap 3')}</Step>
        <Title>{'De review wordt gepubliceerd'}</Title>
        <img src={'/approved.png'} loading="lazy" />
      </StepWrapper>
    </Wrapper>
  );
};
