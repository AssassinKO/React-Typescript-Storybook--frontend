import { Icons, SvgIcon } from '@homeproved/shared/ui';
import React, { FC, useEffect, useState } from 'react';
import { TileWrapper } from './Atoms';

type ProConTileProps = {
  type: 'pro' | 'con' | 'sector';
  selected: boolean;
  onChange: () => void;
  readOnly: boolean;
};

export const Tile: FC<ProConTileProps> = ({ type, selected, onChange, readOnly, children }) => {
  const [isSelected, setIsSelected] = useState(selected);

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  return (
    <TileWrapper
      type={type}
      selected={isSelected}
      onClick={
        readOnly
          ? null
          : () => {
              setIsSelected(!isSelected);
              onChange();
            }
      }
      readOnly={readOnly}
    >
      <span>{children}</span>
      {isSelected && <SvgIcon icon={Icons.TINY_CHECKMARK} size={1.2} />}
    </TileWrapper>
  );
};
