import { QueryFunction, QueryFunctionContext, MutationFunction } from 'react-query';
import { AxiosResponse } from 'axios';

export const axiosQueryDataWrapper = <TResult>(
  queryFn: QueryFunction<AxiosResponse<TResult>>
) => async (context: QueryFunctionContext) => {
  const { data } = await queryFn(context);
  return data;
};

export const axiosMutationDataWrapper = <TResult, TVariables>(
  mutationFn: MutationFunction<AxiosResponse<TResult>, TVariables>
) => async (variables: TVariables) => {
  const { data } = await mutationFn(variables);
  return data;
};
