import React, { FC } from 'react';
import styled from 'styled-components';

type CompanyLogoProps = {
  logo: string;
};

const Logo = styled(({ logo, ...restProps }) => <div {...restProps} />)`
  background: ${({ theme, logo }) =>
    logo != null ? `url(${logo}) no-repeat center #fff` : theme.palette.grey['A200']};
  background-size: contain;
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50% 50% 0.4rem 50%;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.2rem;
  font-weight: 700;
  color: ${({ theme }) => theme.palette.grey['800']};
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1.5rem;
`;

export const CompanyLogo: FC<CompanyLogoProps> = ({ logo }) => {
  return <Logo logo={logo} />;
};
