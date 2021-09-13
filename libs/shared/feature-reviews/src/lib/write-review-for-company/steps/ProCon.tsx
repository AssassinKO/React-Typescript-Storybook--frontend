import React, { FC, useMemo } from 'react';
import { TileSelector } from './tiles/TileSelector';
import { useProCons } from '../../hooks/useProCons';
import { CustomProConPoint } from '../WriteReviewForm';

type ProConProps = {
  onProChange: (selectedPro: number[]) => void;
  onConChange: (selectedCon: number[]) => void;
  customPro: CustomProConPoint[];
  customCon: CustomProConPoint[];
  onAddCustomPro: () => void;
  onAddCustomCon: () => void;
  onChangeCustom: (original: CustomProConPoint, title: string) => void;
  onDeleteCustom: (original: CustomProConPoint) => void;
  lastAddedCustom?: number;
  readOnly: boolean;
};

export const ProCon: FC<ProConProps> = ({
  onProChange,
  onConChange,
  customPro,
  customCon,
  onAddCustomPro,
  onAddCustomCon,
  onChangeCustom,
  onDeleteCustom,
  lastAddedCustom,
  readOnly,
}) => {
  const { data, isSuccess } = useProCons();

  const proData = useMemo(
    () =>
      isSuccess
        ? data['data'].filter((value) => value.data.type === 'pro' && value.data.isOfficial)
        : [],
    [isSuccess, data]
  );
  const conData = useMemo(
    () =>
      isSuccess
        ? data['data'].filter((value) => value.data.type === 'con' && value.data.isOfficial)
        : [],
    [isSuccess, data]
  );

  return isSuccess ? (
    <>
      <TileSelector
        type="pro"
        proConPoints={proData}
        customProCon={customPro}
        onChange={onProChange}
        onAddCustom={onAddCustomPro}
        onChangeCustom={onChangeCustom}
        onDeleteCustom={onDeleteCustom}
        lastAddedCustom={lastAddedCustom}
        readOnly={readOnly}
      />
      <TileSelector
        type="con"
        proConPoints={conData}
        customProCon={customCon}
        onChange={onConChange}
        onAddCustom={onAddCustomCon}
        onChangeCustom={onChangeCustom}
        onDeleteCustom={onDeleteCustom}
        lastAddedCustom={lastAddedCustom}
        readOnly={readOnly}
      />
    </>
  ) : null;
};
