import { Outlet, RouteObject } from 'react-router-dom';

import Loadable from '../components/loadable';

const RepairOrderCreate = Loadable('RepairOrder1/RepairOrderCreate');
// const PersonelUpdate = Loadable('PersonelUpdate');

const repairOrder1: RouteObject = {
   path: '/repair-order-1',
   element: <Outlet />,
   children: [
      {
         index: true,
         element: <>hello</>,
      },
      {
         path: 'create',
         element: <RepairOrderCreate />,
      },
   ],
};

export default repairOrder1;
