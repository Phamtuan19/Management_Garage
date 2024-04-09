import ROUTE_PATH from '@App/configs/router-path';
import { Outlet, RouteObject } from 'react-router-dom';
import MODULE_PAGE from '@App/configs/module-page';
import PAGE_ACTION from '@App/configs/page-action';

import PermissionAccessRoute from '../components/PermissionAccessRoute';
import Loadable from '../components/loadable';

const Dashboard = Loadable('Dashboard');

const DashboardSupplies = Loadable('Dashboard/DashboardSupplies');

const dashboardRoute: RouteObject = {
   path: '/',
   element: <Outlet />,
   children: [
      {
         index: true,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.DOASHBOARD} action={PAGE_ACTION.VIEW_ALL} type="route">
               <Dashboard />
            </PermissionAccessRoute>
         ),
      },
      {
         path: ROUTE_PATH.DOASHBOARD_SUPPLIES,
         element: (
            <PermissionAccessRoute module={MODULE_PAGE.DOASHBOARD} action={PAGE_ACTION.VIEW_ALL} type="route">
               <DashboardSupplies />
            </PermissionAccessRoute>
         ),
      },
   ],
};
export default dashboardRoute;
