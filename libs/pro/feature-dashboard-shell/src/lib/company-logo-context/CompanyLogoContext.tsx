import React from 'react';

export const CompanyLogoContext = React.createContext<{
  newLogoSrc: string;
  setNewLogoSrc: (value: string) => void;
}>({
  newLogoSrc: null,
  setNewLogoSrc: () => null,
});
