import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import PAGE_ACTION from './page-action';
import { MenuConfigItem } from './config';
import ROUTE_PATH from './router-path';
import { useSetting } from '@App/redux/slices/setting.slice';

const menuConfig = (): MenuConfigItem[] => {
   const { module_permission } = useSetting();
   const permissions = Array.isArray(module_permission) ? {} : module_permission;
   return [
      {
         id: 1,
         title: 'Trang chủ',
         link: '/',
         icon: HomeIcon,
         action: PAGE_ACTION.VIEW,
         module: permissions?.DOASHBOARD,
      },
      {
         id: 2,
         title: 'Nhân viên',
         link: ROUTE_PATH.PERSONNELS,
         icon: PeopleIcon,
         module: permissions.PERSONNELS,
         children: [
            {
               id: 2.1,
               title: 'Danh sách',
               link: '/personnels',
               action: PAGE_ACTION.VIEW,
            },
            {
               id: 2.2,
               title: 'Thêm mới',
               link: ROUTE_PATH.PERSONNELS + ROUTE_PATH.CREATE,
               action: PAGE_ACTION.CREATE,
            },
         ],
      },
      {
         id: 3,
         title: 'Quyền truy cập',
         link: ROUTE_PATH.PERMISSIONS,
         icon: PeopleIcon,
         module: permissions.PERMISSIONS,
         children: [
            {
               id: 3.1,
               title: 'Danh sách',
               link: ROUTE_PATH.PERMISSIONS,
               action: PAGE_ACTION.VIEW,
            },
            {
               id: 3.2,
               title: 'Thêm mới',
               link: ROUTE_PATH.PERMISSIONS + ROUTE_PATH.CREATE,
               action: PAGE_ACTION.CREATE,
            },
         ],
      },
   ];
};

export default menuConfig;
