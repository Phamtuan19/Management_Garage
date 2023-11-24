import { ModulePagePropsType } from './module-page';
import { PageActionPropsType } from './page-action';

interface MenuConfigItem {
   id: number;
   title: string;
   link: string;
   icon?: any;
   module?: ModulePagePropsType;
   action?: PageActionPropsType;
   aceptPermission?: boolean;
   children?: MenuConfigItem[];
}
