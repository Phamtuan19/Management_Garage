import ROUTE_PATH from '@App/configs/router-path';
import PAGE_ACTION from '@App/configs/page-action';
import { Outlet, RouteObject } from 'react-router-dom';
import MODULE_PAGE from '@App/configs/module-page';

import PermissionAccessRoute from '../components/PermissionAccessRoute';
import Loadable from '../components/loadable';

const UserCreate = Loadable('User/UserCreate');
const User = Loadable('Users');

const userRoute: RouteObject = {
   path: ROUTE_PATH.CUSTOMERS,
   element: <Outlet />,
   children: [
      {
         index: true,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.CUSTOMERS} action={PAGE_ACTION.VIEW_ALL} type="route">
               <User />
            </PermissionAccessRoute>
         ),
      },
      {
         path: ROUTE_PATH.CUSTOMERS + ROUTE_PATH.CREATE,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.CUSTOMERS} action={PAGE_ACTION.CREATE} type="route">
               <UserCreate />
            </PermissionAccessRoute>
         ),
      },
   ],
};

export default userRoute;
