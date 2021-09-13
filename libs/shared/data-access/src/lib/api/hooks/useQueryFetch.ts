import {
  QueryKey,
  UseQueryOptions,
  useQuery,
  QueryObserverResult,
  QueryFunction,
} from 'react-query';
import AbortController from 'node-abort-controller';
import useHeaders from './useHeaders';
import useResponseHandler from './useResponseHandler';
import { axiosQueryDataWrapper } from '../util/axiosDataWrapper';
import { AxiosResponse } from 'axios';

export type QueryFetchConfig<TResult> = {
  // eslint-disable-next-line
  mapper?: (data: any) => TResult;
  // eslint-disable-next-line
  options?: UseQueryOptions<any, any>;
};

export type QueryFetchResponse<TResult, TError> = {
  query: QueryObserverResult<TResult, TError>;
  cancel: () => void;
};

const DEFAULT_CONFIG: QueryFetchConfig<unknown> = {
  mapper: undefined,
  options: {
    refetchOnWindowFocus: false,
  },
};

export function useQueryFetch<TResult, TError>(
  queryKey: QueryKey,
  apiRoute: string,
  config?: QueryFetchConfig<TResult>
): QueryFetchResponse<TResult, TError>;

export function useQueryFetch<TResult, TError>(
  queryKey: QueryKey,
  queryFn: QueryFunction<AxiosResponse<TResult>>,
  config?: QueryFetchConfig<TResult>
): QueryFetchResponse<TResult, TError>;

export function useQueryFetch<TResult, TError>(
  queryKey: QueryKey,
  apiRoute: string | QueryFunction<AxiosResponse<TResult>>,
  config?: QueryFetchConfig<TResult>
): QueryFetchResponse<TResult, TError> {
  const configuration: QueryFetchConfig<TResult | unknown> = config || DEFAULT_CONFIG;
  const headers = useHeaders();
  const responseHandler = useResponseHandler(configuration.mapper);
  const abortController = new AbortController();
  const signal = abortController.signal;

  const queryFn =
    typeof apiRoute === 'string'
      ? () =>
          fetch((process.env.NEXT_PUBLIC_NX_API_ROUTE || '') + apiRoute, {
            method: 'GET',
            headers,
            signal,
          }).then(responseHandler)
      : axiosQueryDataWrapper(apiRoute);

  return {
    query: useQuery<TResult, TError>(queryKey, queryFn, configuration.options),
    cancel: abortController.abort,
  };
}
