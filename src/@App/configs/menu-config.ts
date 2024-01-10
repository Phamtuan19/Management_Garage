import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';

import PAGE_ACTION from './page-action';
import ROUTE_PATH from './router-path';
import MODULE_PAGE from './module-page';
import { type MenuConfigItem } from './config';

const menuConfig: MenuConfigItem[] = [
   {
      id: 1,
      title: 'Trang chủ',
      link: '/',
      icon: HomeIcon,
      action: PAGE_ACTION.VIEW_ALL,
      module: MODULE_PAGE.DOASHBOARD,
   },
   {
      id: 2,
      title: 'Vật tư',
      link: ROUTE_PATH.DISTRIBUTORS,
      icon: WidgetsOutlinedIcon,
      children: [
         {
            id: 2.1,
            title: 'Danh sách vật tư',
            link: ROUTE_PATH.SUPPLIES,
            module: MODULE_PAGE.SUPPLIES,
            action: PAGE_ACTION.VIEW_ALL,
         },
         {
            id: 2.2,
            title: 'Quản lý kho',
            link: ROUTE_PATH.WAREHOUSES,
            module: MODULE_PAGE.WAREHOUSES,
            action: PAGE_ACTION.VIEW_ALL,
         },
         {
            id: 2.3,
            title: 'Nhà phân phối',
            link: ROUTE_PATH.MATERIALS_CATALOGS,
            module: MODULE_PAGE.MATERIALS_CATALOGS,
            action: PAGE_ACTION.VIEW_ALL,
         },
      ],
   },
   {
      id: 4,
      title: 'Nhân sự',
      link: '/hr',
      icon: PeopleIcon,
      children: [
         {
            id: 4.1,
            title: 'Nhân viên',
            link: ROUTE_PATH.PERSONNELS,
            module: MODULE_PAGE.PERSONNELS,
            action: PAGE_ACTION.VIEW_ALL,
         },
         {
            id: 4.2,
            title: 'Thêm mới',
            link: ROUTE_PATH.PERSONNELS + ROUTE_PATH.CREATE,
            module: MODULE_PAGE.PERSONNELS,
            action: PAGE_ACTION.CREATE,
         },
         {
            id: 4.3,
            title: 'Quyền truy cập',
            link: ROUTE_PATH.ROLES,
            module: MODULE_PAGE.ROLES,
            action: PAGE_ACTION.VIEW_ALL,
         },
      ],
   },
   {
      id: 5,
      title: 'Người dùng',
      link: ROUTE_PATH.CUSTOMERS,
      icon: PeopleIcon,

      children: [
         {
            id: 5.1,
            title: 'Danh sách',
            link: '/users',
            module: MODULE_PAGE.CUSTOMERS,
            action: PAGE_ACTION.VIEW_ALL,
         },
         {
            id: 5.2,
            title: 'Thêm mới',
            link: ROUTE_PATH.CUSTOMERS + ROUTE_PATH.CREATE,
            module: MODULE_PAGE.CUSTOMERS,
            action: PAGE_ACTION.CREATE,
         },
      ],
   },
];

export default menuConfig;
