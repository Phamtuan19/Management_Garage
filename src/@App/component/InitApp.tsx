import { useAuth } from '@App/redux/slices/auth.slice';
import { useSetting } from '@App/redux/slices/setting.slice';
import React, { useEffect } from 'react';

function InitApp(props: { children: React.ReactNode }) {
   const { authGetUser } = useAuth();
   const { getSettingInitApp } = useSetting();

   useEffect(() => {
      authGetUser();
      getSettingInitApp();
   }, []);

   return props.children;
}

export default InitApp;
