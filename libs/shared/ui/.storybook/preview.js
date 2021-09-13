import { addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';
import { withNextRouter } from 'storybook-addon-next-router';
import StylesDecorator from './StylesDecorator';

addDecorator(withKnobs);
addDecorator(
  withNextRouter({
    path: '/',
    asPath: '/',
    query: {},
    push: () => new Promise((resolve) => resolve()),
  })
);
addDecorator(StylesDecorator);
