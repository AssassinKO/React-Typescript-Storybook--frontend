import React from 'react';

export const PageScrollContext = React.createContext<{
  pageScrollEnabled: boolean;
  setPageScrollEnabled: (value: boolean) => void;
}>({
  pageScrollEnabled: true,
  setPageScrollEnabled: () => null,
});
