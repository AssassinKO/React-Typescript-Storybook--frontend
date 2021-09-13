import React, { FC } from 'react';
import styled from 'styled-components';
import ReactHtmlParser from 'react-html-parser';

export type WysiwygProps = {
  title?: string;
  content: string;
};

const Wrapper = styled.div`
  margin: 2rem 0;
`;

const Title = styled.div`
  font-weight: 700;
  color: ${({ theme }) => theme.palette.primary.main};
`;

const Content = styled.div`
  font-size: 1.4rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;

export const Wysiwyg: FC<WysiwygProps> = ({ title, content }) => {
  return (
    <Wrapper>
      {!!title && <Title>{title}</Title>}
      <Content>{ReactHtmlParser(content)}</Content>
    </Wrapper>
  );
};
