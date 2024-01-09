import { ModulePagePropsType } from './module-page';
import { PageActionPropsType } from './page-action';

interface MenuConfigItem {
   id: number;
   title: string;
   link: string;
   icon: React.FC<{
      sx?: Record<string, unknown>;
   }>;
   module?: ModulePagePropsType;
   action?: PageActionPropsType;
   aceptPermission?: boolean;
   children?: Array<MenuConfigChildren>;
}

interface MenuConfigChildren {
   id: number;
   title: string;
   link: string;
   module: ModulePagePropsType;
   action: PageActionPropsType;
}
