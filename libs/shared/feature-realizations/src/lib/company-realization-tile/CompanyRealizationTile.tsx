import React, { FC } from 'react';
import styled from 'styled-components';

export interface CompanyRealizationTileProps {
  title: string;
  image: string;
  company: string;
  className?: string;
}

const Wrapper = styled.div`
  position: relative;
  padding: 1rem 1rem 4rem;
  background-color: #fff;
  border-radius: ${({ theme }) => theme.config.defaultBorderRadius};
  border: 0.1rem solid ${({ theme }) => theme.palette.grey['A400']};
`;

const Image = styled.div`
  height: 24rem;
  width: 100%;
  margin-bottom: 1rem;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Company = styled.div`
  position: relative;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  text-transform: uppercase;
  font-size: 1.2rem;
  font-weight: 700;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 6.5rem;
    height: 0.4rem;
    background: ${({ theme }) => theme.config.gradients.default};
  }
`;

export const CompanyRealizationTile: FC<CompanyRealizationTileProps> = ({
  title,
  company,
  image,
  className,
}) => {
  return (
    <Wrapper className={className}>
      <Image>
        <img src={image} alt={title} loading="lazy" />
      </Image>
      <Company>{company}</Company>
      <div>{title}</div>
    </Wrapper>
  );
};

export default CompanyRealizationTile;
