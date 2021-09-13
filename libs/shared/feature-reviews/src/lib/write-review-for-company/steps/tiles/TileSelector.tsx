import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Icons, SvgIcon } from '@homeproved/shared/ui';
import { useTheme } from '@material-ui/core';
import { ProConPoint, Sector } from '@homeproved/shared/data-access';
import { Wrapper, Title, Intro, Selection, LoadMoreLink } from './Atoms';
import { Tile } from './Tile';
import { toggledArray } from '@homeproved/shared/util';
import { CustomProConPoint } from '../../WriteReviewForm';
import { CustomProConTile } from './CustomProConTile';

type TileSelectorProps = {
  type: 'pro' | 'con' | 'sector';
  proConPoints?: ProConPoint[];
  customProCon?: CustomProConPoint[];
  sectors?: Sector[];
  selectedSectors?: number[];
  onChange: (selected: number[]) => void;
  onAddCustom?: () => void;
  onChangeCustom?: (original: CustomProConPoint, newTitle: string) => void;
  onDeleteCustom?: (original: CustomProConPoint) => void;
  lastAddedCustom?: number;
  readOnly: boolean;
};

const LIMITED_COUNT = 5;

export const TileSelector: FC<TileSelectorProps> = ({
  type,
  proConPoints,
  customProCon,
  sectors,
  selectedSectors,
  onChange,
  onAddCustom,
  onChangeCustom,
  onDeleteCustom,
  lastAddedCustom,
  readOnly,
}) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const [selected, setSelected] = useState<number[]>([]);
  const [conPointInit, setConPointInit] = useState(false);
  const [limitCount, setLimitCount] = useState(true);
  const isProCon = type === 'pro' || type === 'con';

  useEffect(() => {
    onChange(selected);
  }, [selected]);

  useEffect(() => {
    if (!lastAddedCustom) return;
    setTimeout(() => {
      document.getElementById(`custom-${lastAddedCustom}`).focus();
    }, 100);
  }, [lastAddedCustom]);

  return (
    (proConPoints || sectors) && (
      <Wrapper>
        <Title>
          <h3>{isProCon ? t(`reviews.write.${type}.title`) : t('reviews.write.sectors.title')}</h3>
          {isProCon && (
            <SvgIcon
              icon={type === 'pro' ? Icons.CIRCLE_PLUS : Icons.CIRCLE_MINUS}
              color={type === 'pro' ? theme.palette.green.main : theme.palette.primary.main}
              size={2.4}
            />
          )}
        </Title>
        {isProCon && <Intro>{t(`reviews.write.${type}.intro`)}</Intro>}
        {(isProCon || sectors.length > 0) && (
          <Selection>
            {isProCon &&
              proConPoints.map((item, index) => {
                const canShow =
                  type === 'con' && !conPointInit
                    ? false
                    : limitCount
                    ? index < LIMITED_COUNT
                    : true;
                return canShow ? (
                  <Tile
                    key={index}
                    type={type as 'pro' | 'con'}
                    selected={selected.includes(item.data.id)}
                    onChange={() => setSelected(toggledArray(selected, item.data.id))}
                    readOnly={readOnly}
                  >
                    {item.data.title}
                  </Tile>
                ) : null;
              })}
            {isProCon &&
              customProCon.map((item, index) => (
                <CustomProConTile
                  key={index}
                  data={item}
                  onChange={onChangeCustom}
                  onDelete={onDeleteCustom}
                  readOnly={readOnly}
                >
                  {item.title}
                </CustomProConTile>
              ))}
            {!isProCon &&
              sectors.map((item, index) => {
                const canShow = limitCount ? index <= LIMITED_COUNT : true;
                return canShow ? (
                  <Tile
                    key={index}
                    type="sector"
                    selected={selectedSectors.includes(item.data.id)}
                    onChange={() => onChange(toggledArray(selectedSectors, item.data.id))}
                    readOnly={readOnly}
                  >
                    {item.data.name}
                  </Tile>
                ) : null;
              })}
          </Selection>
        )}
        {!readOnly && isProCon && limitCount && proConPoints.length >= LIMITED_COUNT && (
          <LoadMoreLink
            onClick={() => {
              setLimitCount(type === 'con' ? !conPointInit : false);
              setConPointInit(true);
            }}
          >
            {t('reviews.write.moreSuggestions')}
          </LoadMoreLink>
        )}
        {!readOnly && isProCon && (!limitCount || proConPoints.length < LIMITED_COUNT) && (
          <LoadMoreLink
            onClick={() => {
              onAddCustom();
            }}
          >
            {t(`reviews.write.${type}.add`)}
          </LoadMoreLink>
        )}
      </Wrapper>
    )
  );
};
