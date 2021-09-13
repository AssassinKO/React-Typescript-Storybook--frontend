import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Slider } from '@material-ui/core';

export type RangeSliderProps = {
  value: number;
  minValue: number;
  maxValue: number;
  onChange: (value: number) => void;
};

const Wrapper = styled.div`
  position: relative;
  padding-top: 1rem;
`;

const StyledSlider = styled(Slider)`
  margin-top: 0.5rem;
  .MuiSlider-valueLabel {
    font-family: ${({ theme }) => theme.config.fonts.PTSans};
  }
  .MuiSlider-rail {
    height: 1rem;
    ${({ theme }) => `
      border-radius: ${theme.config.defaultBorderRadius};
      background: ${theme.palette.grey[200]};
    `}
  }
  .MuiSlider-track {
    height: 1rem;
    ${({ theme }) => `
      border-radius: ${theme.config.defaultBorderRadius};
      background: ${theme.config.gradients.default};
    `}
  }
  .MuiSlider-thumb {
    background-color: #fff;
    height: 2rem;
    width: 2rem;
    &:focus,
    &:active,
    &:hover {
      box-shadow: none;
    }
    ${({ theme }) => `
      border: 0.1rem solid ${theme.palette.grey['500']}
    `}
  }
`;

const Value = styled.div`
  position: absolute;
  top: 0;
  font-size: 1.6rem;
  ${({ theme }) => `
    font-family: ${theme.config.fonts.PTSans}
  `}
`;

const MinValue = styled(Value)`
  left: 0;
`;
const MaxValue = styled(Value)`
  right: 0;
`;

export const RangeSlider: FC<RangeSliderProps> = ({ value, minValue, maxValue, onChange }) => {
  const [sliderValue, setSliderValue] = useState(value);
  useEffect(() => {
    setSliderValue(value);
  }, [value, setSliderValue]);
  const handleOnChange = (val) => {
    setSliderValue(val);
    onChange(val);
  };

  return (
    <Wrapper>
      <MinValue>{minValue}</MinValue>
      <MaxValue>{maxValue}</MaxValue>
      <StyledSlider
        defaultValue={sliderValue}
        min={minValue}
        max={maxValue}
        value={sliderValue}
        valueLabelDisplay="auto"
        onChange={(e, val) => handleOnChange(val as number)}
      />
    </Wrapper>
  );
};
