import React, { FC, useState } from 'react';
import { CompanyLogoContext } from './CompanyLogoContext';

export const CompanyLogoContextProvider: FC = ({ children }) => {
  const [newLogoSrc, setNewLogoSrc] = useState(null);

  return (
    <CompanyLogoContext.Provider value={{ newLogoSrc, setNewLogoSrc }}>
      {children}
    </CompanyLogoContext.Provider>
  );
};
