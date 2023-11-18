import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import PAGE_ACTION from './page-action';
import MODULE_PAGE from './module-page';
import { MenuConfigItem } from './config';

const menuConfig: MenuConfigItem[] = [
   {
      id: 1,
      title: 'Trang chủ',
      link: '/',
      icon: HomeIcon,
      module: MODULE_PAGE.DOASHBOARD,
   },
   {
      id: 2,
      title: 'Nhân viên',
      link: 'personnels',
      icon: PeopleIcon,
      module: MODULE_PAGE.USERS,
      children: [
         {
            id: 2.1,
            title: 'Danh sách',
            link: '/personnels',
            action: PAGE_ACTION.view,
         },
         {
            id: 2.2,
            title: 'Thêm mới',
            link: '/personnels/create',
            action: PAGE_ACTION.create,
         },
      ],
   },
   {
      id: 3,
      title: 'Sản phẩm',
      link: '/products',
      icon: PeopleIcon,
      module: MODULE_PAGE.USERS,
      children: [
         {
            id: 3.1,
            title: 'Danh sách',
            link: '/products',
            action: PAGE_ACTION.view,
         },
         {
            id: 3.2,
            title: 'Thêm mới',
            link: '/products/create',
            action: PAGE_ACTION.create,
         },
      ],
   },
];

export default menuConfig;
