import styled, { css } from 'styled-components';
import { Button, IconButton } from '@homeproved/shared/ui';
import { Input } from '@homeproved/shared/feature-forms';

const Spacing = css`
  padding: 1.5rem 2rem;
  border-bottom: 0.1rem solid ${({ theme }) => theme.palette.grey['A200']};
`;

const Text = css`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.4rem;
`;

export const Wrapper = styled.div`
  background: #fff;
  border-radius: ${({ theme }) => theme.config.defaultBorderRadius};
  padding: 0 2rem 3rem;
  margin-bottom: 2rem;
  text-align: center;
  position: relative;
`;

export const Spacer = styled(({ flex, ...restProps }) => <div {...restProps} />)`
  ${Spacing};
  display: ${({ flex }) => flex && 'flex'};
`;

export const StyledInput = styled(({ bold, innerRef, ...restProps }) => (
  <Input ref={innerRef} {...restProps} />
))`
  ${Text};
  border-color: ${({ readOnly, theme }) => (readOnly ? 'transparent' : theme.palette.grey['A400'])};
  text-align: center;
  opacity: 1;
  margin: 0 0.2rem 0 !important;
  padding: 0.7rem;
  font-size: 1.4rem;
  max-height: none;
  text-overflow: ellipsis;

  ${({ bold }) =>
    bold &&
    `
    font-weight: 600;
    text-transform: uppercase;
  `}
  ${({ firstName, readOnly }) =>
    firstName &&
    readOnly &&
    `
    text-align: right;
    padding: 0.7rem 0 0.7rem 0.7rem;
  `}
  ${({ lastName, readOnly }) =>
    lastName &&
    readOnly &&
    `
    text-align: left;
    padding: 0.7rem 0.7rem 0.7rem 0;
  `}
`;

export const PassReset = styled.div`
  ${Spacing};
  ${Text};
`;

export const StyledButton = styled(Button)`
  font-size: 1.4rem;
`;

export const Active = styled.div`
  ${Text};
  padding: 2rem 2rem 0;
  position: relative;
`;

export const ActiveLabel = styled.div`
  ${Text};
  text-transform: uppercase;
  font-weight: 600;
  color: ${({ theme }) => theme.palette.grey['600']};
  position: absolute;
  left: 0;
  display: flex;
  align-items: center;

  span {
    margin-left: 0.5rem;
  }
`;

export const Edit = styled.span`
  position: absolute;
  top: 1.5rem;
  right: 1rem;
`;

export const StyledIconButton = styled(IconButton)`
  width: 1.8rem;
  height: 1.8rem;
  padding: 1rem;
  position: absolute;
  top: 1.5rem;
  right: 1rem;
`;

export const Delete = styled.div`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  cursor: pointer;
`;

export const DeleteText = styled.p`
  text-align: center;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;

export const DeleteButton = styled(Button)`
  margin: 2rem auto 0;
  display: table;
`;
