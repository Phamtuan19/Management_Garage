import ROLE from '@App/configs/role';
import { useAuth } from '@App/redux/slices/auth.slice';
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRouter(props: { children: React.ReactNode }) {
   const { auth } = useAuth();

   if (!auth.isAuhthentication && auth.isInitialized && auth.userPermission === ROLE[1]) {
      return <Navigate to="/" replace />;
   }

   return props.children;
}
