import { lazy } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import Loadable from './components/loadable';
import PrivateRouter from './components/PrivateRouter';
import PublicRouter from './components/PublicRoute';
import Layout from '@App/component/Layout';
import RoutePermission from './components/RoutePermission';
import MODULE_PAGE from '@App/configs/module-page';
import PAGE_ACTION from '@App/configs/page-action';
import ROUTE_PATH from '@App/configs/router-path';

const Login = Loadable('auth/Login/');
const Doashboard = Loadable('Doashboard');

const routes: RouteObject[] = [
   /**
    * Route page admin Pivate
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
               <RoutePermission module={MODULE_PAGE.DOASHBOARD} action={PAGE_ACTION.view} path={ROUTE_PATH.DOASHBOARD}>
                  <Doashboard />
               </RoutePermission>
            ),
         },
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
            <Login />
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

export default function Routers() {
   return useRoutes(routes);
}
