import React from 'react';
import { CompanyTag, CompanyTagProps } from './CompanyTag';

export default {
  component: CompanyTag,
  title: 'CompanyTag',
};

export const companyTag = () => {
  const props: CompanyTagProps = {};

  return <CompanyTag {...props} />;
};
