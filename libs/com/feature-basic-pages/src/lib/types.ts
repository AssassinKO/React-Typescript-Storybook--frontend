import { FlexibleTypes } from '@homeproved/shared/ui';

export type BasicPageUID =
  | 'legal-advice'
  | 'faq'
  | 'faq-individuals'
  | 'about'
  | 'privacy'
  | 'terms-use'
  | 'assessment-policy'
  | 'cookies';

// TODO: type 'attributes'?
export type FlexibleContent = {
  key: string;
  layout: string;
  attributes: unknown;
  name: FlexibleTypes;
  fields: [];
};

export type BasicPageData = {
  uid: BasicPageUID;
  id: number;
  title: string;
  slug: string;
  flexibleContent: FlexibleContent[];
  createdAt: string;
  updatedAt: string;
};

export type BasicPageDataResponse = {
  data: BasicPageData;
};
