import React, { FC, useEffect, useState } from 'react';
import { CheckboxProps as MuiCheckboxProps, useTheme } from '@material-ui/core';
import {
  CheckboxFormControlLabel,
  Opacity50Wrapper,
  StyledCheckbox,
  StyledCheckedIcon,
  StyledUnCheckedIcon,
} from './CheckBoxStyling';
import ReactHtmlParser from 'react-html-parser';

type CheckboxProps = {
  value?: boolean;
  disabled?: boolean;
  label: string | React.ReactNode;
  labelColor?: string;
  labelWeight?: number;
  labelSize?: number;
  omitBorder?: boolean;
  height?: number;
  onChange?: (checked: boolean) => void;
  variant?: 'light' | 'dark';
  labelCapitalized?: boolean;
  align?: 'flex-start' | 'center';
};

export const Checkbox: FC<CheckboxProps> = ({
  value = false,
  disabled = false,
  label,
  labelColor,
  labelWeight = 300,
  labelSize = 1.3,
  omitBorder = false,
  height = 4,
  onChange,
  variant = 'light',
  labelCapitalized,
  align = 'center',
}) => {
  const theme = useTheme();
  const [checked, setChecked] = useState(value);

  useEffect(() => setChecked(value), [value]);

  const handleChange: MuiCheckboxProps['onChange'] = (event) => {
    setChecked(event.target.checked);
    onChange && onChange(event.target.checked);
  };

  const processedLabelColor = labelColor || theme.palette.grey['800'];

  return (
    <CheckboxFormControlLabel
      align={align}
      control={
        <StyledCheckbox
          disabled={disabled}
          onChange={handleChange}
          checked={checked}
          height={height}
          variant={variant}
          icon={
            disabled ? (
              <Opacity50Wrapper>
                <StyledUnCheckedIcon omitBorder={omitBorder} variant={variant} checked={checked} />
              </Opacity50Wrapper>
            ) : (
              <StyledUnCheckedIcon omitBorder={omitBorder} variant={variant} checked={checked} />
            )
          }
          checkedIcon={
            disabled ? (
              <Opacity50Wrapper>
                <StyledUnCheckedIcon omitBorder={omitBorder} variant={variant} checked={checked}>
                  <StyledCheckedIcon variant={variant} />
                </StyledUnCheckedIcon>
              </Opacity50Wrapper>
            ) : (
              <StyledUnCheckedIcon omitBorder={omitBorder} variant={variant} checked={checked}>
                <StyledCheckedIcon variant={variant} />
              </StyledUnCheckedIcon>
            )
          }
        />
      }
      label={typeof label === 'string' ? <>{ReactHtmlParser(label)}</> : label}
      labelColor={processedLabelColor}
      labelWeight={labelWeight}
      labelSize={labelSize}
      labelCapitalized={labelCapitalized}
    />
  );
};
