/* eslint-disable @typescript-eslint/no-explicit-any */
import { PageActionPropsType } from './page-action';

interface MenuConfigItem {
   id: number;
   title: string;
   link: string;
   icon?: any;
   module?: string;
   action?: PageActionPropsType;
   aceptPermission?: boolean;
   children?: MenuConfigItem[];
}
