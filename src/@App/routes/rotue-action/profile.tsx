import ROUTE_PATH from '@App/configs/router-path';
import { Outlet, RouteObject } from 'react-router-dom';

import Loadable from '../components/loadable';

const Profile = Loadable('Profile');

const profileRoute: RouteObject = {
   path: ROUTE_PATH.USER_PROFILE,
   element: <Outlet />,
   children: [
      {
         index: true,
         element: <Profile />,
      },
   ],
};

export default profileRoute;
