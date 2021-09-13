import styled from 'styled-components';
import { FormLabel as MuiFormLabel } from '@material-ui/core';

export const FormLabel = styled(MuiFormLabel)`
  margin-bottom: 0.5rem;
  font-size: 1.4rem;
  font-weight: 600;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  color: ${({ theme }) => theme.palette.grey['800']};

  .MuiFormLabel-asterisk {
    color: ${({ theme }) => theme.palette.primary.main};
  }
`;
