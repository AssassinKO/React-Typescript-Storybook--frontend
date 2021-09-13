import React, { FC } from 'react';
import { makeStyles, useMediaQuery, useTheme } from '@material-ui/core';
import { SnackbarProvider } from 'notistack';

const useStyles = makeStyles((theme) => ({
  contentRoot: {
    fontFamily: theme.config.fonts.PTSans,
    fontSize: '1.4rem',
  },
  variantSuccess: {
    background: theme.config.gradients.green,
    width: '100vw',
    maxWidth: '40rem',
    [theme.breakpoints.down('xs')]: {
      maxWidth: 'calc(100vw - 1.6rem)',
    },
  },
  variantError: {
    background: `${theme.palette.grey['800']} !important`,
    width: '100vw',
    maxWidth: '40rem',
    [theme.breakpoints.down('xs')]: {
      maxWidth: 'calc(100vw - 1.6rem)',
    },
  },
  variantInfo: {
    background: theme.config.gradients.turquoise,
    width: '100vw',
    maxWidth: '40rem',
    [theme.breakpoints.down('xs')]: {
      maxWidth: 'calc(100vw - 1.6rem)',
    },
  },
  variantWarning: {},
}));

export const NotistackProvider: FC = ({ children }) => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <SnackbarProvider
      classes={classes}
      children={children}
      maxSnack={3}
      anchorOrigin={{
        horizontal: isMobile ? 'center' : 'right',
        vertical: isMobile ? 'bottom' : 'top',
      }}
      preventDuplicate
    />
  );
};
