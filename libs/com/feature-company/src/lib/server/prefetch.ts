import { ApiConfig, apiFactory, CompaniesApiFactory } from '@homeproved/shared/data-access';
import { Language } from '@homeproved/shared/feature-i18n';

const getCompany = (locale: Language, id: string) => {
  const api = apiFactory(locale, CompaniesApiFactory);

  return {
    key: ['company', id],
    fn: async () => {
      const response = await api.apiCompaniesCompanyGet(id);
      return response.data;
    },
  };
};

const getCompanyScore = (locale: Language, id: string) => {
  const api = apiFactory(locale, CompaniesApiFactory);

  return {
    key: ['companyScore', id],
    fn: async () => {
      const response = await api.apiCompaniesCompanyScoreGet(id);
      return response.data;
    },
  };
};

export const about = (locale: Language, id: string): ApiConfig => [
  getCompany(locale, id),
  getCompanyScore(locale, id),
];

export const contact = (locale: Language, id: string): ApiConfig => [
  getCompany(locale, id),
  getCompanyScore(locale, id),
];

export const realizations = (locale: Language, id: string): ApiConfig => [
  getCompany(locale, id),
  getCompanyScore(locale, id),
];

export const reviews = (locale: Language, id: string): ApiConfig => [
  getCompany(locale, id),
  getCompanyScore(locale, id),
];
