import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import Loadable from './components/loadable';
import routePath from '@App/configs/routerPath';
import PrivateRouter from './components/PrivateRouter';
import PublicRouter from './components/PublicRoute';
import Layout from '@App/component/Layout';
import Doashboard from '@App/pages/Doashboard';

const Login = Loadable(lazy(() => import('@App/pages/auth/Login')));

const PremissionPage = {
   home: [],
};

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
            element: <Doashboard />,
         },
         {
            path: 'personnels',
            element: <Doashboard />,
         },
         {
            path: 'personnels/create',
            element: <h1>Trang thêm người dùng</h1>,
         },
      ],
   },

   /**
    * Route Public
    * Route sign-in
    * Route
    */
   {
      path: routePath.login.path,
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
