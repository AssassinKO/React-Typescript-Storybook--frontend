import React from 'react';
import { Pagination, PaginationProps } from './Pagination';

export default {
  component: Pagination,
  title: 'Pagination',
};

export const pagination = () => {
  const props: PaginationProps = {};

  return <Pagination {...props} />;
};
