import { FC } from 'react';
import {
  Realisation,
  RealisationApiFactory,
  useApiFactory,
  useQueryFetch,
} from '@homeproved/shared/data-access';

type MostReadRealisationsHandlerProps = {
  onSuccess: (data: Realisation[]) => void;
};

export const MostReadRealisationsHandler: FC<MostReadRealisationsHandlerProps> = ({
  onSuccess,
}) => {
  const realisationsApi = useApiFactory(RealisationApiFactory);
  useQueryFetch(
    'mostReadRealizations',
    () => realisationsApi.apiRealisationMostReadGet('desc', 20),
    {
      options: {
        onSuccess,
      },
    }
  );

  return null;
};
