import { ModulePagePropsType } from '@App/configs/module-page';
import { PageActionPropsType } from '@App/configs/page-action';
import { RoutePathPropsType } from '@App/configs/router-path';

interface PermissionAccessType {
   action?: NonNullable<PageActionPropsType>;
   module?: NonNullable<ModulePagePropsType>;
   path?: NonNullable<RoutePathPropsType>;
   isPage?: boolean;
   children: React.ReactNode;
   fallback?: React.ReactNode;
}
