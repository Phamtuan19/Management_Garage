import ROUTE_PATH from '@App/configs/router-path';
import { Outlet, RouteObject } from 'react-router-dom';
import MODULE_PAGE from '@App/configs/module-page';
import PAGE_ACTION from '@App/configs/page-action';

import PermissionAccessRoute from '../components/PermissionAccessRoute';
import Loadable from '../components/loadable';

const Deliverys = Loadable('Deliverys');
const DeliveryDetail = Loadable('Deliverys/DeliveryDetail');

const deliverysRoute: RouteObject = {
   path: ROUTE_PATH.DELIVERY_NOTES,
   element: <Outlet />,
   children: [
      {
         index: true,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.DELIVERY} action={PAGE_ACTION.VIEW_ALL} type="route">
               <Deliverys />
            </PermissionAccessRoute>
         ),
      },
      {
         path: ROUTE_PATH.DELIVERY_NOTES + ROUTE_PATH.DETAILS,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.DELIVERY} action={PAGE_ACTION.UPDATE} type="route">
               <DeliveryDetail />
            </PermissionAccessRoute>
         ),
      },
   ],
};
export default deliverysRoute;
