import ROUTE_PATH from '@App/configs/router-path';
import { Outlet, RouteObject } from 'react-router-dom';
import PermissionAccessRoute from '../components/PermissionAccessRoute';
import MODULE_PAGE from '@App/configs/module-page';
import PAGE_ACTION from '@App/configs/page-action';
import Loadable from '../components/loadable';

const Distributor = Loadable('Distributor');
const DistributorCreate = Loadable('Distributor/DistributorCreate');
const DistributorUpdate = Loadable('Distributor/DistributorUpdate');

const distributorRoute: RouteObject = {
   path: ROUTE_PATH.DISTRIBUTORS,
   element: <Outlet />,
   children: [
      {
         index: true,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.PERMISSIONS} action={PAGE_ACTION.VIEW} type="route">
               <Distributor />
            </PermissionAccessRoute>
         ),
      },
      {
         path: ROUTE_PATH.DISTRIBUTORS + ROUTE_PATH.CREATE,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.PERMISSIONS} action={PAGE_ACTION.CREATE} type="route">
               <DistributorCreate />
            </PermissionAccessRoute>
         ),
      },
      {
         path: ROUTE_PATH.DISTRIBUTORS + ROUTE_PATH.UPDATE,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.PERMISSIONS} action={PAGE_ACTION.UPDATE} type="route">
               <DistributorUpdate />
            </PermissionAccessRoute>
         ),
      },
   ],
};

export default distributorRoute;
