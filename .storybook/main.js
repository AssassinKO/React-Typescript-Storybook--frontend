module.exports = {
  stories: [],
  addons: [
    '@storybook/addon-knobs/register',
    {
      name: '@storybook/addon-essentials',
      options: {
        backgrounds: false,
        controls: false,
      },
    },
    'storybook-addon-material-ui',
    'storybook-addon-styled-component-theme',
    'storybook-addon-next-router',
  ],
};
