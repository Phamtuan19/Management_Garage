import ROUTE_PATH from '@App/configs/router-path';
import { Outlet, RouteObject } from 'react-router-dom';
import MODULE_PAGE from '@App/configs/module-page';
import PAGE_ACTION from '@App/configs/page-action';

import PermissionAccessRoute from '../components/PermissionAccessRoute';
import Loadable from '../components/loadable';

const BrandCars = Loadable('BrandCars');
const BrandCarsCreate = Loadable('BrandCars/BrandCarsCreate');

const brandCarsRoute: RouteObject = {
   path: ROUTE_PATH.BRAND_CARS,
   element: <Outlet />,
   children: [
      {
         index: true,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.BRAND_CARS} action={PAGE_ACTION.VIEW_ALL} type="route">
               <BrandCars />
            </PermissionAccessRoute>
         ),
      },
      {
         path: ROUTE_PATH.BRAND_CARS + ROUTE_PATH.CREATE,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.BRAND_CARS} action={PAGE_ACTION.CREATE} type="route">
               <BrandCarsCreate />
            </PermissionAccessRoute>
         ),
      },
   ],
};
export default brandCarsRoute;
