import { lazy } from 'react';
import LoadSuspenseScreen from '../components/loadable';

const Profile = LoadSuspenseScreen(lazy(() => import('@App/pages/common/Profile')));

const commonRoutes = {
   path: '/profile',
   element: <Profile />,
};
export default commonRoutes;
