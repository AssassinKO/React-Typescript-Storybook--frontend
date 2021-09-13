import {
  MutationKey,
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  MutationFunction,
} from 'react-query';
import AbortController from 'node-abort-controller';
import { AxiosResponse } from 'axios';
import useHeaders from './useHeaders';
import useResponseHandler from './useResponseHandler';
import { axiosMutationDataWrapper } from '../util/axiosDataWrapper';

export type MutationFetchMethod = 'POST' | 'PATCH' | 'PUT' | 'DELETE';
export type MutationFetchConfig<TResult, TVariables = unknown> = {
  method?: MutationFetchMethod;
  mapper?: (data) => TResult;
  options?: UseMutationOptions<unknown, unknown, TVariables>;
};

export type MutationFetchResponse<TResult, TError, TVariables = unknown> = {
  mutation: UseMutationResult<TResult, TError, TVariables>;
  cancel: () => void;
};

const DEFAULT_CONFIG: MutationFetchConfig<unknown> = {
  method: 'POST',
  mapper: undefined,
  options: {},
};

export function useMutationFetch<TResult, TError>(
  mutationKey: MutationKey,
  apiRoute: string,
  config?: MutationFetchConfig<TResult>
): MutationFetchResponse<TResult, TError>;

export function useMutationFetch<TResult, TError, TVariables>(
  mutationKey: MutationKey,
  mutationFn: MutationFunction<AxiosResponse<TResult>, TVariables>,
  config?: MutationFetchConfig<TResult>
): MutationFetchResponse<TResult, TError, TVariables>;

export function useMutationFetch<TResult, TError, TVariables>(
  mutationKey: MutationKey,
  apiRoute: string | MutationFunction<AxiosResponse<TResult>, TVariables>,
  config?: MutationFetchConfig<TResult, TVariables>
): MutationFetchResponse<TResult, TError, TVariables> {
  const configuration: MutationFetchConfig<TResult | unknown, TVariables> =
    config || DEFAULT_CONFIG;
  const headers = useHeaders();
  const responseHandler = useResponseHandler(configuration.mapper);
  const abortController = new AbortController();
  const signal = abortController.signal;

  const mutationFn =
    typeof apiRoute === 'string'
      ? (data: TVariables) =>
          fetch(apiRoute, {
            method: configuration.method,
            headers,
            signal,
            body: JSON.stringify(data),
          }).then(responseHandler)
      : axiosMutationDataWrapper(apiRoute);

  return {
    mutation: useMutation<TResult, TError, TVariables>(
      mutationKey,
      mutationFn,
      configuration.options
    ),
    cancel: abortController.abort,
  };
}
