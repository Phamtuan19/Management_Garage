import Loadable from '../components/loadable';
import ROUTE_PATH from '@App/configs/router-path';
import PAGE_ACTION from '@App/configs/page-action';
import { Outlet, RouteObject } from 'react-router-dom';
import PermissionAccess from '../components/PermissionAccess';
import { useSetting } from '@App/redux/slices/setting.slice';

const Permission = Loadable('ModulePermission');

const modulePermissionRoute = (): RouteObject => {
   const { permissions } = useSetting();

   return {
      path: ROUTE_PATH.PERMISSIONS,
      element: <Outlet />,
      children: [
         {
            index: true,
            element: (
               <PermissionAccess module={permissions.PERMISSIONS} action={PAGE_ACTION.VIEW} type="route">
                  <Permission />
               </PermissionAccess>
            ),
         },
      ],
   };
};

export default modulePermissionRoute;
