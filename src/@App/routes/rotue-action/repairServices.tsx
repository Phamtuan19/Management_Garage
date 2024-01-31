import ROUTE_PATH from '@App/configs/router-path';
import { Outlet, RouteObject } from 'react-router-dom';
import MODULE_PAGE from '@App/configs/module-page';
import PAGE_ACTION from '@App/configs/page-action';

import PermissionAccessRoute from '../components/PermissionAccessRoute';
import Loadable from '../components/loadable';

const RepairServices = Loadable('RepairServices');

const repairServicesRoute: RouteObject = {
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
   ],
};
export default repairServicesRoute;
