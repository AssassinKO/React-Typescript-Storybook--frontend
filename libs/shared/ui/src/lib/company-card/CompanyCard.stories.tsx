import React from 'react';
import { text } from '@storybook/addon-knobs';
import { CompanyCard, CompanyCardProps } from './CompanyCard';

export default {
  component: CompanyCard,
  title: 'Company Card',
};

export const companyCard = () => {
  const props: CompanyCardProps = {
    company: text('Company', 'Codana'),
  };

  return <CompanyCard {...props} />;
};
