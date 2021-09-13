import { QueryFunction, QueryKey } from 'react-query';
import { Sector } from './api/generated-api';

export type ApiConfig = {
  key: QueryKey;
  fn: QueryFunction;
}[];

export type SectorDescendant = Omit<Sector, 'descendants'>;
