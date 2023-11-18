import { useAuth } from '@App/redux/slices/auth.slice';
import React, { useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import { PermissionAccessType } from '../route';

/**
 * @param module - The component's module is loaded.
 * @param action - The component's action has been loaded.
 * @param fullScreen - Whether to show a full-screen loading splash or a small loading spinner.
 *
 */

const PermissionAccess = ({
   children,
   module,
   action,
   isMenu = false,
   fallback = <h1>Bạn không có quyền truy cập</h1>,
}: PermissionAccessType): React.ReactNode => {
   const { userPermission } = useAuth();

   const hasPermissionAndOperation = useMemo(() => {
      if (userPermission) {
         const hasModules = Object.keys(userPermission!);

         const moduleAccess = hasModules.includes(module);

         if (moduleAccess && isMenu) {
            const hasAction = userPermission[module!]?.includes(action);

            if (hasAction) return true;

            return false;
         }

         if (moduleAccess) return true;

         return false;
      }
   }, [userPermission, module, action, isMenu]);

   if (hasPermissionAndOperation) {
      return children || <Outlet />;
   }

   return !isMenu && fallback;
};

export default PermissionAccess;
