import React, { FC } from 'react';
import styled from 'styled-components';
import { SvgIcon, useTheme } from '@material-ui/core';
import { CompaniesApiFactory, useApiFactory, useQueryFetch } from '@homeproved/shared/data-access';

type ScoreProps = {
  id: number;
  max?: number;
  className?: string;
  size?: 'small' | 'large';
};

const Wrapper = styled(({ size, ...restProps }) => <div {...restProps} />)`
  position: relative;
  width: ${({ size }) => (size === 'large' ? '13.5rem' : '10rem')};
`;

const ForegroundHomeShape = styled(({ size, ...restProps }) => <SvgIcon {...restProps} />)`
  width: ${({ size }) => (size === 'large' ? '13.5rem' : '10rem')};
  height: auto;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
`;

const BackgroundHomeShape = styled(({ size, ...restProps }) => <SvgIcon {...restProps} />)`
  width: ${({ size }) => (size === 'large' ? '14.5rem' : '11rem')};
  height: auto;
  text-align: center;
  margin: -0.5rem 0 0 -0.5rem;
`;

const Rating = styled.div`
  position: absolute;
  top: 55%;
  left: 50%;
  color: #fff;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  font-family: ${({ theme }) => theme.config.fonts.Cabrito};
  font-weight: 700;
  align-items: baseline;
`;

const ScoreWrapper = styled.div`
  display: flex;
`;

const ScoreNumber = styled(({ size, ...restProps }) => <span {...restProps} />)`
  font-size: ${({ size }) => (size === 'large' ? '4.5rem' : '2.5rem')};
`;

const Max = styled(({ size, ...restProps }) => <span {...restProps} />)`
  font-size: ${({ size }) => (size === 'large' ? '2rem' : '1rem')};
  align-self: flex-end;
  padding: ${({ size }) => (size === 'large' ? '0 0 0.8rem 0.5rem;' : '0 0 0.5rem 0.5rem;')};
`;

const Reviews = styled(({ size, ...restProps }) => <div {...restProps} />)`
  color: #fff;
  font-size: ${({ size }) => (size === 'large' ? '1.5rem' : '1.1rem')};
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  text-align: center;
  margin-top: ${({ size }) => size === 'large' && '-0.5rem'};
`;

export const Score: FC<ScoreProps> = ({ id, max = 10, className, size = 'small' }) => {
  const theme = useTheme();

  const companiesApi = useApiFactory(CompaniesApiFactory);
  const { query: companyScore } = useQueryFetch(['companyScore', id], () =>
    companiesApi.apiCompaniesCompanyScoreGet(id.toString())
  );

  return (
    companyScore?.data?.data != null && (
      <Wrapper className={className} size={size}>
        <ForegroundHomeShape viewBox="0 0 84 74.9" size={size}>
          <path
            fill={theme.palette.grey['800']}
            d="M81.9 26.2L44.7.9c-1.9-1.3-4.4-1.2-6.3 0L2 26.4c-1.2.8-2 2.2-2 3.7v44.8h84v-45c0-1.5-.8-2.9-2.1-3.7z"
          />
        </ForegroundHomeShape>
        <BackgroundHomeShape viewBox="0 0 84 74.9" size={size}>
          <path
            fill={'#FFF'}
            d="M81.9 26.2L44.7.9c-1.9-1.3-4.4-1.2-6.3 0L2 26.4c-1.2.8-2 2.2-2 3.7v44.8h84v-45c0-1.5-.8-2.9-2.1-3.7z"
          />
        </BackgroundHomeShape>
        <Rating>
          <ScoreWrapper>
            <ScoreNumber size={size}>{companyScore.data.data.score}</ScoreNumber>
            <Max size={size}>/ {max}</Max>
          </ScoreWrapper>
          <Reviews size={size}>{`${companyScore.data.data.total} reviews`}</Reviews>
        </Rating>
      </Wrapper>
    )
  );
};
