import React, { FC } from 'react';
import styled from 'styled-components';
import { FacetTitle } from './Atoms';

const Wrapper = styled.section`
  margin-bottom: 4rem;
`;

type FilterSectionProps = {
  title: string;
};

const FilterSection: FC<FilterSectionProps> = ({ children, title }) => (
  <Wrapper>
    <FacetTitle>{title}</FacetTitle>
    {children}
  </Wrapper>
);

export default FilterSection;
