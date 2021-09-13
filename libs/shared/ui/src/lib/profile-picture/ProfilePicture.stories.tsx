import React from 'react';
import { ProfilePicture, ProfilePictureProps } from './ProfilePicture';

export default {
  component: ProfilePicture,
  title: 'ProfilePicture',
};

export const profilePicture = () => {
  const props: ProfilePictureProps = {};

  return <ProfilePicture {...props} />;
};
