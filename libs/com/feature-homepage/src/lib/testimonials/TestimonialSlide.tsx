import React, { FC } from 'react';
import styled from 'styled-components';
import ReactHtmlParser from 'react-html-parser';

export interface TestimonialSlideProps {
  title: string;
  text: string;
  author: string;
}

const Title = styled.div`
  font-weight: 900;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Text = styled.div`
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;

const Author = styled.span`
  font-weight: 900;

  &:before {
    content: ' - ';
  }
`;

export const TestimonialSlide: FC<TestimonialSlideProps> = ({ title, text, author }) => {
  return (
    <div>
      <Title>{title}</Title>
      <Text>
        {ReactHtmlParser(text)}
        <Author>{author}</Author>
      </Text>
    </div>
  );
};
