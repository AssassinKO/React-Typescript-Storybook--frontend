import { FC } from 'react';
import { PulseLoader } from 'react-spinners';
import styled from 'styled-components';

type ButtonSpinnerProps = {
  color: string;
  size: number;
};

const LoaderWrapper = styled(({ hasText, position, ...other }) => <div {...other} />)`
  position: absolute;
  top: 50%;
  right: 1.5rem;
  transform: translateY(-50%);
`;

export const ButtonSpinner: FC<ButtonSpinnerProps> = ({ color = '#fff', size = 1.5 }) => {
  return (
    <LoaderWrapper>
      <PulseLoader color={color} loading={true} size={size} />
    </LoaderWrapper>
  );
};
