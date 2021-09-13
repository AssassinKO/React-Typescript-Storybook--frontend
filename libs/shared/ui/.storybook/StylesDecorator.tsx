import React from "react";
import { AppTheme, theme } from '@homeproved/shared/ui';

const StylesDecorator = storyFn => (
  <AppTheme theme={theme}>
    {storyFn()}
  </AppTheme>
);

export default StylesDecorator;
