import { FC } from 'react';

type Props = {
  schema: {
    '@context': 'http://schema.org';
    '@type': 'LocalBusiness';
    name: string;
    image: string;
    address: {
      '@type': 'PostalAddress';
      streetAddress: string;
      addressLocality: string;
      postalCode: string;
    };
    aggregateRating: {
      '@type': 'AggregateRating';
      ratingValue: string;
      ratingCount: string;
      bestRating: string;
      worstRating: string;
    };
    review?: {
      '@type': 'Review';
      author: {
        '@type': string;
        name: string;
      };
      datePublished: string; // "2021-03-06",
      reviewRating: {
        '@type': 'Rating';
        ratingValue: string;
      };
      reviewBody: string;
    };
  }[];
};

export const JSONLD: FC<Props> = ({ schema }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};
