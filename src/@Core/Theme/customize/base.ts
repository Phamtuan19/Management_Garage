import { BaseType } from '../interface';

const base: BaseType = {
   base: {
      pagination: '#f3f5f7',
      background: {
         default: '#F9F8FA',
         white: '#FFFFFF',
      },
      color: {
         text: '#111111',
         contrastText: '#FFFFFF',
      },
      text: {
         main: '#343a4d',
         primary: '#1976d2',

         white: '#FFFFFF',
         black: '#111111',
         gray1: '#DADADA',
         gray2: '#555555',
         error: '#FF0000',
         bgLight: '#ffffff1a',
      },
      sidebar: {
         backgroundColor: '#fff',
         width: 238,
         zIndex: 99,
         boxShadow: '0 0 28px 0 rgba(82,63,105,.08)',
      },
      header: {
         height: 48,
         backgroundColor: '#FFFFFF',
         zIndex: 999,
         boxShadow: '0 2px 4px rgba(0,0,0,.08), 0 4px 12px rgba(0,0,0,.08)',
      },
   },
};

export default base;
