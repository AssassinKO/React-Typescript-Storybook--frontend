import { Typography } from '@material-ui/core';
import styled from 'styled-components';

export const Label = styled.div`
  font-size: 1.4rem;
  font-weight: bold;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  margin-bottom: 0.5rem;
`;

export const Field = styled(({ tablet, ...restProps }) => <div {...restProps} />)`
  margin-top: 1.1rem;
  width: auto;
  flex: 1;
  margin-right: ${({ tablet }) => (tablet ? 0 : '1.1rem')};
  &:last-of-type {
    margin-right: 0;
  }
`;

export const FieldWrapper = styled.div`
  display: flex;
  justify-content: stretch;
  width: 100%;
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    flex-direction: column;
  }
`;

export const FieldWrapperThirdSplit = styled(FieldWrapper)`
  ${Field}:last-of-type {
    flex: 2;
  }
  @media only screen and (max-width: ${({ theme }) => theme.breakpoints.values.sm}px) {
    ${Field} {
      flex: 1;
    }
  }
`;

export const ButtonWrapper = styled(({ isTablet, ...restProps }) => <div {...restProps} />)`
  display: flex;
  justify-content: ${({ isTablet }) => (isTablet ? 'center' : 'flex-end')};
  margin: ${({ isTablet }) => (isTablet ? '3rem 0' : '1rem 0 3rem 0')};
`;

export const TOSWrapper = styled.div`
  margin: 1rem 0;
`;

export const Form = styled(({ tablet, ...restProps }) => <form {...restProps} />)`
  max-width: ${({ tablet }) => (tablet ? '100%' : '60rem')};
`;
export const SuccessMessage = styled.div`
  padding: 1.5rem 2.5rem;
  background-color: ${({ theme }) => theme.palette.green.light};
  border-radius: 0.5rem;
`;

export const SuccessMessageText = styled(Typography)`
  font-size: 1.4rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  line-height: 1.4rem;
  color: #fff;
`;
