import ROUTE_PATH from '@App/configs/router-path';
import PAGE_ACTION from '@App/configs/page-action';
import { Outlet, RouteObject } from 'react-router-dom';
import MODULE_PAGE from '@App/configs/module-page';

import PermissionAccessRoute from '../components/PermissionAccessRoute';
import Loadable from '../components/loadable';

const Supplies = Loadable('Supplies');
const SuppliesCreate = Loadable('Supplies/SuppliesCreate');
const SuppliesUpdate = Loadable('Supplies/SuppliesUpdate');
const SuppliesDetails = Loadable('Supplies/SuppliesDetails');

const suppliesRoute: RouteObject = {
   path: ROUTE_PATH.SUPPLIES,
   element: <Outlet />,
   children: [
      {
         index: true,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.SUPPLIES} action={PAGE_ACTION.VIEW_ALL} type="route">
               <Supplies />
            </PermissionAccessRoute>
         ),
      },
      {
         path: ROUTE_PATH.SUPPLIES + ROUTE_PATH.CREATE,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.SUPPLIES} action={PAGE_ACTION.CREATE} type="route">
               <SuppliesCreate />
            </PermissionAccessRoute>
         ),
      },
      {
         path: ROUTE_PATH.SUPPLIES + ROUTE_PATH.UPDATE,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.SUPPLIES} action={PAGE_ACTION.UPDATE} type="route">
               <SuppliesUpdate />
            </PermissionAccessRoute>
         ),
      },
      {
         path: ROUTE_PATH.SUPPLIES + ROUTE_PATH.DETAILS,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.SUPPLIES} action={PAGE_ACTION.VIEW_ONE} type="route">
               <SuppliesDetails />
            </PermissionAccessRoute>
         ),
      },
   ],
};

export default suppliesRoute;
