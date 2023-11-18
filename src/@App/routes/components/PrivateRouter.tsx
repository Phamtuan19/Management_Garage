import { useAuth } from '@App/redux/slices/auth.slice';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRouter(props: { children?: React.ReactNode }) {
   const {
      auth: { isAuhthentication, isInitialized, userPermission },
   } = useAuth();

   if (!isAuhthentication && isInitialized && !userPermission) {
      return <Navigate to="/sign-in" replace />;
   }

   return props.children || <Outlet />;
}
