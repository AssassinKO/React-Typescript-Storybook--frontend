import React, { FC } from 'react';
import { useTheme } from '@material-ui/core';
import {
  Opacity50Wrapper,
  RadioFormControlLabel,
  StyledCheckedIcon,
  StyledRadio,
  StyledUnCheckedIcon,
} from './RadioStyling';
import ReactHtmlParser from 'react-html-parser';

type RadioProps = {
  value: number | string;
  disabled?: boolean;
  label: string | React.ReactNode;
  labelColor?: string;
  labelWeight?: number;
  labelSize?: number;
  omitBorder?: boolean;
  height?: number;
};

export const Radio: FC<RadioProps> = ({
  value,
  disabled = false,
  label,
  labelColor,
  labelWeight = 300,
  labelSize = 1.5,
  height = 4,
  omitBorder = false,
}) => {
  const theme = useTheme();

  const processedLabelColor = labelColor || theme.palette.grey['800'];

  return (
    <RadioFormControlLabel
      control={
        <StyledRadio
          disabled={disabled}
          height={height}
          value={value}
          icon={
            disabled ? (
              <Opacity50Wrapper>
                <StyledUnCheckedIcon omitBorder={omitBorder} />
              </Opacity50Wrapper>
            ) : (
              <StyledUnCheckedIcon omitBorder={omitBorder} />
            )
          }
          checkedIcon={
            disabled ? (
              <Opacity50Wrapper>
                <StyledUnCheckedIcon omitBorder={omitBorder}>
                  <StyledCheckedIcon />
                </StyledUnCheckedIcon>
              </Opacity50Wrapper>
            ) : (
              <StyledUnCheckedIcon omitBorder={omitBorder}>
                <StyledCheckedIcon />
              </StyledUnCheckedIcon>
            )
          }
        />
      }
      label={typeof label === 'string' ? <>{ReactHtmlParser(label)}</> : label}
      labelColor={processedLabelColor}
      labelWeight={labelWeight}
      labelSize={labelSize}
    />
  );
};
