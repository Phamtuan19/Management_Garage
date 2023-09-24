import { createTheme } from '@mui/material';

import typography from './customize/typography';
import base from './customize/base';
import { Base } from './interface';

declare module '@mui/material/styles' {
   interface Theme extends Base {}
}

/**
 * @primary - dành cho các thành phần giao diện chính.
 * @secondary - dành cho các thành phần giao diện phụ.
 * @error - đối với các yếu tố mà người dùng cần được biết.
 * @warning - đối với các hành động nguy hiểm tiềm ẩn hoặc các thông báo quan trọng.
 * @info - để làm nổi bật thông tin trung lập.
 * @success - để biểu thị việc hoàn thành thành công một hành động mà người dùng đã kích hoạt.
 *
 *
 * ********************************
 *
 * @main - color default component
 * @dark - color hover component
 *
 **/

const theme = createTheme({
   palette: {
      background: {
         default: '#f3f5f7',
         paper: '#fff',
      },
      common: {
         black: '#000',
         white: '#fff',
      },
      primary: {
         main: '#5624d0',
         light: '#000',
         dark: '#000',
         contrastText: '#fff',
      },
      secondary: {
         main: '#fff',
         light: '#42a5f5',
         dark: '#1565c0',
         contrastText: '#fff',
      },
      error: {
         main: '#d32f2f',
         light: '#ef5350',
         dark: '#c62828',
         contrastText: '#fff',
      },
      warning: {
         main: '#ed6c02',
         light: '#ff9800',
         dark: '#e65100',
         contrastText: '#fff',
      },
      info: {
         main: '#ed6c02',
         light: '#ff9800',
         dark: '#e65100',
         contrastText: '#fff',
      },
      success: {
         main: '#ed6c02',
         light: '#ff9800',
         dark: '#e65100',
         contrastText: '#fff',
      },
      text: {
         primary: '#2d2f31',
         secondary: '#6a6f73',
         disabled: 'rgba(0, 0, 0, 0.38)',
      },
      action: {
         active: 'rgba(0, 0, 0, 0.54)',
         hover: 'rgba(0, 0, 0, 0.04)',
         hoverOpacity: 0.04,
         selected: 'rgba(0, 0, 0, 0.08)',
         selectedOpacity: 0.08,
         disabled: 'rgba(0, 0, 0, 0.26)',
         disabledBackground: 'rgba(0, 0, 0, 0.12)',
         disabledOpacity: 0.38,
         focus: 'rgba(0, 0, 0, 0.12)',
         focusOpacity: 0.12,
         activatedOpacity: 0.12,
      },
   },
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
               borderRadius: '5px',
            },
         },
      },
      MuiTextField: {
         defaultProps: {
            variant: 'outlined',
            size: 'medium',
         },
      },
      MuiSelect: {
         defaultProps: {
            variant: 'outlined',
            size: 'medium',
         },
      },
   },
   ...base,
});

export default theme;
