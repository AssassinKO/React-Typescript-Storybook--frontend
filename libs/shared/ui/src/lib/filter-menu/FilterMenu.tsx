import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { Button } from '../buttons/Button';
import { Menu, MenuItem } from '@material-ui/core';

export type FilterOption = {
  label: string;
  selected: boolean;
  handle: () => void;
};

export type FilterMenuProps = {
  filterOptions: FilterOption[];
  setSelected: (label: string) => void;
};

const StyledFilterMenu = styled.div``;
const StyledButton = styled(Button)`
  padding-top: 1rem;
  padding-bottom: 1rem;
  border: 0.1rem solid ${({ theme }) => theme.palette.grey['A400']};
`;

export const FilterMenu: FC<FilterMenuProps> = ({ filterOptions, setSelected }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openFilterMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeFilterMenu = () => {
    setAnchorEl(null);
  };
  return (
    <StyledFilterMenu>
      <StyledButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        variant="filter"
        onClick={openFilterMenu}
      >
        {filterOptions.find(({ label, selected }) => selected).label}
      </StyledButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeFilterMenu}
      >
        {filterOptions.map(
          ({ label, selected, handle }) =>
            !selected && (
              <MenuItem
                key={label}
                onClick={() => {
                  closeFilterMenu();
                  handle();
                  setSelected(label);
                }}
              >
                {label}
              </MenuItem>
            )
        )}
      </Menu>
    </StyledFilterMenu>
  );
};
