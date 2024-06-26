import { Outlet, RouteObject } from 'react-router-dom';
import MODULE_PAGE from '@App/configs/module-page';
import ROUTE_PATH from '@App/configs/router-path';

import PermissionAccessRoute from '../components/PermissionAccessRoute';
import Loadable from '../components/loadable';

const RepairInvoice = Loadable('RepairInvoice');
const RepairInvoiceCreate = Loadable('RepairInvoice/RepairInvoiceCreate');
const RepairInvoiceDetail = Loadable('RepairInvoice/RepairInvoiceDetail');
const RepairInvoiceUpdate = Loadable('RepairInvoice/RepairInvoiceUpdate');

const repairInvoiceRoute: RouteObject = {
   path: ROUTE_PATH.REPAIR_INVOICE,
   element: <Outlet />,
   children: [
      {
         index: true,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.REPAIR_INVOICE} action="VIEW_ALL" type="route">
               <RepairInvoice />
            </PermissionAccessRoute>
         ),
      },
      {
         path: ROUTE_PATH.REPAIR_INVOICE + ROUTE_PATH.CREATE,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.REPAIR_INVOICE} action="CREATE" type="route">
               <RepairInvoiceCreate />
            </PermissionAccessRoute>
         ),
      },
      {
         path: ROUTE_PATH.REPAIR_INVOICE + ROUTE_PATH.DETAILS,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.REPAIR_INVOICE} action="VIEW_ONE" type="route">
               <RepairInvoiceDetail />
            </PermissionAccessRoute>
         ),
      },
      {
         path: ROUTE_PATH.REPAIR_INVOICE + ROUTE_PATH.UPDATE,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.REPAIR_INVOICE} action="UPDATE" type="route">
               <RepairInvoiceUpdate />
            </PermissionAccessRoute>
         ),
      },
   ],
};

export default repairInvoiceRoute;
