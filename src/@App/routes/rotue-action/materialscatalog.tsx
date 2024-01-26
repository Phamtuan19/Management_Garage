import ROUTE_PATH from '@App/configs/router-path';
import PAGE_ACTION from '@App/configs/page-action';
import { Outlet, RouteObject } from 'react-router-dom';
import MODULE_PAGE from '@App/configs/module-page';
import PermissionAccessRoute from '../components/PermissionAccessRoute';
import Loadable from '../components/loadable';

const MaterialsCatalog = Loadable('MaterialsCatalog');

const MaterialsCatalogCreate = Loadable('MaterialsCatalog/MaterialsCatalogCreate');
const MaterialsCatalogUpdate = Loadable('MaterialsCatalog/MaterialsCatalogUpdate');
const MaterialsCatalogDetails = Loadable('MaterialsCatalog/MaterialsCatalogDetails');

const materialsCatalogRoute: RouteObject = {
   path: ROUTE_PATH.MATERIALS_CATALOGS,
   element: <Outlet />,
   children: [
      {
         index: true,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.MATERIALS_CATALOGS} action={PAGE_ACTION.VIEW_ALL} type="route">
               <MaterialsCatalog />
            </PermissionAccessRoute>
         ),
      },
      {
         path: ROUTE_PATH.MATERIALS_CATALOGS + ROUTE_PATH.CREATE,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.MATERIALS_CATALOGS} action={PAGE_ACTION.CREATE} type="route">
               < MaterialsCatalogCreate/>
            </PermissionAccessRoute>
         ),
      },
      {
         path: ROUTE_PATH.MATERIALS_CATALOGS + ROUTE_PATH.UPDATE,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.MATERIALS_CATALOGS} action={PAGE_ACTION.UPDATE} type="route">
               <MaterialsCatalogUpdate/>
            </PermissionAccessRoute>
         ),
      },
      {
         path: ROUTE_PATH.MATERIALS_CATALOGS + ROUTE_PATH.DETAILS,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.MATERIALS_CATALOGS} action={PAGE_ACTION.VIEW_ONE} type="route">
               <MaterialsCatalogDetails/>
            </PermissionAccessRoute>
         ),
      }
   ],
};

export default materialsCatalogRoute;