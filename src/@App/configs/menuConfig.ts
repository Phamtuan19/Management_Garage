import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';

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
   },
   {
      id: 2,
      title: 'Nhân viên',
      link: '',
      icon: PeopleIcon,
      children: [
         {
            id: 2.1,
            title: 'Danh sách nhân viên',
            link: '/personnels',
         },
         {
            id: 2.2,
            title: 'Thêm mới',
            link: '/personnels/create',
         },
      ],
   },
];

export default menuConfig;
