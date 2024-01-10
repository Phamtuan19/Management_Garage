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
                  lineHeight: '1.2375em',
                  borderRadius: '6px',
               },
               '.css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input': {
                  height: '1.2375em',
               },
            },
         },
      },
      MuiSelect: {
         defaultProps: {
            variant: 'outlined',
            size: 'small',
         },
         styleOverrides: {
            root: {
               lineHeight: '1.2375em',
               borderRadius: '6px',
               '.css-snwtah-MuiSelect-select-MuiInputBase-input-MuiOutlinedInput-input.MuiSelect-select': {
                  minHeight: '1.2375em',
                  lineHeight: '1.2375em',
                  borderRadius: '6px',
                  minWidth: 100,
               },
            },
         },
      },
      MuiFormLabel: {
         defaultProps: {
            sx: {
               fontSize: '16px',
            },
         },
      },
   },
});

export default theme;
