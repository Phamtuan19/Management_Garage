/* eslint-disable react-hooks/exhaustive-deps */

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
   type = 'component',
   fallback = <h1>Bạn không có quyền truy cập</h1>,
}: PermissionAccessType): React.ReactNode => {
   const { userPermission } = useAuth();

   const hasPermissionAndOperation = useMemo(() => {
      if (userPermission === '*') {
         return true;
      }

      const hasModules = Object.keys(userPermission || []);

      const moduleActions = userPermission![module];

      if (moduleActions === '*') {
         return true;
      }

      if (hasModules.includes(module)) {
         if (moduleActions && moduleActions.includes(action)) {
            return true;
         }
      }

      return false;
   }, [module, action, type]);

   if (type === 'route') {
      if (!hasPermissionAndOperation) return fallback;
   }

   return hasPermissionAndOperation ? children : null;
};

export default React.memo(PermissionAccessRoute);
