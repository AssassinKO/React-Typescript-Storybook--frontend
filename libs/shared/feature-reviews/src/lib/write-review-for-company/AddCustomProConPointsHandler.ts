import { FC, useEffect } from 'react';
import { CustomProConPoint } from './WriteReviewForm';
import { ReviewsApiFactory, useApiFactory, useMutationFetch } from '@homeproved/shared/data-access';

type AddCustomProConPointsHandlerProps = {
  data: CustomProConPoint[];
  onComplete: (ids: number[]) => void;
};

let mutationQueue: CustomProConPoint[] = [];
let ids: number[] = [];

export const AddCustomProConPointsHandler: FC<AddCustomProConPointsHandlerProps> = ({
  data,
  onComplete,
}) => {
  const reviewsApi = useApiFactory(ReviewsApiFactory);
  const { mutation } = useMutationFetch('postProConPoint', reviewsApi.apiProConPointsPost);

  useEffect(() => {
    const unSubmitted = data.filter((item) => item.submitted === -1);
    if (unSubmitted.length === 0) {
      onComplete([]);
      return;
    }
    unSubmitted.forEach((item) => {
      mutationQueue.push(item);
    });
    mutateQueue();
  }, []);

  const mutateQueue = () => {
    const nextQueueItemIndex = mutationQueue.findIndex((item) => item.submitted === -1);
    if (nextQueueItemIndex === -1) {
      onComplete(ids);
      mutationQueue = [];
      ids = [];
      return;
    }
    mutation.mutate(
      {
        type: mutationQueue[nextQueueItemIndex].type,
        title: mutationQueue[nextQueueItemIndex].title,
      },
      {
        onSuccess: (data) => {
          mutationQueue[nextQueueItemIndex].submitted = data.data.id;
          ids.push(data.data.id);
          mutateQueue();
        },
      }
    );
  };

  return null;
};
