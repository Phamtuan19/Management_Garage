import { RouteObject, useRoutes } from 'react-router-dom';
import Loadable from './components/loadable';
import PrivateRouter from './components/PrivateRouter';
import PublicRouter from './components/PublicRoute';
import Layout from '@App/component/Layout';
import PAGE_ACTION from '@App/configs/page-action';
import ROUTE_PATH from '@App/configs/router-path';
import PermissionAccess from './components/PermissionAccess';

import personnelRoute from './rotue-action/personnels';
import modulePermissionRoute from './rotue-action/modulePermission';
import { useSetting } from '@App/redux/slices/setting.slice';

const SignIn = Loadable('auth/SignIn');
const Doashboard = Loadable('Doashboard');

const routes = (): RouteObject[] => {
   const { permissions } = useSetting();

   return [
      /**
       * Route page admin Private
       */
      {
         path: '/',
         element: (
            <PrivateRouter>
               <Layout />
            </PrivateRouter>
         ),
         children: [
            {
               index: true,
               element: (
                  <PermissionAccess module={permissions.DOASHBOARD} action={PAGE_ACTION.VIEW} type="route">
                     <Doashboard />
                  </PermissionAccess>
               ),
            },
            personnelRoute(),
            modulePermissionRoute(),
         ],
      },

      /**
       * Route Public
       * Route sign-in
       * Route
       */
      {
         path: ROUTE_PATH.SIGN_IN,
         element: (
            <PublicRouter>
               <SignIn />
            </PublicRouter>
         ),
      },

      /**
       * Nod found route 404
       */

      {
         path: '*',
         element: (
            <h1>
               404 <br />
               Trang web không tồn tại
            </h1>
         ),
      },
   ];
};

export default function Routers() {
   return useRoutes(routes());
}
