/* eslint-disable @typescript-eslint/naming-convention */
import { createTheme } from '@mui/material';
import typography from './customize/typography';
import base from './customize/base';
import palette from './customize/palette';
import { BaseType } from './interface';

declare module '@mui/material/styles' {
   interface Theme extends BaseType {}
}

const theme = createTheme({
   palette: palette,
   ...base,

   typography: typography,
   components: {
      MuiButton: {
         defaultProps: {
            variant: 'contained',
            size: 'medium',
            disableElevation: true,
         },
         styleOverrides: {
            root: {
               textTransform: 'none',
               borderRadius: '8px',
            },
         },
      },
      MuiTextField: {
         defaultProps: {
            variant: 'outlined',
            size: 'small',
         },
         styleOverrides: {
            root: {
               '.MuiOutlinedInput-root ': {
                  borderRadius: '6px',
               },
            },
         },
      },
      MuiSelect: {
         defaultProps: {
            variant: 'outlined',
            size: 'small',
         },
      },
   },
});

export default theme;
