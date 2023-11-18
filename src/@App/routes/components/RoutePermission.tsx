import { useAuth } from '@App/redux/slices/auth.slice';
import React from 'react';
import { Outlet } from 'react-router-dom';

interface RoutePermission {
   children: React.ReactNode;
   role?: string | string[];
}

const test = ['view', 'show', 'edit', 'create'];

const RoutePermission = ({ children, role }: RoutePermission) => {
   const {
      auth: { userPermission },
   } = useAuth();

   console.log(userPermission);

   return <div>{children || <Outlet />}</div>;
};

export default RoutePermission;
