import { SimplePaletteColorOptions, Theme } from '@material-ui/core';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface AppFonts {
    Cabrito: string;
    PTSans: string;
    DancingScript: string;
  }

  interface Gradients {
    default: string;
    rotated: string;
    vertical: string;
    verticalReverted: string;
    green: string;
    orange: string;
    red: string;
    turquoise: string;
  }

  interface Ratings {
    green: string;
    lightGreen: string;
    orange: string;
    red: string;
    lightRed: string;
  }

  interface ThemeConfig {
    fonts: AppFonts;
    defaultTransition: string;
    defaultBorderRadius: string;
    defaultBoxShadow: string;
    gradients: Gradients;
    ratings: Ratings;
  }

  interface Theme {
    name?: string;
    config: ThemeConfig;
  }
  interface ThemeOptions {
    name?: string;
    config: ThemeConfig;
  }
}

declare module '@material-ui/core/styles/createBreakpoints' {
  interface BreakpointOverrides {
    offCanvas: true;
    proDashboard: true;
  }
}

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    green: SimplePaletteColorOptions;
    turquoise: SimplePaletteColorOptions;
  }
  interface PaletteOptions {
    green: SimplePaletteColorOptions;
    turquoise: SimplePaletteColorOptions;
  }
  interface TypeBackground {
    dashboard: string;
  }
}

declare module 'styled-components' {
  // eslint-disable-next-line
  export interface DefaultTheme extends Theme {}
}
