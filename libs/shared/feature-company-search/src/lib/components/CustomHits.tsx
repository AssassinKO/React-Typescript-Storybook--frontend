import React, { FC } from 'react';
import { connectHits } from 'react-instantsearch-dom';
import { CompanySearchCard } from './CompanySearchCard';
import { HitsProvided } from 'react-instantsearch-core';
import { CompanyData } from '@homeproved/shared/data-access';
import { GetPathFunction } from '@homeproved/shared/feature-localized-routes';

export type ExtraCompanyData = {
  score?: {
    data?: {
      total?: number;
      score?: number;
    };
  };
  media?: [
    {
      data?: {
        conversions: {
          'fit-m': string;
          'fit-xs': string;
          'square-l': string;
          'square-m': string;
          'square-xs': string;
        };
        fileName: string;
        id: number;
        original: string;
      };
    },
    {
      data?: {
        fileName: string;
        id: number;
        original: string;
      };
    }
  ];
  claimed_at?: number;
};

type CustomHitsProps = HitsProvided<CompanyData & ExtraCompanyData> & {
  getPath: GetPathFunction;
  review?: boolean;
};

const Hits: FC<CustomHitsProps> = ({ hits, getPath, review = false }) => {
  return (
    <>
      {hits.map((hit) => (
        <CompanySearchCard company={hit} key={hit.objectID} getPath={getPath} review={review} />
      ))}
    </>
  );
};

export const CustomHits = connectHits<CustomHitsProps, CompanyData>(Hits);
