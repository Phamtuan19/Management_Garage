import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRouter(props: { children: React.ReactNode }) {
   //    const { isAuhthentication, isInitialized } = useAuth();
   //    if (!isAuhthentication && isInitialized) {
   //       return <Navigate to="/signin" replace />;
   //    }
   return props.children;
}
