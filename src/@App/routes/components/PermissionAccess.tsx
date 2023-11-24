import { useAuth } from '@App/redux/slices/auth.slice';
import React, { useMemo } from 'react';
import { PermissionAccessType } from '../route';

/**
 * @param module - The component's module is loaded.
 * @param action - The component's action has been loaded.
 * @param type - Type of the component: "route" or "page".
 * @param fallback - The fallback content to display when permission is not granted.
 */
const PermissionAccess = ({
   children,
   module,
   action,
   type,
   fallback = <h1>Bạn không có quyền truy cập</h1>,
}: PermissionAccessType): React.ReactNode => {
   const { userPermission } = useAuth();

   const hasPermissionAndOperation = useMemo(() => {
      const hasModules = Object.keys(userPermission || {});

      if (hasModules.includes(module!)) {
         const moduleActions = userPermission![module!];

         if (type === 'menu') {
            return true;
         }

         if (moduleActions && moduleActions.includes(action!)) {
            return children;
         }
      }

      return false;
   }, [userPermission, module, action, type, children]);

   return hasPermissionAndOperation || (type === 'route' && fallback);
};

export default PermissionAccess;
