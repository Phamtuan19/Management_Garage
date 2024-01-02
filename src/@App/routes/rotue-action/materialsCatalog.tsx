import Loadable from '../components/loadable';
import ROUTE_PATH from '@App/configs/router-path';
import PAGE_ACTION from '@App/configs/page-action';
import { Outlet, RouteObject } from 'react-router-dom';
import PermissionAccessRoute from '../components/PermissionAccessRoute';
import MODULE_PAGE from '@App/configs/module-page';

const MaterialsCatalog = Loadable('MaterialsCatalog');

const materialsCatalogRoute: RouteObject = {
   path: ROUTE_PATH.MATERIALSCATALOG,
   element: <Outlet />,
   children: [
      {
         index: true,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.MATERIALSCATALOG} action={PAGE_ACTION.VIEW} type="route">
               <MaterialsCatalog />
            </PermissionAccessRoute>
         ),
      },
   ],
};

export default materialsCatalogRoute;
