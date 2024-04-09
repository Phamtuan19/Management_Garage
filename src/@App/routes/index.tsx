import Layout from '@App/component/Layout';
import ROUTE_PATH from '@App/configs/router-path';
import { RouteObject, useRoutes } from 'react-router-dom';
import PageNotFound from '@App/pages/error/PageNotFound';

import PublicRouter from './components/PublicRoute';
import PrivateRouter from './components/PrivateRouter';
import Loadable from './components/loadable';
import carsRoute from './rotue-action/cars';
import customerRoute from './rotue-action/customer';
import distributorRoute from './rotue-action/distributor';
import materialsCatalogRoute from './rotue-action/materials-catalog';
import personnelRoute from './rotue-action/personnels';
import roleRoute from './rotue-action/role';
import suppliesInvoicesRoute from './rotue-action/supplies-invoices';
import suppliesRoute from './rotue-action/supplies';
import repairServicesRoutes from './rotue-action/repair-services';
import profileRoute from './rotue-action/profile';
import repairInvoiceRoute from './rotue-action/repair-invoice';
import deliverysRoute from './rotue-action/deliverys';
import dashboardRoute from './rotue-action/dashboard';
// import brandCarsRoute from './rotue-action/brand-cars';

const SignIn = Loadable('auth/SignIn');

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
            carsRoute,
            customerRoute,
            distributorRoute,
            materialsCatalogRoute,
            personnelRoute,
            roleRoute,
            suppliesInvoicesRoute,
            suppliesRoute,
            repairServicesRoutes,
            profileRoute,
            repairInvoiceRoute,
            deliverysRoute,
            // brandCarsRoute,
            dashboardRoute,
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
         element: <PageNotFound />,
      },
   ];
};

export default function Routers() {
   return useRoutes(routes());
}
