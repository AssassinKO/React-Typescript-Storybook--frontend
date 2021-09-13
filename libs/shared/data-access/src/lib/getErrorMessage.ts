import React from 'react';
import { QueryObserverResult, UseMutationResult } from 'react-query';
import ReactHtmlParser from 'react-html-parser';
import { TFunction } from 'i18next';

// RESPONSE TYPES

export type ErrorMessageResponse = {
  response: {
    data: {
      status?: number;
      message: string;
    };
  };
};

export type FormErrorsResponse = {
  response: {
    data: {
      errors: { [key: string]: string };
    };
  };
};

// TYPE GUARDS

export const isErrorMessageResponse = (test: unknown): test is ErrorMessageResponse =>
  !!(test as ErrorMessageResponse)?.response?.data?.message;

export const isFormErrorsResponse = (test: unknown): test is FormErrorsResponse =>
  !!(test as FormErrorsResponse)?.response?.data?.errors;

// GET ERROR MESSAGE FROM RESPONSE

const GENERIC_ERROR_MESSAGE = 'errors.generic';

export const getErrorMessage = (
  input: QueryObserverResult | UseMutationResult,
  t: TFunction
): React.ReactElement | React.ReactElement[] => {
  let result;

  if (input?.error == null) return ReactHtmlParser(t(GENERIC_ERROR_MESSAGE));

  if (isErrorMessageResponse(input.error)) {
    result = t((input.error as ErrorMessageResponse).response.data.message) || '';
  }
  if (isFormErrorsResponse(input.error)) {
    const messageList = [];
    Object.entries((input.error as FormErrorsResponse).response.data.errors).forEach((entry) =>
      messageList.push(t(entry[1]))
    );
    result = messageList.join('<br/>');
  }

  result = result || t(GENERIC_ERROR_MESSAGE);

  return ReactHtmlParser(result);
};
