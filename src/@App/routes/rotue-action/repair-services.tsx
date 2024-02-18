import ROUTE_PATH from '@App/configs/router-path';
import PAGE_ACTION from '@App/configs/page-action';
import { Outlet, RouteObject } from 'react-router-dom';
import MODULE_PAGE from '@App/configs/module-page';

import PermissionAccessRoute from '../components/PermissionAccessRoute';
import Loadable from '../components/loadable';

const RepairServices = Loadable('RepairServices');
const RepairServiceCreate = Loadable('RepairServices/RepairServiceCreate');
const RepairServiceUpdate = Loadable('RepairServices/RepairServiceUpdate');
const RepairServiceDetails = Loadable('RepairServices/RepairServiceDetails');

const repairServicesRoutes: RouteObject = {
   path: ROUTE_PATH.REPAIR_SERVICES,
   element: <Outlet />,
   children: [
      {
         index: true,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.REPAIR_SERVICES} action={PAGE_ACTION.VIEW_ALL} type="route">
               <RepairServices />
            </PermissionAccessRoute>
         ),
      },
      {
         path: ROUTE_PATH.REPAIR_SERVICES + '/' + ROUTE_PATH.CREATE,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.REPAIR_SERVICES} action={PAGE_ACTION.CREATE} type="route">
               <RepairServiceCreate />
            </PermissionAccessRoute>
         ),
      },
      {
         path: ROUTE_PATH.REPAIR_SERVICES + '/' + ROUTE_PATH.UPDATE,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.REPAIR_SERVICES} action={PAGE_ACTION.UPDATE} type="route">
               <RepairServiceUpdate />
            </PermissionAccessRoute>
         ),
      },
      {
         path: ROUTE_PATH.REPAIR_SERVICES + '/' + ROUTE_PATH.DETAILS,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.REPAIR_SERVICES} action={PAGE_ACTION.VIEW_ONE} type="route">
               <RepairServiceDetails />
            </PermissionAccessRoute>
         ),
      },
   ],
};

export default repairServicesRoutes;
