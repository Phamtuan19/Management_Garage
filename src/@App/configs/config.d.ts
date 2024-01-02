import { PageActionPropsType } from './page-action';

interface MenuConfigItem {
   id: number;
   title: string;
   link: string;
   icon?: React.FC<{
      sx?: Record<string, unknown>;
   }>;
   module?: string;
   action?: PageActionPropsType;
   aceptPermission?: boolean;
   children?: MenuConfigItem[];
}
