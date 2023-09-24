import { ThemeOptions } from '@mui/material/styles';

export interface Base extends ThemeOptions {
   [x: string]: any;
   base: {
      pagination: string;
      background: {
         default: string;
      };
      text: {
         main: string;
         primary: string;
      };
      sidebar: {
         backgroundColor: string;
         width: number;
      };
      header: {
         height: number;
         boxShadow: string;
      };
      table: {
         [x: string]: any;
      };
      shadow: string[];
   };
}
