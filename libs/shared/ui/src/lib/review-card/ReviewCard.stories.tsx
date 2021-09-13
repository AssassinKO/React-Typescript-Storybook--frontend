import React from 'react';
import { ReviewCard, ReviewCardProps } from './ReviewCard';

export default {
  component: ReviewCard,
  title: 'ReviewCard',
};

export const reviewCard = () => {
  const props: ReviewCardProps = {
    review: {
      picture:
        Math.random() > 0.5
          ? 'https://cdn.icon-icons.com/icons2/1999/PNG/512/avatar_people_person_profile_user_woman_icon_123368.png'
          : null,
      name: 'Sofie Verkammen',
      date: '17/06/20',
      rating: Math.floor(Math.random() * 100) / 10,
      text:
        'Na het ontvangen van offerte (zeker niet goedkoopste) besloten we om met deze firma in zee te gaan. (kwam heel professioneel over). We kregen via mail een...',
      title: 'Van een leien dakje',
    },
    isMobile: Math.random() > 0.5,
    showButtons: Math.random() > 0.5,
    checked: Math.random() > 0.5,
    shared: Math.random() > 0.5,
    favorite: Math.random() > 0.5,
    answered: Math.random() > 0.5,
    isNew: Math.random() > 0.5,
  };

  return <ReviewCard {...props} />;
};
