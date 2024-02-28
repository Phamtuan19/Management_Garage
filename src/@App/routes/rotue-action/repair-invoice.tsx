import PAGE_ACTION from '@App/configs/page-action';
import { Outlet, RouteObject } from 'react-router-dom';
import MODULE_PAGE from '@App/configs/module-page';

import PermissionAccessRoute from '../components/PermissionAccessRoute';
import Loadable from '../components/loadable';

const RepairInvoice = Loadable('RepairInvoice');
const RepairInvoiceCreate = Loadable('RepairInvoice/RepairInvoiceCreate');

const repairInvoiceRoute: RouteObject = {
   path: 'repair-invoices',
   element: <Outlet />,
   children: [
      {
         index: true,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.REPAIR_ORDERS} action={PAGE_ACTION.VIEW_ALL} type="route">
               <RepairInvoice />
            </PermissionAccessRoute>
         ),
      },
      {
         path: 'create',
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.REPAIR_ORDERS} action={PAGE_ACTION.CREATE} type="route">
               <RepairInvoiceCreate />
            </PermissionAccessRoute>
         ),
      },
   ],
};

export default repairInvoiceRoute;
