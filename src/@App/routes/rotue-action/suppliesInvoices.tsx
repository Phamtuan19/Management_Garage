import ROUTE_PATH from '@App/configs/router-path';
import { Outlet, RouteObject } from 'react-router-dom';
import MODULE_PAGE from '@App/configs/module-page';
import PAGE_ACTION from '@App/configs/page-action';

import PermissionAccessRoute from '../components/PermissionAccessRoute';
import Loadable from '../components/loadable';

const SuppliesInvoicesCreate = Loadable('SuppliesInvoices/SuppliesInvoicesCreate');

// const DistributorUpdate = Loadable('Distributor/DistributorUpdate');
// const DistributorDetails = Loadable('Distributor/DistributorDetails');

const suppliesInvoicesRoute: RouteObject = {
   path: ROUTE_PATH.SUPPLIES_INVOICES,
   element: <Outlet />,
   children: [
      {
         path: ROUTE_PATH.SUPPLIES_INVOICES + ROUTE_PATH.CREATE,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.CARS} action={PAGE_ACTION.CREATE} type="route">
               <SuppliesInvoicesCreate />
            </PermissionAccessRoute>
         ),
      },
   ],
};
export default suppliesInvoicesRoute;
