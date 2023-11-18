import Loadable from '../components/loadable';
import ROUTE_PATH from '@App/configs/router-path';
import MODULE_PAGE from '@App/configs/module-page';
import PAGE_ACTION from '@App/configs/page-action';
import { Outlet, RouteObject } from 'react-router-dom';
import PermissionAccess from '../components/PermissionAccess';

const PersonnelCreate = Loadable('Personnels/PersonnelCreate');

const personnelRoute: RouteObject = {
   path: ROUTE_PATH.PERSONNELS,
   element: <Outlet />,
   children: [
      {
         index: true,
         element: <h1>Trang thêm người dùng</h1>,
      },
      {
         path: ROUTE_PATH.PERSONNELS + ROUTE_PATH.CREATE,
         element: (
            <PermissionAccess
               module={MODULE_PAGE.PERSONNELS}
               action={PAGE_ACTION.CREATE}
               path={ROUTE_PATH.PERSONNELS + ROUTE_PATH.CREATE}
            >
               <PersonnelCreate />
            </PermissionAccess>
         ),
      },
   ],
};

export default personnelRoute;