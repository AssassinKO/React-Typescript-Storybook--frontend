import { UseMutationResult } from 'react-query';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { getErrorMessage } from '../getErrorMessage';
import { useTranslation } from 'react-i18next';

export const useRedirectOnSuccess = (
  mutation: UseMutationResult,
  pathname: string,
  query: Record<string, string>
): Dispatch<SetStateAction<boolean>> => {
  const { t } = useTranslation();
  const router = useRouter();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [backendErrorHandled, setBackendErrorHandled] = useState(false);

  useEffect(() => {
    if (mutation.isSuccess) {
      router
        .push({
          pathname,
          query,
        })
        .then();
      closeSnackbar();
    }
    if (mutation.isError && !backendErrorHandled) {
      enqueueSnackbar(getErrorMessage(mutation, t), { variant: 'error' });
      setBackendErrorHandled(true);
    }
  }, [backendErrorHandled, closeSnackbar, enqueueSnackbar, mutation, pathname, query, router, t]);

  return setBackendErrorHandled;
};
