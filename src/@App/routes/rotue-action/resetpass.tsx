/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import ROUTE_PATH from '@App/configs/router-path';
import PAGE_ACTION from '@App/configs/page-action';
import { Outlet, RouteObject } from 'react-router-dom';
import MODULE_PAGE from '@App/configs/module-page';
import ResetPassword from '@App/pages/auth/SignIn/ResetPassword';

import PermissionAccessRoute from '../components/PermissionAccessRoute';
// import Loadable from '../components/loadable';

// const ResetPassword = Loadable('ResetPassword');

const resetpassRoute: RouteObject = {
   path: ROUTE_PATH.RESET_PASSWORD,
   element: <Outlet />,
   children: [
      {
         index: true,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.RESET_PASSWORD} action={PAGE_ACTION.VIEW_ALL} type="route">
               <ResetPassword />
            </PermissionAccessRoute>
         ),
      },
   ],
};

export default resetpassRoute;
