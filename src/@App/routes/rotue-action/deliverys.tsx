import ROUTE_PATH from '@App/configs/router-path';
import { Outlet, RouteObject } from 'react-router-dom';
import MODULE_PAGE from '@App/configs/module-page';
import PAGE_ACTION from '@App/configs/page-action';

import PermissionAccessRoute from '../components/PermissionAccessRoute';
import Loadable from '../components/loadable';

const Deliverys = Loadable('Deliverys');

const deliverysRoute: RouteObject = {
   path: ROUTE_PATH.DELIVERY_NOTES,
   element: <Outlet />,
   children: [
      {
         index: true,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.CARS} action={PAGE_ACTION.VIEW_ALL} type="route">
               <Deliverys />
            </PermissionAccessRoute>
         ),
      },
   ],
};
export default deliverysRoute;
