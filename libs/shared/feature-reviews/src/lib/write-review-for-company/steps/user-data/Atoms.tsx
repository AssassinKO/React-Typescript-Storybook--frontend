import React from 'react';
import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 4rem;
`;

export const Title = styled.h3`
  margin-top: 0;
`;

export const FormFields = styled(({ mobile, ...restProps }) => <div {...restProps} />)`
  display: ${({ mobile }) => (mobile ? 'block' : 'flex')};
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const Field = styled(({ readOnly, mobile, ...restProps }) => <div {...restProps} />)`
  width: ${({ mobile }) => (mobile ? '100%' : 'calc(50% - 2rem)')};
  margin-bottom: ${({ readOnly }) => (readOnly ? 0 : '1rem')};
`;

export const Label = styled(({ readOnly, ...restProps }) => <label {...restProps} />)`
  display: block;
  margin-bottom: ${({ readOnly }) => (readOnly ? 0 : '1rem')};
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.4rem;
`;
