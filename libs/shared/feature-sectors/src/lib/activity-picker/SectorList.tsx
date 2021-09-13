import React, { FC } from 'react';
import { Sector, SectorDescendant } from '@homeproved/shared/data-access';
import {
  SectorExpandable,
  SectorWrapper,
  StyledSector,
  SubSector,
  SectorListWrapper,
} from './Atoms';
import { Icons, SvgIcon } from '@homeproved/shared/ui';
import { Checkbox as MuiCheckbox } from '@material-ui/core';

type SectorListProps = {
  sectors: Sector[];
  expandedTags: number[];
  selectedTags: number[];
  onExpandTag: (id: number) => void;
  onChange: (id: number) => void;
};

export const SectorList: FC<SectorListProps> = ({
  sectors,
  expandedTags,
  selectedTags,
  onExpandTag,
  onChange,
}) => {
  return (
    <SectorListWrapper>
      {sectors.map((sector) => (
        <SectorWrapper key={sector.data.id}>
          <StyledSector
            onClick={() => {
              onExpandTag(sector.data.id);
            }}
            className={expandedTags.includes(sector.data.id) ? 'expanded' : ''}
          >
            {sector.data.name}
            <SvgIcon
              icon={expandedTags.includes(sector.data.id) ? Icons.ANGLE_DOWN : Icons.ANGLE_UP}
              size={3}
            />
          </StyledSector>
          <SectorExpandable expanded={expandedTags.includes(sector.data.id)}>
            {sector.data.descendants.map((sectorDescendant: SectorDescendant) => (
              <SubSector
                key={sectorDescendant.data.id}
                onClick={() => {
                  onChange(sectorDescendant.data.id);
                }}
              >
                <MuiCheckbox
                  size="small"
                  checked={selectedTags.includes(sectorDescendant.data.id)}
                  color={'primary'}
                />
                {sectorDescendant.data.name}
              </SubSector>
            ))}
          </SectorExpandable>
        </SectorWrapper>
      ))}
    </SectorListWrapper>
  );
};
