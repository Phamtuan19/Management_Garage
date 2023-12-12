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
      action: PAGE_ACTION.VIEW,
      module: MODULE_PAGE.DOASHBOARD,
   },
   {
      id: 4,
      title: 'Nhà phân phối',
      link: ROUTE_PATH.DISTRIBUTORS,
      icon: PeopleIcon,
      module: MODULE_PAGE.DISTRIBUTORS,
      children: [
         {
            id: 2.1,
            title: 'Danh sách',
            link: ROUTE_PATH.DISTRIBUTORS,
            action: PAGE_ACTION.VIEW,
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
      id: 4,
      title: 'Kho hàng',
      link: ROUTE_PATH.MATERIALSCATALOG,
      icon: PeopleIcon,
      module: MODULE_PAGE.MATERIALSCATALOG,
      children: [
         {
            id: 2.1,
            title: 'Danh sách',
            link: ROUTE_PATH.MATERIALSCATALOG,
            action: PAGE_ACTION.VIEW,
         },
         {
            id: 2.2,
            title: 'Thêm mới',
            link: ROUTE_PATH.MATERIALSCATALOG + ROUTE_PATH.CREATE,
            action: PAGE_ACTION.CREATE,
         },
      ],
   },
   {
      id: 2,
      title: 'Nhân viên',
      link: ROUTE_PATH.STAFF,
      icon: PeopleIcon,
      module: MODULE_PAGE.STAFF,
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
            link: ROUTE_PATH.STAFF + ROUTE_PATH.CREATE,
            action: PAGE_ACTION.CREATE,
         },
      ],
   },
   {
      id: 3,
      title: 'Quyền truy cập',
      link: ROUTE_PATH.PERMISSIONS,
      icon: PeopleIcon,
      module: MODULE_PAGE.PERMISSIONS,
      action: PAGE_ACTION.VIEW,
   },
];

export default menuConfig;
