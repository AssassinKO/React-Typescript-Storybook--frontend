import { Typography } from '@material-ui/core';
import styled from 'styled-components';

export const Wrapper = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  background: #fff;
  border-radius: ${({ theme, mobile }) => (mobile ? 0 : theme.config.defaultBorderRadius)};
  padding: 2rem 2.5rem 3rem;
  text-align: center;
  margin-bottom: ${({ mobile }) => (mobile ? '-2rem' : 0)};
`;

export const Title = styled(Typography)`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 2rem;
`;

export const Text = styled(Typography)`
  display: flex;
  font-size: 1.2rem;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  margin-bottom: 1rem;
  a {
    text-decoration: none;
    color: ${({ theme }) => theme.palette.text.primary};
    display: flex;
    align-items: center;
  }
  svg,
  path {
    fill: ${({ theme }) => theme.palette.primary.main};
  }
  span {
    margin-left: 1rem;
  }
`;
