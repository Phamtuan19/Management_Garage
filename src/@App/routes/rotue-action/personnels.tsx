import ROUTE_PATH from '@App/configs/router-path';
import { Outlet, RouteObject } from 'react-router-dom';

const personnelRoute: RouteObject = {
   path: ROUTE_PATH.PERSONNELS,
   element: <Outlet />,
   children: [
      {
         index: true,
         element: <h1>Trang thêm người dùng</h1>,
      },
      {
         path: ROUTE_PATH.PERSONNELS_CREATE,
         element: <h1>Trang thêm người dùng</h1>,
      },
   ],
};

export default personnelRoute;
