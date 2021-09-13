import React from 'react';
import styled from 'styled-components';
import { Button, IconButton } from '@homeproved/shared/ui';
import { Box, Typography } from '@material-ui/core';
import { Input } from '@homeproved/shared/feature-forms';

export const Wrapper = styled.div`
  padding: 1rem;
  height: 13rem;
  width: 13rem;
  position: relative;
  margin: auto;
`;

export const InputWrapper = styled.div`
  height: 100%;
  &:focus {
    outline: 0;
  }
`;

export const LabelWrapper = styled.div`
  border: ${({ theme }) => `0.2rem solid ${theme.palette.grey['A200']}`};
  border-radius: 0.5rem;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: border-color 0.1s ease-in-out;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;

  &:hover {
    border-color: ${({ theme }) => theme.palette.grey['700']};
  }
  .MuiFormLabel-asterisk {
    color: ${({ theme }) => theme.palette.primary.main};
  }
  ${InputWrapper}:focus & {
    border-color: ${({ theme }) => theme.palette.grey['700']};
  }
`;

export const LabelText = styled(({ file, ...restProps }) => <span {...restProps} />)`
  font-size: 1.2rem;
  font-weight: 600;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  text-transform: uppercase;
  color: ${({ theme }) => theme.palette.grey['800']};
  display: flex;
  flex-direction: column;
  align-items: center;

  &:before {
    content: '';
    color: #fff;
    background: url('./icon_upload.svg') center center no-repeat;
    width: 2rem;
    height: 2rem;
    display: ${({ file }) => (file ? 'none' : 'flex')};
    justify-content: center;
    align-items: center;
    margin-bottom: 1rem;
  }
`;

export const Delete = styled(IconButton)`
  width: 2.2rem;
  height: 2.2rem;
  background: #fff;
  border-radius: 50%;
  position: absolute;
  right: 1.5rem;
  bottom: 1.5rem;
  cursor: pointer;
  z-index: 9;
`;

export const PageShell = styled.div``;

export const WhiteBox = styled(Box)`
  background-color: #fff;
  border-radius: 0.5rem;
`;
export const Title = styled(Typography)`
  text-align: center;
  font-weight: 700;
  font-size: 1.4rem;
  margin-bottom: 0.5rem;
`;
export const Description = styled(Typography)`
  text-align: center;
  font-size: 1.3rem;
  margin-bottom: 2rem;
  line-height: 2rem;
`;
export const FormatText = styled(Typography)`
  text-align: center;
  font-size: 1.3rem;
  margin-bottom: 3rem;
`;
export const InputWrapperForm = styled(({ mobile, ...restProps }) => <form {...restProps} />)`
  display: flex;
  flex-direction: ${({ mobile }) => (mobile ? 'column' : 'row')};
  width: 100%;
`;
export const InputItem = styled(({ mobile, marginBottom, ...restProps }) => <div {...restProps} />)`
  padding: ${({ mobile }) => (mobile ? 0 : '0 1rem')};
  align-self: ${({ mobile }) => (mobile ? 'auto' : 'flex-end')};
  flex: 1;
  margin-bottom: ${({ marginBottom }) => `${marginBottom}rem`};
  &:last-child {
    flex: none;
  }
`;
export const InputItemLabel = styled.label`
  font-size: 1.2rem;
  font-weight: 700;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  margin-bottom: 0.5rem;
  display: block;
`;
export const StyledInput = styled(Input)`
  background-color: ${({ theme }) => theme.palette.grey['A200']};
  border: none;
  margin-bottom: 0;
`;
export const ReceiversTable = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  padding: ${({ mobile }) => (mobile ? '0 0 3rem' : '0 2rem 5rem')};
  width: 100%;
`;
export const ReceiversTitle = styled(Typography)`
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 2rem;
`;
export const TableWrapper = styled.div`
  width: 100%;
  overflow-y: auto;
  max-height: 63rem;
`;

export const DataContent = styled(({ mobile, ...restProps }) => <Typography {...restProps} />)`
  font-size: 1.2rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  text-align: ${({ mobile }) => (mobile ? 'left' : 'center')};
  white-space: ${({ mobile }) => (mobile ? 'nowrap' : 'normal')};
  line-break: ${({ mobile }) => (mobile ? 'normal' : 'anywhere')};
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const Data = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: ${({ mobile }) => (mobile ? 'flex-start' : 'center')};
  align-items: center;
  position: relative;

  &:first-child {
    flex-basis: ${({ mobile }) => (mobile ? '60%' : '40%')};
    min-width: ${({ mobile }) => (mobile ? '60%' : '40%')};
  }
  &:nth-child(2) {
    border-left: ${({ theme }) => `0.1rem solid ${theme.palette.grey['A200']}`};
    border-right: ${({ theme, mobile }) =>
      mobile ? 'none' : `0.1rem solid ${theme.palette.grey['A200']}`};
    flex-basis: ${({ mobile }) => (mobile ? '40%' : '40%')};
    min-width: ${({ mobile }) => (mobile ? '40%' : '40%')};
  }
  &:nth-child(3) {
    flex-basis: 20%;
    justify-content: center;
  }
`;

export const Row = styled(({ header, ...restProps }) => <div {...restProps} />)`
  display: flex;
  border-bottom: ${({ theme }) => `0.1rem solid ${theme.palette.grey['A200']}`};
  ${({ header }) =>
    header &&
    `
    ${Data}{
      padding-bottom: 2.5rem;
      ${DataContent}{
        font-weight: 700;
        text-transform: uppercase;
      }
    }
  `}
`;
export const FormRow = styled(({ header, ...restProps }) => <form {...restProps} />)`
  display: flex;
  border-bottom: ${({ theme }) => `0.1rem solid ${theme.palette.grey['A200']}`};
  ${({ header }) =>
    header &&
    `
    ${Data}{
      padding-bottom: 2.5rem;
      ${DataContent}{
        font-weight: 700;
        text-transform: uppercase;
      }
    }
  `}
`;

export const Table = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  width: ${({ mobile }) => (mobile ? 'fit-content' : '100%')};
  min-width: 100%; //safari fix for fit-content
`;

export const BottomText = styled(Typography)`
  font-size: 1.3rem;
  text-align: center;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;

export const ThumbsUp = styled.div`
  width: 5rem;
  margin-bottom: 2rem;
  img {
    width: 100%;
  }
`;
export const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem 2rem 5rem;
`;
export const ModalContent = styled(Typography)`
  font-size: 1.6rem;
  font-weight: 700;
  text-align: center;
`;

export const LimitText = styled(Typography)`
  font-size: 1.4rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  text-align: center;
`;

export const LimitAmount = styled(Typography)`
  font-size: 2.2rem;
  font-weight: 700;
  text-align: center;
`;
export const LimitBall = styled.div`
  position: absolute;
  width: 16vw;
  height: 16vw;
  min-width: 20rem;
  max-width: 24rem;
  min-height: 20rem;
  max-height: 24rem;
  background-color: ${({ theme }) => theme.palette.grey['A200']};
  border-radius: 50%;
  left: 2.5rem;
  top: 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

export const StyledButton = styled(({ largeDesktop, ...restProps }) => <Button {...restProps} />)`
  ${({ largeDesktop }) =>
    !largeDesktop &&
    `
    border-radius: 1.2rem;
    font-size: 1.2rem;
    line-height: 1.2rem;
    svg{
      right: 0.5rem;
    }
  `}
`;
