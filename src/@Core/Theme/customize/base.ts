import { Base } from '../interface';
import COLOR from '../color';

const base: Base = {
   base: {
      pagination: '#fde428',
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
         primary: '#0b70db',
         // ...COLOR,
      },
      sidebar: {
         backgroundColor: '#fff',
         width: 238,
         zIndex: 99,
         boxShadow: '0 0 28px 0 rgba(82,63,105,.08)',
      },
      header: {
         height: 62,
         backgroundColor: '#FFFFFF',
         zIndex: 9999,
         boxShadow: '0 2px 4px rgba(0,0,0,.08), 0 4px 12px rgba(0,0,0,.08)',
      },
   },
};

export default base;
