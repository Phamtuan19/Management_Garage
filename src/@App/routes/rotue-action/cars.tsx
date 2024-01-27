import ROUTE_PATH from '@App/configs/router-path';
import { Outlet, RouteObject } from 'react-router-dom';
import MODULE_PAGE from '@App/configs/module-page';
import PAGE_ACTION from '@App/configs/page-action';

import PermissionAccessRoute from '../components/PermissionAccessRoute';
import Loadable from '../components/loadable';

const CarsCreate = Loadable('Cars/CarsCreate');
const CarsUpdate = Loadable('Cars/CarsUpdate');

const carsRoute: RouteObject = {
   path: ROUTE_PATH.CARS,
   element: <Outlet />,
   children: [
      {
         path: ROUTE_PATH.CARS + ROUTE_PATH.CREATE,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.CARS} action={PAGE_ACTION.CREATE} type="route">
               <CarsCreate />
            </PermissionAccessRoute>
         ),
      },
      {
         path: ROUTE_PATH.CARS + ROUTE_PATH.UPDATE,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.CARS} action={PAGE_ACTION.UPDATE} type="route">
               <CarsUpdate />
            </PermissionAccessRoute>
         ),
      },
   ],
};
export default carsRoute;
