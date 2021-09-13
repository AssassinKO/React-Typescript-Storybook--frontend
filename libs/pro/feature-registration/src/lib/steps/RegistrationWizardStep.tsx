import React, { FC } from 'react';
import styled from 'styled-components';

type RegistrationWizardStepProps = {
  stepSize: number;
  step: number;
  active?: boolean;
  finished?: boolean;
};

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
`;

const StepNumber = styled(({ stepSize, ...restProps }) => <div {...restProps} />)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ stepSize }) => `${stepSize}rem`};
  height: ${({ stepSize }) => `${stepSize}rem`};
  background: #fff;
`;

const Inner = styled(({ stepSize, active, finished, ...restProps }) => <div {...restProps} />)`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ finished, stepSize }) =>
    finished ? `${stepSize - 2 + 0.2}rem` : `${stepSize - 2}rem`};
  height: ${({ finished, stepSize }) =>
    finished ? `${stepSize - 2 + 0.2}rem` : `${stepSize - 2}rem`};
  border: ${({ finished, theme }) =>
    finished ? 'none' : `.1rem solid ${theme.palette.grey['A200']}`};
  border-radius: 50%;
  background: ${({ active, finished, theme }) =>
    active ? theme.palette.grey['A200'] : finished ? theme.palette.green.main : '#FFF'};
  font-family: ${({ theme }) => theme.config.fonts.Cabrito};
  font-size: 1.8rem;
  font-weight: 700;
  line-height: 1.8rem;
`;

const CheckMark = styled.div`
  transform: rotate(45deg);
  &:before {
    display: block;
    content: '';
    position: absolute;
    width: 0.7rem;
    height: 0.3rem;
    background-color: #fff;
    left: calc(50% - 0.6rem);
    top: calc(50% + 0.3rem);
  }
  &:after {
    display: block;
    content: '';
    position: absolute;
    width: 0.3rem;
    height: 1.6rem;
    left: 50%;
    top: calc(50% - 1rem);
    background: #fff;
  }
`;

const Label = styled(({ stepSize, ...restProps }) => <div {...restProps} />)`
  position: absolute;
  top: ${({ stepSize }) => `${stepSize}rem`};
  left: 50%;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
  font-size: 1.2rem;
  white-space: nowrap;
  transform: translateX(-50%);
`;

export const RegistrationWizardStep: FC<RegistrationWizardStepProps> = ({
  stepSize,
  step,
  active = false,
  finished = false,
  children,
}) => {
  return (
    <Wrapper>
      <StepNumber stepSize={stepSize}>
        <Inner stepSize={stepSize} active={active} finished={finished}>
          {finished ? <CheckMark /> : step}
        </Inner>
      </StepNumber>
      <Label stepSize={stepSize}>{children}</Label>
    </Wrapper>
  );
};
