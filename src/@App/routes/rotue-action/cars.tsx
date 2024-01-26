import ROUTE_PATH from '@App/configs/router-path';
import { Outlet, RouteObject } from 'react-router-dom';
import MODULE_PAGE from '@App/configs/module-page';
import PAGE_ACTION from '@App/configs/page-action';

import PermissionAccessRoute from '../components/PermissionAccessRoute';
import Loadable from '../components/loadable';

const CarsCreate = Loadable('Cars/CarsCreate');

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
   ],
};
export default carsRoute;
