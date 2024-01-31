import Layout from '@App/component/Layout';
import ROUTE_PATH from '@App/configs/router-path';
import PAGE_ACTION from '@App/configs/page-action';
import MODULE_PAGE from '@App/configs/module-page';
import { RouteObject, useRoutes } from 'react-router-dom';

import PublicRouter from './components/PublicRoute';
import PrivateRouter from './components/PrivateRouter';
import Loadable from './components/loadable';
import PermissionAccessRoute from './components/PermissionAccessRoute';
import personnelRoute from './rotue-action/personnels';
import distributorRoute from './rotue-action/distributor';
import roleRoute from './rotue-action/role';
import materialscatalogRoute from './rotue-action/materialCatalogRoute';
import suppliesRoute from './rotue-action/supplies';
import repairServicesRoute from './rotue-action/repairServices';
import customerRoute from './rotue-action/customer';
import carsRoute from './rotue-action/materialCatalogRoute';

const SignIn = Loadable('auth/SignIn');
const Doashboard = Loadable('Doashboard');

const routes = (): RouteObject[] => {
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
                  <PermissionAccessRoute module={MODULE_PAGE.DOASHBOARD} action={PAGE_ACTION.VIEW_ALL} type="route">
                     <Doashboard />
                  </PermissionAccessRoute>
               ),
            },
            personnelRoute,
            roleRoute,
            distributorRoute,
            suppliesRoute,
            materialscatalogRoute,
            repairServicesRoute,
            customerRoute,
            carsRoute,
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
