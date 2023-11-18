import { useAuth } from '@App/redux/slices/auth.slice';
import React, { useMemo } from 'react';
import { Outlet } from 'react-router-dom';

/**
 * @param module - The component's module is loaded.
 * @param action - The component's action has been loaded.
 * @param fullScreen - Whether to show a full-screen loading splash or a small loading spinner.
 * 
 */

const RoutePermission = ({
   children,
   module,
   action,
   fallback = <h1>Bạn không có quyền truy cập</h1>,
}: RoutePermission): React.ReactNode => {
   const { userPermission } = useAuth();

   const hasPermissionAndOperation = useMemo(() => {
      const hasModules = Object.keys(userPermission!);

      const moduleAccess = hasModules.includes(module);

      if (moduleAccess) {
         return true;
      }

      return false;
   }, [userPermission, module, action]);

   if (hasPermissionAndOperation) {
      return children || <Outlet />;
   }

   return fallback;
};

export default RoutePermission;
