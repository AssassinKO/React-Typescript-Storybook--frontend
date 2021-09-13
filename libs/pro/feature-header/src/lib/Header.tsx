import React, { FC } from 'react';
import { useMediaQuery, useTheme } from '@material-ui/core';
import { MobileHeader } from './MobileHeader';
import { DesktopHeader } from './DesktopHeader';

type HeaderProps = {
  homepage?: boolean;
  transparent?: boolean;
  minimal?: boolean;
};

export const Header: FC<HeaderProps> = ({
  homepage = false,
  transparent = false,
  minimal = false,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(
    theme.breakpoints.down(minimal ? theme.breakpoints.values.xs : 1100)
  );

  return isMobile ? (
    <MobileHeader transparent={transparent} />
  ) : (
    <DesktopHeader homepage={homepage} transparent={transparent} minimal={minimal} />
  );
};
