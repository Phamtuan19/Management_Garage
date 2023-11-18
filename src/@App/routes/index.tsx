import { RouteObject, useRoutes } from 'react-router-dom';
import Loadable from './components/loadable';
import PrivateRouter from './components/PrivateRouter';
import PublicRouter from './components/PublicRoute';
import Layout from '@App/component/Layout';
import ListUserRoute from './components/listUser';
import CreateUserRouter from './components/createUserRouter';
import MODULE_PAGE from '@App/configs/module-page';
import PAGE_ACTION from '@App/configs/page-action';
import ROUTE_PATH from '@App/configs/router-path';
import personnelRoute from './rotue-action/personnels';
import PermissionAccess from './components/PermissionAccess';

const SignIn = Loadable('auth/SignIn');
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
               <PermissionAccess module={MODULE_PAGE.DOASHBOARD} action={PAGE_ACTION.VIEW} type="route">
                  <Doashboard />
               </PermissionAccess>
            ),
         },
         personnelRoute,
      ],
   },
   {
      path: '/personnels',
      element: (

         <Layout />

      ),
      children: [
         {
            index: true,
            element: <ListUserRoute />,
         },
      ],
   },
   {
      path: '/personnels/create',
      element: (

         <Layout />

      ),
      children: [
         {
            index: true,
            element: <CreateUserRouter />,
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

export default function Routers() {
   return useRoutes(routes);
}
