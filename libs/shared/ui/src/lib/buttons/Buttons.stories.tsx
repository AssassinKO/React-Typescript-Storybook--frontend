import React from 'react';
import { Button } from './Button';
import { boolean, select, text } from '@storybook/addon-knobs';
import { Icons } from '../svg-icon';
import { IconButton } from './IconButton';

export default {
  component: Button,
  title: 'Buttons',
};

export const gradientVariant = () => {
  const withIcon = boolean('With icon', false);
  const icon = withIcon ? select('Icon', Icons, Icons.INTERIOR) : undefined;
  const pill = boolean('Pill shape', true);
  const arrow = boolean('Arrow', true);

  return (
    <Button variant="gradient" icon={icon} pill={pill} arrow={arrow}>
      {text('Label', 'button label')}
    </Button>
  );
};

export const darkVariant = () => {
  const withIcon = boolean('With icon', false);
  const icon = withIcon ? select('Icon', Icons, Icons.INTERIOR) : undefined;
  const pill = boolean('Pill shape', true);
  const arrow = boolean('Arrow', true);

  return (
    <Button variant="dark" icon={icon} pill={pill} arrow={arrow}>
      {text('Label', 'button label')}
    </Button>
  );
};

export const lightVariant = () => {
  const withIcon = boolean('With icon', false);
  const icon = withIcon ? select('Icon', Icons, Icons.INTERIOR) : undefined;
  const pill = boolean('Pill shape', true);
  const arrow = boolean('Arrow', true);

  return (
    <Button variant="light" icon={icon} pill={pill} arrow={arrow}>
      {text('Label', 'button label')}
    </Button>
  );
};

export const whiteVariant = () => {
  const withIcon = boolean('With icon', false);
  const icon = withIcon ? select('Icon', Icons, Icons.INTERIOR) : undefined;
  const pill = boolean('Pill shape', true);
  const arrow = boolean('Arrow', true);

  return (
    <Button variant="white" icon={icon} pill={pill} arrow={arrow}>
      {text('Label', 'button label')}
    </Button>
  );
};

export const textVariant = () => {
  const withIcon = boolean('With icon', false);
  const icon = withIcon ? select('Icon', Icons, Icons.INTERIOR) : undefined;

  return (
    <Button variant="text" icon={icon}>
      {text('Label', 'button label')}
    </Button>
  );
};

export const iconButton = () => {
  const icon = select('Icon', Icons, Icons.INTERIOR);

  return (
    <IconButton
      variant={select('Variant', ['gradient', 'dark', 'light', 'white'], 'dark')}
      icon={icon}
      disabled={boolean('Disabled', false)}
    />
  );
};
