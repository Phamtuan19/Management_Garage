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

import COLOR from '../color';

const palette = {
   background: {
      default: '#F9F8FA',
      paper: COLOR.white,
   },
   common: {
      black: COLOR.black,
      white: COLOR.white,
   },
   // primary: {
   //    main: COLOR.main,
   //    light: COLOR.black,
   //    dark: COLOR.dark,
   //    contrastText: COLOR.white,
   // },

   // secondary: {
   //    main: '#6c757d',
   //    light: '#6c757d',
   //    dark: '#6c757d',
   //    contrastText: '#FFFFFF',
   // },
   // error: {
   //    main: '#F00',
   //    light: '#F00',
   //    dark: '#F00',
   //    contrastText: '#FFFFFF',
   // },
   // warning: {
   //    main: '#ed6c02',
   //    light: '#ff9800',
   //    dark: '#e65100',
   //    contrastText: '#FFFFFF',
   // },
   // info: {
   //    main: '#ed6c02',
   //    light: '#ff9800',
   //    dark: '#e65100',
   //    contrastText: '#FFFFFF',
   // },
   // success: {
   //    main: '#ed6c02',
   //    light: '#ff9800',
   //    dark: '#e65100',
   //    contrastText: '#FFFFFF',
   // },
   // text: {
   //    primary: '#2d2f31',
   //    secondary: '#6a6f73',
   //    disabled: 'rgba(0, 0, 0, 0.38)',
   // },
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
};

export default palette;
