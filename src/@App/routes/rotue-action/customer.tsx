import ROUTE_PATH from '@App/configs/router-path';
import PAGE_ACTION from '@App/configs/page-action';
import { Outlet, RouteObject } from 'react-router-dom';
// eslint-disable-next-line import/order
import MODULE_PAGE from '@App/configs/module-page';

// eslint-disable-next-line import/order
import PermissionAccessRoute from '../components/PermissionAccessRoute';
import Loadable from '../components/loadable';

const Customer = Loadable('Customer');
const CustomerCreate = Loadable('Customer/CustomerCreate');
const CustomerUpdate = Loadable('Customer/CustomerUpdate');

const customerRoute: RouteObject = {
   path: ROUTE_PATH.CUSTOMERS,
   element: <Outlet />,
   children: [
      {
         index: true,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.CUSTOMERS} action={PAGE_ACTION.VIEW_ALL} type="route">
               <Customer />
            </PermissionAccessRoute>
         ),
      },
      {
         path: ROUTE_PATH.CUSTOMERS + ROUTE_PATH.CREATE,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.CUSTOMERS} action={PAGE_ACTION.CREATE} type="route">
               <CustomerCreate />
            </PermissionAccessRoute>
         ),
      },
      {
         path: ROUTE_PATH.CUSTOMERS + ROUTE_PATH.UPDATE,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.CUSTOMERS} action={PAGE_ACTION.UPDATE} type="route">
               <CustomerUpdate />
            </PermissionAccessRoute>
         ),
      },
   ],
};

export default customerRoute;
