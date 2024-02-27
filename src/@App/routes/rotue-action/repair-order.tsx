
import ROUTE_PATH from '@App/configs/router-path';
import PAGE_ACTION from '@App/configs/page-action';
import { Outlet, RouteObject } from 'react-router-dom';
import MODULE_PAGE from '@App/configs/module-page';

import PermissionAccessRoute from '../components/PermissionAccessRoute';
import Loadable from '../components/loadable';

const RepairOrder = Loadable('RepairOrder');
const RepairOrderDetails = Loadable('RepairOrder/RepairOrderDetails')
const RepairOrderCreate = Loadable('RepairOrder/RepairOrderCreate');

const repairorderRoute: RouteObject = {
   path: ROUTE_PATH.REPAIR_ORDERS,
   element: <Outlet />,
   children: [
      {
         index: true,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.REPAIR_ORDERS} action={PAGE_ACTION.VIEW_ALL} type="route">
               <RepairOrder />
            </PermissionAccessRoute>
         ),
      },
      {
         path: ROUTE_PATH.REPAIR_ORDERS + ROUTE_PATH.DETAILS,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.REPAIR_ORDERS} action={PAGE_ACTION.VIEW_ONE} type="route">
               <RepairOrderDetails />
            </PermissionAccessRoute>
         ),
      },
      {
         path: ROUTE_PATH.REPAIR_ORDERS + ROUTE_PATH.CREATE,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.REPAIR_ORDERS} action={PAGE_ACTION.CREATE} type="route">
               <RepairOrderCreate />
            </PermissionAccessRoute>
         ),
      },
   ],
};

export default repairorderRoute;
