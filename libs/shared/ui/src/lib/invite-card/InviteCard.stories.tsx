import React from 'react';
import { InviteCard, InviteCardProps } from './InviteCard';

export default {
  component: InviteCard,
  title: 'InviteCard',
};

export const inviteCard = () => {
  const props: InviteCardProps = {};

  return <InviteCard {...props} />;
};
