import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import Slider from '@material-ui/core/Slider';
import { useTranslation } from 'react-i18next';
import { SmileyThumb } from './SmileyThumb';

export type ScoreSliderProps = {
  value: number | null;
  minValue?: number;
  maxValue?: number;
  disabled?: boolean;
  smileys?: boolean;
  onChange?: (value: number) => void;
  detailed?: boolean;
};

const Wrapper = styled(({ disabled, ...restProps }) => <div {...restProps} />)`
  display: ${({ disabled }) => (disabled ? 'flex' : 'block')};
  align-items: center;

  .MuiSlider-root {
    cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
    display: flex;
    align-items: center;
  }
`;

const StyledScoreSlider = styled(({ value, disabled, smileys, detailed, ...restProps }) => (
  <Slider value={value} disabled={disabled} step={detailed ? 0.1 : 1} {...restProps} />
))`
  .MuiSlider-rail {
    height: ${({ smileys, disabled }) => (smileys ? '1.4rem' : disabled ? '1rem' : '1.8rem')};
    border-radius: ${({ smileys, theme }) =>
      smileys ? '.7rem' : theme.config.defaultBorderRadius};
    background: ${({ theme }) => theme.palette.grey[200]};
  }
  .MuiSlider-track {
    height: ${({ smileys, disabled }) => (smileys ? '1.4rem' : disabled ? '1rem' : '1.8rem')};
    border-radius: ${({ smileys, theme }) =>
      smileys ? '.7rem' : theme.config.defaultBorderRadius};
    background: ${({ theme, value }) =>
      value < 7
        ? value > 4
          ? theme.config.gradients.orange
          : theme.config.gradients.red
        : theme.config.gradients.green};
  }
  .MuiSlider-thumb {
    height: 3.8rem;
    width: 3.8rem;
    margin-top: 0;
    &:focus,
    &:active,
    &:hover {
      box-shadow: none;
    }
    ${({ theme }) => `
      border: 0.4rem solid #fff;
      background-color: ${theme.palette.grey[800]};
    `}
    display: ${({ disabled, smileys }) => (disabled && !smileys ? 'none' : 'inline')};
  }
  .MuiSlider-valueLabel {
    display: flex;
    align-items: center;
    top: 1rem;
    left: 0;
    width: 3rem;
    height: 3rem;
    font-weight: 600;
    font-size: 1.4rem;
    ${({ theme }) => `
      font-family: ${theme.config.fonts.PTSans};
    `}
    span {
      background: transparent;
    }
  }
`;

const ScoreWrapper = styled.div`
  margin-left: 1rem;
  font-size: 1.3rem;
  font-weight: 600;
  font-family: ${({ theme }) => theme.config.fonts.PTSans};
`;

export const ScoreSlider: FC<ScoreSliderProps> = ({
  value,
  minValue = 0,
  maxValue = 10,
  disabled = false,
  smileys = false,
  onChange,
  detailed = false,
}) => {
  const { t } = useTranslation();
  const [sliderValue, setSliderValue] = useState(value);

  useEffect(() => {
    setSliderValue(value);
  }, [value, setSliderValue]);

  return (
    <Wrapper disabled={disabled}>
      <StyledScoreSlider
        defaultValue={sliderValue}
        min={minValue}
        max={maxValue}
        value={sliderValue}
        valueLabelDisplay="on"
        onChange={(e, val) => {
          setSliderValue(val);
          onChange && onChange(val);
        }}
        disabled={disabled}
        smileys={smileys}
        detailed={detailed}
        ThumbComponent={smileys ? SmileyThumb : 'span'}
      />
      {disabled && !smileys && (
        <ScoreWrapper>
          {value === null ? t('shared.na') : sliderValue + '/' + maxValue}
        </ScoreWrapper>
      )}
    </Wrapper>
  );
};
