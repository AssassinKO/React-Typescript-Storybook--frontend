import { MenuItem, Typography, MenuList } from '@material-ui/core';
import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  padding-bottom: ${({ theme }) => theme.spacing(2)}px;
`;

export const SuggestionTitle = styled(Typography)`
  padding-left: ${({ theme }) => theme.spacing(1)}px;
  padding-bottom: ${({ theme }) => theme.spacing(1)}px;
  margin-left: ${({ theme }) => theme.spacing(2)}px;
  margin-right: ${({ theme }) => theme.spacing(2)}px;
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
  margin-top: ${({ theme }) => theme.spacing(2)}px;

  font-weight: ${({ theme }) => theme.typography.fontWeightBold};
  font-size: 1.2rem;
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[300]};
`;

export const SuggestionItems = styled(MenuList)``;

export const SuggestionItem = styled(MenuItem)`
  font-size: 1.2rem;
  padding-top: ${({ theme }) => theme.spacing(0.5)}px;
  padding-bottom: ${({ theme }) => theme.spacing(0.5)}px;
  padding-left: ${({ theme }) => theme.spacing(6)}px;
  padding-right: ${({ theme }) => theme.spacing(6)}px;
  min-height: auto;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  white-space: pre-wrap;
`;

export const FilteredList = styled.ul`
  padding: 0;
  margin: 0;
  list-style-type: none;
`;
export const FilteredListItem = styled.li`
  a {
    text-decoration: none;
    color: #000;
  }
  ${FilteredList} {
    padding-left: 4rem;
  }
`;
