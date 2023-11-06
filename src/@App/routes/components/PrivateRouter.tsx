import ROLE from '@App/configs/role';
import { useAuth } from '@App/redux/slices/auth.slice';
import { usePagination } from '@mui/lab';
import React from 'react';
import { Navigate, Outlet, Route } from 'react-router-dom';

export default function PrivateRouter(props: { children?: React.ReactNode }) {
   const { auth } = useAuth();

   if (!auth.isAuhthentication && auth.isInitialized && !auth.userPermission) {
      return <Navigate to="/sign-in" replace />;
   }

   return props.children || <Outlet />;
}
