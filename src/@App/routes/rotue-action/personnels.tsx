import ROUTE_PATH from '@App/configs/router-path';
import PAGE_ACTION from '@App/configs/page-action';
import { Outlet, RouteObject } from 'react-router-dom';
import MODULE_PAGE from '@App/configs/module-page';
import PersonnelDetails from '@App/pages/Personnels/PersonelDetails';

import PermissionAccessRoute from '../components/PermissionAccessRoute';
import Loadable from '../components/loadable';

const PersonnelCreate = Loadable('Personnels/PersonnelCreate');
const Personnel = Loadable('Personnels');
const PersonelUpdate = Loadable('Personnels/PersonelUpdate');
const personnelRoute: RouteObject = {
   path: ROUTE_PATH.PERSONNELS,
   element: <Outlet />,
   children: [
      {
         index: true,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.PERSONNELS} action={PAGE_ACTION.VIEW_ALL} type="route">
               <Personnel />
            </PermissionAccessRoute>
         ),
      },
      {
         path: ROUTE_PATH.PERSONNELS + ROUTE_PATH.CREATE,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.PERSONNELS} action={PAGE_ACTION.CREATE} type="route">
               <PersonnelCreate />
            </PermissionAccessRoute>
         ),
      },
      {
         path: ROUTE_PATH.PERSONNELS + ROUTE_PATH.UPDATE,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.PERSONNELS} action={PAGE_ACTION.UPDATE} type="route">
               <PersonelUpdate />
            </PermissionAccessRoute>
         ),
      },
      {
         path: ROUTE_PATH.PERSONNELS + ROUTE_PATH.DETAILS,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.PERSONNELS} action={PAGE_ACTION.VIEW_ONE} type="route">
               <PersonnelDetails />
            </PermissionAccessRoute>
         ),
      },
   ],
};

export default personnelRoute;
