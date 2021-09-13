import React, { FC } from 'react';
import { DesktopHeader } from './DesktopHeader';
import { MobileHeader } from './MobileHeader';
import { useMediaQuery, useTheme } from '@material-ui/core';

type HeaderProps = {
  homepage?: boolean;
  transparent?: boolean;
};

export const Header: FC<HeaderProps> = ({ homepage = false, transparent = false }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(theme.breakpoints.values.sm));

  return isMobile ? (
    <MobileHeader transparent={transparent} />
  ) : (
    <DesktopHeader homepage={homepage} transparent={transparent} />
  );
};
