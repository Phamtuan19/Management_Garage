import ROUTE_PATH from '@App/configs/router-path';
import { Outlet, RouteObject } from 'react-router-dom';
import MODULE_PAGE from '@App/configs/module-page';
import PAGE_ACTION from '@App/configs/page-action';

import PermissionAccessRoute from '../components/PermissionAccessRoute';
import Loadable from '../components/loadable';

const Distributor = Loadable('Distributor');
const DistributorCreate = Loadable('Distributor/DistributorCreate');
const DistributorUpdate = Loadable('Distributor/DistributorUpdate');
const DistributorDetails = Loadable('Distributor/DistributorDetails');

const distributorRoute: RouteObject = {
   path: ROUTE_PATH.DISTRIBUTORS,
   element: <Outlet />,
   children: [
      {
         index: true,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.DISTRIBUTORS} action={PAGE_ACTION.VIEW_ALL} type="route">
               <Distributor />
            </PermissionAccessRoute>
         ),
      },
      {
         path: ROUTE_PATH.DISTRIBUTORS + ROUTE_PATH.CREATE,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.DISTRIBUTORS} action={PAGE_ACTION.CREATE} type="route">
               <DistributorCreate />
            </PermissionAccessRoute>
         ),
      },
      {
         path: ROUTE_PATH.DISTRIBUTORS + ROUTE_PATH.UPDATE,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.DISTRIBUTORS} action={PAGE_ACTION.UPDATE} type="route">
               <DistributorUpdate />
            </PermissionAccessRoute>
         ),
      },
      {
         path: ROUTE_PATH.DISTRIBUTORS + ROUTE_PATH.DETAILS,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.DISTRIBUTORS} action={PAGE_ACTION.VIEW_ONE} type="route">
               <DistributorDetails />
            </PermissionAccessRoute>
         ),
      },
   ],
};

export default distributorRoute;
