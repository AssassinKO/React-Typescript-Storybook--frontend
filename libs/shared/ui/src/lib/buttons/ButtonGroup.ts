import styled from 'styled-components';

export const ButtonGroup = styled.div`
  overflow: hidden;

  & button {
    float: left;

    &:not(:last-child) {
      margin-right: 1rem;
    }
  }
`;
