import { Language } from '@homeproved/shared/feature-i18n';

export type Url = string;
export type JobResponse = { [L in Language]: { id: number; slug: string } }[];
export type CompanyResponse = {
  id: number;
  name: string;
  slug: string;
  realisations: { [L in Language]: { id: number; slug: string } }[];
}[];
export type SectorsResponse = {
  [L in Language]: { id: number; slug: string; parent_id: number | null };
}[];

export type SectorId = number;

export type CityData = Record<
  number,
  {
    gemeentenamen: { spelling: string; taal: Language }[];
  }
>;

export type DynamicPaths = Record<
  string,
  { getStaticPaths: (localizedRoute: Partial<Record<Language, string>>) => [Language, Url][][] }
>;
