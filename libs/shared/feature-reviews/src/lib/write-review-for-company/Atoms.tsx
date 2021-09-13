import React from 'react';
import styled, { css } from 'styled-components';
import { Rating } from '@homeproved/shared/ui';

export const FormFields = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  padding: ${({ mobile }) => (mobile ? '4rem 2rem' : '4rem')};
  background: white;
  border-radius: 0.5rem;
  margin-bottom: 3rem;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const CompanyLogo = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  img {
    display: block;
    width: ${({ mobile }) => (mobile ? '15rem' : '20rem')};
    flex-shrink: 0;
  }
`;

export const SliderWrapper = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  text-align: center;
  margin: ${({ mobile }) =>
    `3rem ${mobile ? 0 : '3rem'} ${mobile ? 0 : '3rem'} ${mobile ? 0 : '3rem'}`};

  h3 {
    margin-bottom: 3rem;
  }
`;

export const Result = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem 0;
`;

export const StyledRating = styled(Rating)`
  width: 8rem;
  margin-right: 1rem;
  white-space: nowrap;
`;

export const TooGoodNotice = styled.div`
  text-align: center;
  margin-bottom: 3rem;
`;

export const FieldLabel = styled.h5`
  margin: 1.5rem 0 0.5rem 0;
`;

const removeButtonLine = css`
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  background: ${({ theme }) => theme.palette.grey['800']};
  width: 1rem;
  height: 0.1rem;
`;

export const RemoveImageButton = styled.div`
  position: relative;
  cursor: pointer;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  background: #fff;
  transition: background-color 0.25s linear;
  margin-left: 1rem;

  &:hover {
    background-color: ${({ theme }) => theme.palette.grey['200']};
  }

  &:before {
    ${removeButtonLine};
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:after {
    ${removeButtonLine};
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;

export const ReadOnlyHiddenField = styled(({ readOnly, ...restProps }) => <div {...restProps} />)`
  display: ${({ readOnly }) => (readOnly ? 'none' : 'block')};
`;

export const ReadOnlyValue = styled(({ bold, ...restProps }) => <p {...restProps} />)`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.4rem;
  font-weight: ${({ bold }) => (bold ? '700' : '300')};
  margin: 0 0 2rem 0;
`;
