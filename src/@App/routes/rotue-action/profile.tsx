import ROUTE_PATH from '@App/configs/router-path';
import { Outlet, RouteObject } from 'react-router-dom';

import Loadable from '../components/loadable';

const Profile = Loadable('Profile');
// const PersonelUpdate = Loadable('PersonelUpdate');

const profileRoute: RouteObject = {
   path: ROUTE_PATH.USER_PROFILE,
   element: <Outlet />,
   children: [
      {
         index: true,
         element: <Profile />,
      },
      // {
      //    path: ROUTE_PATH.USER_PROFILE + ROUTE_PATH.UPDATE,
      //    element: <PersonelUpdate />,
      // },
   ],
};

export default profileRoute;
