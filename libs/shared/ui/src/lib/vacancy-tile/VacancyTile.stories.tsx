import React from 'react';
import { text } from '@storybook/addon-knobs';
import { VacancyTile, VacancyTileProps } from './VacancyTile';

export default {
  component: VacancyTile,
  title: 'VacancyTile',
};

export const vacancyTile = () => {
  /* eslint-disable-next-line */
  const props: VacancyTileProps = {
    label: text('Label', 'Lorum Ipsum Risus Condimentum Vestibulum'),
    publishDate: text('Publish Date', '13/11'),
  };

  return <VacancyTile {...props} />;
};
