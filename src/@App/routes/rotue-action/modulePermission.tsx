import Loadable from '../components/loadable';
import ROUTE_PATH from '@App/configs/router-path';
import MODULE_PAGE from '@App/configs/module-page';
import PAGE_ACTION from '@App/configs/page-action';
import { Outlet, RouteObject } from 'react-router-dom';
import PermissionAccess from '../components/PermissionAccess';

const Permission = Loadable('ModulePermission');

const modulePermissionRoute: RouteObject = {
   path: ROUTE_PATH.PERMISSIONS,
   element: <Outlet />,
   children: [
      {
         index: true,
         element: (
            <PermissionAccess module={MODULE_PAGE.PERMISSIONS} action={PAGE_ACTION.VIEW} type="route">
               <Permission />
            </PermissionAccess>
         ),
      },
   ],
};

export default modulePermissionRoute;
