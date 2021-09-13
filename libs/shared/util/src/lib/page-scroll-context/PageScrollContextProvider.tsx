import React, { FC, useState } from 'react';
import { PageScrollContext } from './PageScrollContext';

export const PageScrollContextProvider: FC = ({ children }) => {
  const [pageScrollEnabled, setPageScrollEnabled] = useState(true);
  return (
    <PageScrollContext.Provider value={{ pageScrollEnabled, setPageScrollEnabled }}>
      {children}
    </PageScrollContext.Provider>
  );
};
