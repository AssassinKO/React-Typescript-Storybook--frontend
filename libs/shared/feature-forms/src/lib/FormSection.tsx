import React, { FC } from 'react';
import styled from 'styled-components';
import { FormSectionTitle } from './FormSectionTitle';

type FormSectionProps = {
  title: string;
};

const Wrapper = styled.div`
  margin-bottom: 3rem;
`;

export const FormSection: FC<FormSectionProps> = ({ title, children }) => {
  return (
    <Wrapper>
      <FormSectionTitle>{title}</FormSectionTitle>
      {children}
    </Wrapper>
  );
};
