import { lazy } from 'react';
import { Outlet, useRoutes } from 'react-router-dom';
import Loadable from './components/loadable';
import CommonLayout from '@App/component/Layout/CommonLayout';
import commonRoutes from './common';
import PrivateRouter from './components/PrivateRouter';
import adminRoute from './admin';
import PublicRouter from './components/PublicRoute';
import routePath from '@App/configs/routerPath';

const Home = Loadable(lazy(() => import('@App/pages/common/Home')));
const Login = Loadable(lazy(() => import('@App/pages/auth/Login')));
const Register = Loadable(lazy(() => import('@App/pages/auth/Register')));

const routes = [
   // Trang người dùng
   {
      path: '/',
      element: <CommonLayout />,
      children: [
         {
            index: true,
            element: <Home />,
         },
         commonRoutes,
      ],
   },

   // Trang Admin
   {
      path: '/admin',
      element: (
         <PrivateRouter>
            <Outlet />
         </PrivateRouter>
      ),
      children: [
         {
            index: true,
            element: <h1>Trang admin </h1>,
         },
         adminRoute,
      ],
   },

   //acount Login + register
   {
      path: routePath.account.path,
      element: <PublicRouter />,
      children: [
         {
            path: routePath.account.login,
            element: <Login />,
         },
         {
            path: routePath.account.register,
            element: <Register />,
         },
      ],
   },

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
