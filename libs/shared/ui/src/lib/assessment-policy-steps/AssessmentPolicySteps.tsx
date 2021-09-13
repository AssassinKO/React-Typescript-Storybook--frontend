import React, { FC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Stars } from '../..';
import { Icons, SvgIcon } from '../svg-icon';
import { useMediaQuery, useTheme } from '@material-ui/core';

const Wrapper = styled.div`
  display: flex;
  margin: 4rem 0;
  justify-content: center;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.values.md + 'px'}) {
    flex-direction: column;
    align-items: center;
  }
`;

const StepWrapper = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: ${({ mobile }) => (mobile ? '0 0 3rem' : '0 2rem')};
  text-align: center;
  max-width: ${({ mobile }) => (mobile ? '32rem' : '25rem')};
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
  margin-left: auto;
  margin-right: auto;
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
  list-style-type: none;
  li {
    position: relative;
    &:before {
      content: '';
      display: block;
      width: 0.8rem;
      height: 0.8rem;
      background-color: ${({ theme }) => theme.palette.grey[200]};
      border-radius: 50%;
      left: -2.4rem;
      top: 50%;
      transform: translateY(-50%);
      position: absolute;
    }
  }
`;

const StyledSvgIcon = styled(({ ...restProps }) => <SvgIcon {...restProps} />)`
  margin-top: 2.5rem;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.values.md + 'px'}) {
    margin-top: 3rem;
    transform: rotate(90deg);
  }
`;

const TitleWrapper = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  ${({ mobile }) =>
    mobile &&
    `
    display: flex;
    ${Title}{
      text-align: left;
      align-self: flex-end;
    }
    ${Step}{
      margin-right: 3rem;
    }
  `}
`;

export const AssessmentPolicySteps: FC = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.md));
  const listContent: string[] = t('basicPages.assessmentPolicy.listContent', {
    returnObjects: true,
    defaultValue: [],
  });

  return (
    <Wrapper>
      <StepWrapper mobile={isMobile}>
        <TitleWrapper mobile={isMobile}>
          <Step>{`${t('shared.step')} 1`}</Step>
          <Title>{t('basicPages.assessmentPolicy.titleStepOne')}</Title>
        </TitleWrapper>
        <Stars count={4} size={2.4} />
      </StepWrapper>
      {!isMobile && (
        <StyledSvgIcon icon={Icons.ANGLE_RIGHT} size={'large'} color={theme.palette.grey['200']} />
      )}
      <StepWrapper mobile={isMobile}>
        <TitleWrapper mobile={isMobile}>
          <Step>{`${t('shared.step')} 2`}</Step>
          <Title>{t('basicPages.assessmentPolicy.titleStepTwo')}</Title>
        </TitleWrapper>
        <List>
          {listContent.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
        </List>
      </StepWrapper>
      {!isMobile && (
        <StyledSvgIcon icon={Icons.ANGLE_RIGHT} size={'large'} color={theme.palette.grey['200']} />
      )}
      <StepWrapper mobile={isMobile}>
        <TitleWrapper mobile={isMobile}>
          <Step>{t(`${t('shared.step')} 3`)}</Step>
          <Title>{t('basicPages.assessmentPolicy.titleStepThree')}</Title>
        </TitleWrapper>
        <img src={'/approved.png'} loading="lazy" />
      </StepWrapper>
    </Wrapper>
  );
};
