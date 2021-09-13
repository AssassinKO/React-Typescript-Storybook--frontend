import styled from 'styled-components';

export const ImagesWrapper = styled.div`
  margin-top: 2rem;
`;

export const ImageListTitle = styled.h3`
  margin: 0 0 1rem 0;
`;

export const ImageList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export const ImageListItem = styled.li`
  display: flex;
  align-items: center;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
`;
