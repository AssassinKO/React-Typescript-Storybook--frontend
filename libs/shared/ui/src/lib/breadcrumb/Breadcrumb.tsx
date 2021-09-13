import React, { FC } from 'react';
import styled from 'styled-components';

type BreadcrumbProps = {
  includeHomepageLink?: boolean;
  absolute?: boolean;
  transparent?: boolean;
};

const Wrapper = styled(({ absolute, transparent, ...restProps }) => <div {...restProps} />)`
  background-color: ${({ theme, transparent }) => !transparent && theme.palette.grey[100]};
  padding: ${({ transparent }) => (transparent ? '1.5rem 0' : '1.5rem 2rem')};
  font-family: ${({ theme }) => theme.config.fonts.PTSans};

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  ${({ absolute }) =>
    absolute &&
    `
    position: absolute;
    left: 0;
    width: 100vw;
  `}
`;

const Inner = styled(({ transparent, ...restProps }) => <div {...restProps} />)`
  max-width: 122.5rem;
  padding: ${({ transparent }) => !transparent && '0 2rem'};
  margin: auto;
`;

export const Breadcrumb: FC<BreadcrumbProps> = ({
  children,
  includeHomepageLink = false,
  absolute = false,
  transparent = false,
}) => {
  return (
    <Wrapper absolute={absolute} transparent={transparent}>
      <Inner transparent={transparent}>
        {includeHomepageLink && (
          <>
            <a href={'/'}>Homeproved</a>
            {' / '}
          </>
        )}
        {children}
      </Inner>
    </Wrapper>
  );
};
