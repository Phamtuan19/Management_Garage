/* eslint-disable react-hooks/exhaustive-deps */
import { useAuth } from '@App/redux/slices/auth.slice';
import React, { useEffect } from 'react';

function InitApp(props: { children: React.ReactNode }) {
   const { authGetUser } = useAuth();

   useEffect(() => {
      authGetUser();
   }, []);

   return props.children;
}

export default InitApp;
