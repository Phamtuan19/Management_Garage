import ROUTE_PATH from '@App/configs/router-path';
import PAGE_ACTION from '@App/configs/page-action';
import { Outlet, RouteObject } from 'react-router-dom';
import MODULE_PAGE from '@App/configs/module-page';

import PermissionAccessRoute from '../components/PermissionAccessRoute';
import Loadable from '../components/loadable';

const Repairorder = Loadable('Repairorder');

const repairorderRoute: RouteObject = {
   path: ROUTE_PATH.REPAIR_ORDERS,
   element: <Outlet />,
   children: [
      {
         index: true,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.REPAIR_ORDERS} action={PAGE_ACTION.VIEW_ALL} type="route">
               <Repairorder />
            </PermissionAccessRoute>
         ),
      },
   ],
};

export default repairorderRoute;
