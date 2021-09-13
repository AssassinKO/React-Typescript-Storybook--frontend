import React, { FC } from 'react';
import styled from 'styled-components';
import { TopGradient, Wrapper, Inner } from '@homeproved/pro/feature-homepage';
import { Header } from '@homeproved/pro/feature-header';
import { SvgIcon, Icons, Button, SectionTitle } from '@homeproved/shared/ui';
import { useTranslation } from 'react-i18next';
import ReactHtmlParser from 'react-html-parser';
import { Footer } from '@homeproved/pro/feature-footer';

const Main = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    padding-top: 4rem;
  }
`;

const MainTitle = styled.div`
  font-size: 3rem;
  color: white;
  text-align: center;
  margin-bottom: 2rem;
  margin-top: 6rem;
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    margin-top: 0;
    font-size: 2.6rem;
    max-width: 90%;
    line-height: 3.2rem;
  }
`;

const SubTitle = styled.div`
  font-size: 2.5rem;
  color: white;
  text-align: center;
  margin-top: 2rem;
  font-weight: bold;
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    font-size: 2rem;
  }
`;

const Division = styled.div`
  display: flex;
  width: 100%;
  max-width: 91.5rem;
  padding: 0 2rem;
  justify-content: space-between;
  margin: auto;
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 4rem;
  }
`;

const ImageRotated = styled.div`
  padding: 0 1rem;
  margin: 4vw 0 2rem -4rem;
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.values.md}px) {
    margin-top: 6vw;
  }
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    margin-top: 9vw;
    margin-left: 0;
    max-width: 40rem;
  }
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.values.xs}px) {
    margin-top: 5vw;
  }
`;

const StyledImage = styled.div`
  position: relative;
  transform: rotate(-5deg);
  transform-style: preserve-3d;
  &:before {
    display: block;
    content: '';
    width: 100%;
    padding-top: (1 / 1) * 100%;
  }
  > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    max-width: 40rem;
    width: 100%;
  }
  @media only screen and (max-width: 470px) {
    //Exception for breakpoints. Arrow will fall of screen otherwise.
    padding: 0 2rem;
  }
`;

const Arrow = styled.div`
  position: absolute;
  left: -3rem;
  top: 3rem;
  width: 2.5rem;
  img {
    width: 100%;
    height: auto;
  }
`;

const InsideForm = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  font-size: 1.6rem;
  b {
    font-size: 1.4rem;
    font-family: ${({ theme }) => theme.config.fonts.PTSans};
    margin-bottom: 1rem;
  }
  input {
    color: ${({ theme }) => theme.palette.grey['800']};
    font-family: ${({ theme }) => theme.config.fonts.Cabrito};
    background: ${({ theme }) => theme.palette.grey['A200']};
    padding: 1.4rem 1.8rem;
    font-size: 1.4rem;
    margin-bottom: 1.4rem;
    border: none;
    outline: none;
    width: 100%;
    border-radius: 0.4rem;
    @media only screen and (max-width: ${({ theme }) => theme.breakpoints.values.xs}px) {
      padding-right: 2rem;
    }
    &::placeholder {
      color: ${({ theme }) => theme.palette.grey['800']};
    }
  }
`;

const Summary = styled.div`
  max-width: 91.5rem;
  padding: 0 2rem;
  width: 100%;
  font-size: 1.6rem;
  margin: 0 auto;
  margin-bottom: 6rem;
`;

const Text = styled.div`
  font-size: 1.6rem;
  line-height: 2.8rem;
`;

const StyledButton = styled(Button)`
  margin: 1rem auto 0;
  @media only screen and (min-width: ${({ theme }) => theme.breakpoints.values.xs}px) {
    margin: 1rem 0 0;
  }
`;

export const BrochurePage: FC = () => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <TopGradient />
      <Inner>
        <Header />
        <Main>
          <MainTitle>{ReactHtmlParser(t('app.pro.pages.brochure.main'))}</MainTitle>
          <SvgIcon icon={Icons.DOUBLE_ANGLE_DOWN} color="white" size={4} />
          <SubTitle>{t('app.pro.pages.brochure.sub')}</SubTitle>
        </Main>
        <Division>
          <ImageRotated>
            <StyledImage>
              <img src="/brochure.png" alt="" />
            </StyledImage>
          </ImageRotated>
          <Form>
            <InsideForm>
              <Arrow>
                <img src="/brochure_arrow.png" alt="" />
              </Arrow>
              {t('app.pro.pages.brochure.caption')}
              <b>{t('app.pro.pages.brochure.label')}</b>
              <input type="text" placeholder={t('app.pro.pages.brochure.email')} />
              <input type="text" placeholder={t('app.pro.pages.brochure.btw')} />
              {/* -- */}
              <StyledButton variant="gradient" size="large">
                {t('app.pro.pages.brochure.send')}
              </StyledButton>
            </InsideForm>
          </Form>
        </Division>
        <Summary>
          <SectionTitle label={t('app.pro.pages.brochure.summary')} ignoreMobile={true} />
          <Text>{ReactHtmlParser(t('app.pro.pages.brochure.summarytext'))}</Text>
        </Summary>
      </Inner>
      <Footer />
    </Wrapper>
  );
};
