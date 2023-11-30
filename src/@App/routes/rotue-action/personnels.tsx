import Loadable from '../components/loadable';
import ROUTE_PATH from '@App/configs/router-path';
import PAGE_ACTION from '@App/configs/page-action';
import { Outlet, RouteObject } from 'react-router-dom';
import PermissionAccess from '../components/PermissionAccess';
import { useSetting } from '@App/redux/slices/setting.slice';

const PersonnelCreate = Loadable('Personnels/PersonnelCreate');
const Personnel = Loadable('Personnels');

const personnelRoute = (): RouteObject => {
   const { permissions } = useSetting();

   return {
      path: ROUTE_PATH.PERSONNELS,
      element: <Outlet />,
      children: [
         {
            index: true,
            element: (
               <PermissionAccess module={permissions.PERSONNELS} action={PAGE_ACTION.VIEW} type="route">
                  <Personnel />
               </PermissionAccess>
            ),
         },
         {
            path: ROUTE_PATH.PERSONNELS + ROUTE_PATH.CREATE,
            element: (
               <PermissionAccess module={permissions.PERSONNELS} action={PAGE_ACTION.CREATE} type="route">
                  <PersonnelCreate />
               </PermissionAccess>
            ),
         },
      ],
   };
};

export default personnelRoute;
