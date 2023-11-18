import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import PAGE_ACTION from './page-action';
import MODULE_PAGE from './module-page';
import { MenuConfigItem } from './config';
import ROUTE_PATH from './router-path';

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
      id: 2,
      title: 'Nhân viên',
      link: 'personnels',
      icon: PeopleIcon,
      module: MODULE_PAGE.PERSONNELS,
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
];

export default menuConfig;
