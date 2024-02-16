import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import ConstructionRoundedIcon from '@mui/icons-material/ConstructionRounded';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

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
            title: 'Xe',
            link: ROUTE_PATH.CARS,
            module: MODULE_PAGE.CARS,
            action: PAGE_ACTION.VIEW_ALL,
         },
         {
            id: 5.2,
            title: 'Phiếu sửa chữa',
            link: ROUTE_PATH.REPAIR_ORDERS,
            module: MODULE_PAGE.REPAIR_ORDERS,
            action: PAGE_ACTION.VIEW_ALL,
         },
         {
            id: 5.3,
            title: 'Dịch vụ sửa chữa',
            link: ROUTE_PATH.REPAIR_SERVICES,
            module: MODULE_PAGE.REPAIR_SERVICES,
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
      link: '/custom',
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
      title: 'Giao dịch',
      link: '/trs',
      icon: ReceiptLongIcon,
      module: MODULE_PAGE.DOASHBOARD,
      children: [
         {
            id: 6.1,
            title: 'Nhập hàng',
            link: ROUTE_PATH.SUPPLIES_INVOICES,
            module: MODULE_PAGE.SUPPLIES_INVOICES,
            action: PAGE_ACTION.VIEW_ALL,
         },
      ],
   },
];

export default menuConfig;
