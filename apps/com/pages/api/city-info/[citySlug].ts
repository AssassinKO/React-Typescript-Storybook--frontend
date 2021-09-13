import { CityInfo } from '@homeproved/shared/feature-sectors';
import { NextApiRequest, NextApiResponse } from 'next';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cityInfo: CityInfo = require('../../../localized-city-coords.json');

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { citySlug } = req.query;

  if (!cityInfo[citySlug as string]) {
    return res.status(404).json({
      message: `City ${citySlug} not found`,
    });
  }

  return res.status(200).json(cityInfo[citySlug as string]);
}
