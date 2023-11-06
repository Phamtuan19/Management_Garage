import { lazy } from 'react';
import { Outlet, useRoutes } from 'react-router-dom';
import Loadable from './components/loadable';
import routePath from '@App/configs/routerPath';
import PrivateRouter from './components/PrivateRouter';
import PublicRouter from './components/PublicRoute';
import Layout from '@App/component/Layout';

const Login = Loadable(lazy(() => import('@App/pages/auth/Login')));
const Register = Loadable(lazy(() => import('@App/pages/auth/Register')));

const routes = [
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
            element: <h1>Trang home</h1>,
         },
      ],
   },

   /**
    * Route Public
    * Route sign-in
    * Route
    */
   {
      path: routePath.account.login,
      element: (
         <PublicRouter>
            <Login />
         </PublicRouter>
      ),
   },
   {
      path: routePath.account.login,
      element: (
         <PublicRouter>
            <Register />
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
