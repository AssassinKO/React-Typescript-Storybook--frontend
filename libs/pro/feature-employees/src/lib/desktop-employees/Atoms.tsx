import styled, { css } from 'styled-components';
import { Input } from '@homeproved/shared/feature-forms';
import { Button } from '@homeproved/shared/ui';

const Spacing = css`
  border-bottom: 0.1rem solid ${({ theme }) => theme.palette.grey['A200']};
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.2rem;
  ${Spacing};
`;

export const Cell = styled(({ edit, header, small, ...restProps }) => <span {...restProps} />)`
  flex: ${({ small }) => (!small ? '1 0' : '0 0 12%')};
  text-align: center;
  padding: ${({ header }) => (header ? '1.4rem 1.4rem 2rem' : '0.5rem')};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  + span {
    border-left: 0.1rem solid ${({ theme }) => theme.palette.grey['A200']};
  }
  ${({ edit }) =>
    edit &&
    `
    flex-basis: 18rem;
    max-width: 18rem;

    span {
      margin: 0 0.6rem;
      cursor: pointer;

      &:last-child {
        margin-right: 0;
      }
    }
  `}
`;

export const Wrapper = styled.div`
  background: #fff;
  border-radius: ${({ theme }) => theme.config.defaultBorderRadius};
  padding: 2rem;
`;

export const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  font-size: 1rem;
  font-weight: 600;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  ${Spacing};
`;

export const StyledInput = styled(Input)`
  border-color: ${({ readOnly, theme }) => (readOnly ? 'transparent' : theme.palette.grey['A400'])};
  text-align: center;
  opacity: 1;
  margin-bottom: 0 !important;
  padding: 0.7rem;
  text-overflow: ellipsis;
`;

export const DeleteText = styled.p`
  text-align: center;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;

export const DeleteButton = styled(Button)`
  margin: 2rem auto 0;
  display: table;
`;

export const StyledSaveButton = styled(Button)`
  height: 2.5rem;
  padding: 1rem;
`;

export const PasswordReset = styled.span`
  text-decoration: underline;

  &:hover {
    text-decoration: none;
  }
`;

export const Ellipsis = styled.div`
  text-overflow: ellipsis;
  overflow: hidden;
`;

export const NoResults = styled.div`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.4rem;
`;
