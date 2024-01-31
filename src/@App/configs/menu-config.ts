import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
// import WarehouseIcon from '@mui/icons-material/Warehouse';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';

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
      id: 5,
      title: 'Sửa chữa',
      link: '/fix',
      icon: ConstructionRoundedIcon,
      children: [
         {
            id: 5.1,
            title: 'Phiếu sửa chữa',
            link: ROUTE_PATH.REPAIR_ORDERS,
            module: MODULE_PAGE.REPAIR_ORDERS,
            action: PAGE_ACTION.VIEW_ALL,
         },
      ],
   },
   {
      id: 2,
      title: 'Vật tư',
      link: '/wh',
      icon: WidgetsOutlinedIcon,
      children: [
         {
            id: 2.1,
            title: 'Vật tư',
            link: ROUTE_PATH.SUPPLIES,
            module: MODULE_PAGE.SUPPLIES,
            action: PAGE_ACTION.VIEW_ALL,
         },
         {
            id: 2.2,
            title: 'Danh mục vật tư',
            link: ROUTE_PATH.MATERIALS_CATALOGS,
            module: MODULE_PAGE.MATERIALS_CATALOGS,
            action: PAGE_ACTION.VIEW_ALL,
         },
         {
            id: 2.3,
            title: 'Quản lý kho',
            link: ROUTE_PATH.WAREHOUSES,
            module: MODULE_PAGE.WAREHOUSES,
            action: PAGE_ACTION.VIEW_ALL,
         },
         {
            id: 2.4,
            title: 'Nhà phân phối',
            link: ROUTE_PATH.DISTRIBUTORS,
            module: MODULE_PAGE.DISTRIBUTORS,
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
            id: 4.3,
            title: 'Vai trò',
            link: ROUTE_PATH.ROLES,
            module: MODULE_PAGE.ROLES,
            action: PAGE_ACTION.VIEW_ALL,
         },
      ],
   },
   {
      id: 3,
      title: 'Khách hàng',
      link: '/c',
      icon: FaceRetouchingNaturalIcon,
      action: PAGE_ACTION.VIEW_ALL,
      children: [
         {
            id: 3.1,
            title: 'Khách hàng',
            link: ROUTE_PATH.CUSTOMERS,
            module: MODULE_PAGE.CUSTOMERS,
            action: PAGE_ACTION.VIEW_ALL,
         },
      ],
   },
   {
      id: 6,
      title: 'Dịch vụ sửa chữa',
      link: ROUTE_PATH.CARS,
      icon: PeopleIcon,
      action: PAGE_ACTION.VIEW_ALL,
      module: MODULE_PAGE.CARS,
   },
];

export default menuConfig;
