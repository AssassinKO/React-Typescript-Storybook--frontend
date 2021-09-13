import React from 'react';
import { Grid, useTheme } from '@material-ui/core';
import { boolean, select, color, number } from '@storybook/addon-knobs';
import { SvgIcon } from './SvgIcon';
import { Icons } from './Icons';

export default {
  component: SvgIcon,
  title: 'SvgIcon',
};

export const icon = () => {
  const theme = useTheme();
  const withGradient: boolean = boolean('gradient', false);
  const colorValue: string = withGradient
    ? undefined
    : color('iconColor', theme.palette.grey['800']);

  return (
    <SvgIcon
      icon={select('Icon', Icons, Icons.INTERIOR)}
      color={withGradient ? 'gradient' : colorValue}
      size={number('Size', 2)}
    />
  );
};

export const availableIcons = () => {
  const theme = useTheme();
  const icons = Object.keys(Icons).map((key: string) => {
    return {
      key,
      icon: Icons[key],
    };
  });

  return (
    <Grid container spacing={1}>
      {icons.map((iconObject, index) => (
        <Grid
          key={index}
          item
          style={{
            border: `.1rem solid ${theme.palette.grey['200']}`,
            background: theme.palette.common.white,
            padding: '1rem 2rem',
            borderRadius: '.5rem',
            display: 'flex',
            width: '25rem',
            justifyContent: 'space-between',
            margin: '.25rem',
          }}
        >
          <span
            style={{
              display: 'flex',
              height: '100%',
              alignItems: 'center',
              fontSize: '1.3rem',
            }}
          >
            Icons.{iconObject.key}
          </span>
          <span style={{ display: 'inline-block', position: 'relative', top: '.25rem' }}>
            <SvgIcon icon={iconObject.icon} size={3} color={theme.palette.grey['800']} />
          </span>
        </Grid>
      ))}
    </Grid>
  );
};
