import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
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
      title: 'Nhà phân phối',
      link: ROUTE_PATH.DISTRIBUTORS,
      icon: PeopleIcon,
      module: MODULE_PAGE.DISTRIBUTORS,
      children: [
         {
            id: 2.1,
            title: 'Danh sách',
            link: ROUTE_PATH.DISTRIBUTORS,
            action: PAGE_ACTION.VIEW_ALL,
         },
         {
            id: 2.2,
            title: 'Thêm mới',
            link: ROUTE_PATH.DISTRIBUTORS + ROUTE_PATH.CREATE,
            action: PAGE_ACTION.CREATE,
         },
      ],
   },
   {
      id: 3,
      title: 'Danh mục vật tư',
      link: ROUTE_PATH.MATERIALSCATALOG,
      icon: PeopleIcon,
      module: MODULE_PAGE.MATERIALS_CATALOGS,
      children: [
         {
            id: 3.1,
            title: 'Danh sách',
            link: ROUTE_PATH.MATERIALSCATALOG,
            action: PAGE_ACTION.VIEW_ALL,
         },
         {
            id: 3.2,
            title: 'Thêm mới',
            link: ROUTE_PATH.MATERIALSCATALOG + ROUTE_PATH.CREATE,
            action: PAGE_ACTION.CREATE,
         },
      ],
   },
   {
      id: 4,
      title: 'Nhân viên',
      link: ROUTE_PATH.PERSONNELS,
      icon: PeopleIcon,
      module: MODULE_PAGE.PERSONNELS,
      children: [
         {
            id: 4.1,
            title: 'Danh sách',
            link: '/personnels',
            action: PAGE_ACTION.VIEW_ALL,
         },
         {
            id: 4.2,
            title: 'Thêm mới',
            link: ROUTE_PATH.PERSONNELS + ROUTE_PATH.CREATE,
            action: PAGE_ACTION.CREATE,
         },
      ],
   },
   {
      id: 5,
      title: 'Người dùng',
      link: ROUTE_PATH.CUSTOMERS,
      icon: PeopleIcon,
      module: MODULE_PAGE.CUSTOMERS,
      children: [
         {
            id: 5.1,
            title: 'Danh sách',
            link: '/users',
            action: PAGE_ACTION.VIEW_ALL,
         },
         {
            id: 5.2,
            title: 'Thêm mới',
            link: ROUTE_PATH.CUSTOMERS + ROUTE_PATH.CREATE,
            action: PAGE_ACTION.CREATE,
         },
      ],
   },
   {
      id: 6,
      title: 'Quyền truy cập',
      link: ROUTE_PATH.ROLES,
      icon: PeopleIcon,
      module: MODULE_PAGE.ROLES,
      action: PAGE_ACTION.VIEW_ALL,
   },
];

export default menuConfig;
