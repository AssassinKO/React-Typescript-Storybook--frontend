import styled, { css } from 'styled-components';

export const tableCellBase = css`
  display: flex;
  align-items: center;
  padding: 0;
  height: 5rem;
  border: 1px solid ${({ theme }) => theme.palette.grey['100']};
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  &:first-child {
    border-top: none;
  }
  &:last-child {
    border-bottom: none;
  }
`;

export const tableColumnHeaderBase = css`
  display: flex;
  border: 1px solid ${({ theme }) => theme.palette.grey['100']};
  border-top: 0;
  height: 18rem;
`;

export const tableColumnFooterBase = css`
  display: flex;
  border: 1px solid ${({ theme }) => theme.palette.grey['100']};
  border-bottom: 0;
  justify-content: center;
  height: 20rem;
`;

export const AllFeaturesLink = styled.a`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.6rem;
  font-weight: bold;
  text-decoration: underline;
  color: ${({ theme }) => theme.palette.grey['800']};
`;
