import React from 'react';
import styled from 'styled-components';
import { FormGroup } from './FormGroup';

export const ShortFormGroup = styled(({ isMobile, ...restProps }) => <FormGroup {...restProps} />)`
  ${({ isMobile }) =>
    !isMobile &&
    `
    flex-grow: 0;
    width: 15rem;
  `}
`;
