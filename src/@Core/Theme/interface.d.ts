/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThemeOptions } from '@mui/material/styles';

interface BaseType extends ThemeOptions {
   [x: string]: any;
   base: {
      pagination: string;
      background: {
         default: string;
         [x: string]: any;
      };
      color: {
         [x: string]: any;
      };
      text: {
         main: string;
         primary: string;
         [x: string]: any;
      };
      sidebar: {
         backgroundColor: string;
         width: number;
         [x: string]: any;
      };
      header: {
         height: number;
         boxShadow: string;
         [x: string]: any;
      };
      [x: string]: any;
   };
}
