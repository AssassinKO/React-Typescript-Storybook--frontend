import { FC, useEffect } from 'react';
import { ImageList } from './steps/Images';
import { ApiReviewImages } from '@homeproved/shared/data-access';

type ConvertImagesToBase64HandlerProps = {
  images: ImageList;
  onComplete: (base64Images: ApiReviewImages[]) => void;
};

type ConversionQueueItem = {
  item: File;
  complete: boolean;
};

let conversionQueue: ConversionQueueItem[] = [];
let base64Images: ApiReviewImages[] = [];

export const ConvertImagesToBase64Handler: FC<ConvertImagesToBase64HandlerProps> = ({
  images,
  onComplete,
}) => {
  useEffect(() => {
    if (Object.keys(images).length === 0) {
      onComplete([]);
      return;
    }
    Object.entries(images).forEach((entry) => {
      conversionQueue.push({
        item: entry[1],
        complete: false,
      });
    });
    convertQueue();
  }, []);

  const convertQueue = () => {
    const nextQueueItemIndex = conversionQueue.findIndex((item) => item.complete === false);
    if (nextQueueItemIndex === -1) {
      onComplete(base64Images);
      conversionQueue = [];
      base64Images = [];
      return;
    }

    const reader = new FileReader();
    reader.onload = (e: ProgressEvent) => {
      const image = e.target && (e.target as FileReader).result;
      conversionQueue[nextQueueItemIndex].complete = true;
      base64Images.push({
        base64: image as string,
      });
      convertQueue();
    };
    reader.readAsDataURL(conversionQueue[nextQueueItemIndex].item);
  };

  return null;
};
