import ROUTE_PATH from '@App/configs/router-path';
import { Outlet, RouteObject } from 'react-router-dom';
import MODULE_PAGE from '@App/configs/module-page';
import PAGE_ACTION from '@App/configs/page-action';

import PermissionAccessRoute from '../components/PermissionAccessRoute';
import Loadable from '../components/loadable';

const Cars = Loadable('Cars');

const CarsCreate = Loadable('Cars/CarsCreate');

const CarsUpdate = Loadable('Cars/CarsUpdate');

const CarsDetails = Loadable('Cars/CarsDetails');

const carsRoute: RouteObject = {
   path: ROUTE_PATH.CARS,
   element: <Outlet />,
   children: [
      {
         index: true,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.CARS} action={PAGE_ACTION.VIEW_ALL} type="route">
               <Cars />
            </PermissionAccessRoute>
         ),
      },
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
      {
         path: ROUTE_PATH.CARS + ROUTE_PATH.DETAILS,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.CARS} action={PAGE_ACTION.VIEW_ONE} type="route">
               <CarsDetails />
            </PermissionAccessRoute>
         ),
      },
   ],
};
export default carsRoute;
