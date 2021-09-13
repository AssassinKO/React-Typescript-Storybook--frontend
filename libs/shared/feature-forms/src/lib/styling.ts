import { css } from 'styled-components';

export const baseInputStyle = css<{ disabled?: boolean; readOnly?: boolean }>`
  padding: 1rem;
  border: 0.1rem solid ${({ theme }) => theme.palette.grey['500']};
  border-radius: ${({ theme }) => theme.config.defaultBorderRadius};
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  width: 100%;

  ${({ disabled, readOnly }) =>
    disabled || readOnly
      ? `
    opacity: 0.5;
    outline: none;
  `
      : `
    &:hover,
    &:focus {
      outline: none;
      border-color: ${({ theme }) => theme.palette.grey['700']};
    }
  `};
`;
