import { useAuth } from '@App/redux/slices/auth.slice';
import React, { useMemo } from 'react';
import { PermissionAccessType } from '../route';

/**
 * @param module - The component's module is loaded.
 * @param action - The component's action has been loaded.
 * @param type - Type of the component: "route" or "page".
 * @param fallback - The fallback content to display when permission is not granted.
 */

const PermissionAccessRoute = ({
   children,
   module,
   action,
   type,
   fallback = <h1>Bạn không có quyền truy cập</h1>,
}: PermissionAccessType): React.ReactNode => {
   const { userPermission } = useAuth();

   const hasPermissionAndOperation = useMemo(() => {
      const hasModules = Object.keys(userPermission || []);
      const moduleActions = userPermission![module!];

      if (type === 'menu') {
         if (!hasModules.includes(module!)) return false;

         if (moduleActions && moduleActions.length === 0) return false;

         return true;
      }

      if (hasModules.includes(module!)) {
         if (moduleActions && moduleActions.includes(action!)) {
            return true;
         }
      }

      return false;
   }, [userPermission, module, action, type, children]);

   if (type === 'route') {
      if (!hasPermissionAndOperation) return fallback;
   }

   return hasPermissionAndOperation ? children : null;
};

export default PermissionAccessRoute;
