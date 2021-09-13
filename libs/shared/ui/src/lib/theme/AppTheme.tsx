import React, { FC } from 'react';
import {
  createGlobalStyle,
  DefaultTheme,
  ThemeProvider as SCThemeProvider,
} from 'styled-components';
import { CssBaseline, ThemeOptions } from '@material-ui/core';
import { StylesProvider, ThemeProvider as MuiThemeProvider } from '@material-ui/styles';
import { usePageScroll } from '@homeproved/shared/util';

type Props = {
  theme: ThemeOptions;
};

const GlobalStyle = createGlobalStyle<{ pageScrollEnabled?: boolean }>`
  html {
    font-size: 62.5%;
  }
  body {
    overflow-y: ${({ pageScrollEnabled }) => (pageScrollEnabled ? 'inherit' : 'hidden')};
    overflow-x: hidden;
    background-color: #fff;
  }
  img {
    max-width: 100%;
    image-rendering: -webkit-optimize-contrast;
  }
`;

const AppTheme: FC<Props> = ({ theme, children }) => {
  const { pageScrollEnabled } = usePageScroll();

  return (
    <StylesProvider injectFirst>
      <SCThemeProvider theme={theme as DefaultTheme}>
        <MuiThemeProvider theme={theme}>
          <GlobalStyle pageScrollEnabled={pageScrollEnabled} />
          <CssBaseline />
          {children}
        </MuiThemeProvider>
      </SCThemeProvider>
    </StylesProvider>
  );
};

export default AppTheme;
