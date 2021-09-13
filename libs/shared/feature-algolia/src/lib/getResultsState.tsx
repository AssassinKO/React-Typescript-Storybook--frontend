import React from 'react';
import { findResultsState } from 'react-instantsearch-dom/server';
import { QueryClientProvider } from 'react-query';
import { AppTheme, theme } from '@homeproved/shared/ui';
import { queryClient } from '@homeproved/shared/data-access';

export const getResultsState = async (component, props) => {
  const SSRWrapper = (ssrWrapperProps) => {
    return (
      <QueryClientProvider client={queryClient}>
        <AppTheme theme={theme}>{React.cloneElement(component, ssrWrapperProps)}</AppTheme>
      </QueryClientProvider>
    );
  };

  const resultsState = await findResultsState(SSRWrapper, props);
  return JSON.parse(JSON.stringify(resultsState));
};
