import React, { FC } from 'react';
import styled from 'styled-components';
import { Button } from '../buttons';

export type WriteReviewProps = {
  caption: string;
  button: string;
};

const StyledWriteReview = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledWriteReviewCaption = styled.div`
  font-weight: bolder;
  margin-bottom: 2rem;
`;

export const WriteReview: FC<WriteReviewProps> = ({ caption, button }) => {
  return (
    <StyledWriteReview>
      <StyledWriteReviewCaption>{caption}</StyledWriteReviewCaption>
      <Button variant="gradient" arrow="right">
        {button}
      </Button>
    </StyledWriteReview>
  );
};
