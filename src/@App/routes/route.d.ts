import { ModulePagePropsType } from '@App/configs/module-page';
import { PageActionPropsType } from '@App/configs/page-action';

interface PermissionAccessType {
   action: PageActionPropsType;
   module: ModulePagePropsType;
   path?: string;
   type: 'route' | 'component';
   children: React.ReactNode;
   fallback?: React.ReactNode;
}
