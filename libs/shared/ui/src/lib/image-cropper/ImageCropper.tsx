import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../buttons';
import { Modal } from '../modal';
import ReactCrop from 'react-image-crop';
import styled from 'styled-components';

type FileReaderResult = string | ArrayBuffer | null;

export type ImageCropperProps = {
  open: boolean;
  isTablet: boolean;
  image: FileReaderResult;
  onClose: (boolean) => void;
  ratio?: number;
  defaultCropWidth?: number;
  onCroppedImage: (image: string) => void;
};

const CropWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledButton = styled(Button)`
  margin-bottom: 2rem;
  align-self: flex-end;
`;

export const ImageCropper: FC<ImageCropperProps> = ({
  open,
  isTablet,
  image,
  onClose,
  ratio,
  defaultCropWidth,
  onCroppedImage,
}) => {
  const { t } = useTranslation();

  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);
  const [completedCrop, setCompletedCrop] = useState(null);
  const [croppedImage, setCroppedImage] = useState({});

  const onLoad = useCallback(
    (img) => {
      imgRef.current = img;
    },
    [imgRef]
  );

  useEffect(() => {
    if (ratio) {
      setCroppedImage({
        aspect: ratio,
        width: defaultCropWidth,
      });
    }
  }, [ratio, defaultCropWidth]);

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return;
    }

    const image = imgRef.current;
    const canvas = previewCanvasRef.current;
    const crop = completedCrop;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');

    canvas.width = Math.ceil(crop.width * scaleX);
    canvas.height = Math.ceil(crop.height * scaleY);

    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * scaleX,
      crop.height * scaleY
    );
  }, [completedCrop, previewCanvasRef.current, imgRef.current]);

  const onSaveCrop = (canvas, crop) => {
    if (!crop || !canvas) {
      return;
    }
    onCroppedImage(canvas.toDataURL());
  };

  return (
    <Modal
      open={open}
      onClose={() => onClose(false)}
      maxWidth={isTablet ? null : 96}
      title={t('app.pro.pages.realizations.add.cropTool.title')}
    >
      <CropWrapper>
        <StyledButton
          variant="gradient"
          onClick={() => onSaveCrop(previewCanvasRef.current, completedCrop)}
          arrow="none"
        >
          {t('app.pro.pages.realizations.add.cropTool.save')}
        </StyledButton>
        <ReactCrop
          src={image?.toString()}
          crop={croppedImage}
          onChange={(newCrop) => setCroppedImage(newCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          ruleOfThirds
          onImageLoaded={onLoad}
        />
        <div style={{ display: 'none' }}>
          <canvas ref={previewCanvasRef} />
        </div>
      </CropWrapper>
    </Modal>
  );
};
