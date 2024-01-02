import { PageActionPropsType } from '@App/configs/page-action';

interface PermissionAccessType {
   action: PageActionPropsType;
   module: string;
   path?: string;
   type: 'route' | 'component' | 'menu';
   aceptPermission?: boolean;
   children: React.ReactNode;
   fallback?: React.ReactNode;
}
