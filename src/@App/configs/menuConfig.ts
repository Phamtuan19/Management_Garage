import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import PAGEACTION from './pageAction';

export interface MenuConfigItem {
   id: number;
   title: string;
   link: string;
   icon: any;
   children?: MenuConfigItem[];
}

const menuConfig = [
   {
      id: 1,
      title: 'Trang chủ',
      link: '/',
      icon: HomeIcon,
      role: [],
   },
   {
      id: 2,
      title: 'Nhân viên',
      link: 'personnels',
      icon: PeopleIcon,
      role: 'user',
      children: [
         {
            id: 2.1,
            title: 'Danh sách',
            link: '/personnels',
            role: PAGEACTION.view,
         },
         {
            id: 2.2,
            title: 'Thêm mới',
            link: '/personnels/create',
            role: PAGEACTION.create,
         },
      ],
   },
   {
      id: 3,
      title: 'Sản phẩm',
      link: '/products',
      icon: PeopleIcon,
      role: 'user',
      children: [
         {
            id: 3.1,
            title: 'Danh sách',
            link: '/products',
            role: PAGEACTION.view,
         },
         {
            id: 3.2,
            title: 'Thêm mới',
            link: '/products/create',
            role: PAGEACTION.create,
         },
      ],
   },
];

export default menuConfig;
