import { Language } from '@homeproved/shared/feature-i18n';

export type CitySlug = string;
export type CityInfoData = {
  location: { lat: number; lng: number };
  fullName: string;
  translations: Record<Language, CitySlug>;
};
export type CityInfo = Record<CitySlug, CityInfoData>;
