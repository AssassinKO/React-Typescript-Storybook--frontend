import { FC } from 'react';
import {
  Article,
  ArticlesApiFactory,
  useApiFactory,
  useQueryFetch,
} from '@homeproved/shared/data-access';

type MostReadArticlesHandlerProps = {
  onSuccess: (data: Article[]) => void;
};

export const MostReadArticlesHandler: FC<MostReadArticlesHandlerProps> = ({ onSuccess }) => {
  const articlesApi = useApiFactory(ArticlesApiFactory);

  useQueryFetch('mostRead', () => articlesApi.apiArticleMostReadGet('desc', 20), {
    options: {
      onSuccess,
    },
  });

  return null;
};
