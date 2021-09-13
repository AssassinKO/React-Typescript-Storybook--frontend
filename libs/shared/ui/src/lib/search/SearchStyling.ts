import styled from 'styled-components';
import { Button, IconButton } from '../buttons';

export const SearchInput = styled.input`
  border: 0.1rem solid #fff;
  border-radius: ${({ theme }) => theme.config.defaultBorderRadius};
  background: #fff;
  padding: 0.55rem;
  outline: none;
`;

export const Wrapper = styled.div`
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const ExpandedSearchField = styled.input`
  background: rgba(255, 255, 255, 0.8);
  border: none;
  outline: none;
  border-radius: 2rem;
  padding: 1.5rem 2rem;
  font-size: 1.5rem;
  display: block;
  width: 100%;
`;

export const ExpandedButton = styled(Button)`
  margin-top: 2rem;
  align-self: flex-end;
`;

export const CompactSearchField = styled.div`
  position: relative;
  background: #fff;
  height: 4rem;
  width: 100%;
  border-radius: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  border: 0.1rem solid ${({ theme }) => theme.palette.grey['400']};
`;

export const StyledInput = styled(SearchInput)`
  flex-grow: 1;
  align-self: stretch;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.3rem;
  border-radius: 2rem;
  padding: 0 4rem 0 1.5rem;

  &:focus {
    outline: none;
  }
`;

export const StyledIconButton = styled(IconButton)`
  position: absolute;
  top: 50%;
  right: 0.3rem;
  transform: translateY(-50%);
`;

export const FlyoutSearchField = styled.div`
  display: flex;
  height: 5rem;
  align-items: center;
`;

export const FlyoutSearchFieldInput = styled(SearchInput)`
  border: none;
  height: 5rem;
  width: 100%;
  font-size: 1.7rem;
`;

export const FlyoutSearchIconWrapper = styled.div`
  height: 3rem;
  border-left: 0.1rem solid ${({ theme }) => theme.palette.grey['400']};
  padding-left: 0.5rem;
`;
