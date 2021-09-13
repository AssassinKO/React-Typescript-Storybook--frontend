import React, { FC, useEffect, useState } from 'react';
import { Icons, SvgIcon } from '@homeproved/shared/ui';
import { CustomProConIconWrapper, TileWrapper } from './Atoms';
import { CustomProConPoint } from '../../WriteReviewForm';
import AutosizeInput from 'react-input-autosize';

type CustomProConTileProps = {
  data: CustomProConPoint;
  onChange: (original: CustomProConPoint, newTitle: string) => void;
  onDelete: (original: CustomProConPoint) => void;
  readOnly: boolean;
};

export const CustomProConTile: FC<CustomProConTileProps> = ({
  data,
  onChange,
  onDelete,
  readOnly,
}) => {
  const [title, setTitle] = useState('');
  const [hover, setHover] = useState(false);

  useEffect(() => {
    onChange(data, title);
  }, [title]);

  useEffect(() => {
    setTitle(data.title);
  }, [data]);

  return (
    <TileWrapper custom type={data.type} selected readOnly={readOnly}>
      <AutosizeInput
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        id={`custom-${data.id}`}
        disabled={readOnly}
      />
      <CustomProConIconWrapper
        onMouseEnter={readOnly ? null : () => setHover(true)}
        onMouseLeave={readOnly ? null : () => setHover(false)}
        onClick={readOnly ? null : () => onDelete(data)}
      >
        <SvgIcon icon={hover ? Icons.CROSS : Icons.TINY_CHECKMARK} size={hover ? 0.8 : 1.2} />
      </CustomProConIconWrapper>
    </TileWrapper>
  );
};
