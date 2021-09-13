import React, { FC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import ReactHtmlParser from 'react-html-parser';

export type StepsWysiwygProps = {
  step: number;
  title: string;
  content: string;
};

const StyledStepsWysiwyg = styled.div`
  margin-bottom: 3rem;
`;

const Header = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  margin-bottom: 1rem;
`;

const Step = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0.4rem;
  width: 5.5rem;
  height: 5.5rem;
  margin-right: 1rem;
  border-radius: 50% 50% 0 50%;
  font-size: 1.4rem;
  font-weight: 700;
  background: ${({ theme }) => theme.palette.grey['A200']};

  @media screen and (min-width: ${({ theme }) => theme.breakpoints.values.lg + 'px'}) {
    font-size: 1.8rem;
    width: 8rem;
    height: 8rem;
    margin-left: -9rem;
  }
`;

const Title = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1;
  color: ${({ theme }) => theme.palette.primary.main};
`;

const Content = styled.div`
  font-size: 1.4rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;

export const StepsWysiwyg: FC<StepsWysiwygProps> = ({ step, title, content }) => {
  const { t } = useTranslation();

  return (
    <StyledStepsWysiwyg>
      <Header>
        <Step>{`${t('shared.step')} ${step}`}</Step>
        <Title>{title}</Title>
      </Header>
      <Content>{ReactHtmlParser(content)}</Content>
    </StyledStepsWysiwyg>
  );
};
