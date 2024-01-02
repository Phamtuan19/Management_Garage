import Loadable from '../components/loadable';
import ROUTE_PATH from '@App/configs/router-path';
import PAGE_ACTION from '@App/configs/page-action';
import { Outlet, RouteObject } from 'react-router-dom';
import PermissionAccessRoute from '../components/PermissionAccessRoute';
import MODULE_PAGE from '@App/configs/module-page';

const UserCreate = Loadable('User/UserCreate');
const User = Loadable('Users');

const userRoute: RouteObject = {
   path: ROUTE_PATH.USER,
   element: <Outlet />,
   children: [
      {
         index: true,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.USER} action={PAGE_ACTION.VIEW} type="route">
               <User />
            </PermissionAccessRoute>
         ),
      },
      {
         path: ROUTE_PATH.USER + ROUTE_PATH.CREATE,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.USER} action={PAGE_ACTION.CREATE} type="route">
               <UserCreate />
            </PermissionAccessRoute>
         ),
      },
   ],
};

export default userRoute;
