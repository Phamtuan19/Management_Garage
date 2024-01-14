import MODULE_PAGE from '@App/configs/module-page';
import PAGE_ACTION from '@App/configs/page-action';

export const CHIP_COLOR = {
   view: 'primary',
   create: 'success',
   update: 'secondary',
   show: 'info',
   edit: 'warning',
   delete: 'error',
} as const;

export const ROLES = [
   // DISTRIBUTORS
   {
      name: MODULE_PAGE.DISTRIBUTORS,
      title: 'Nhà phân phối',
      action: [
         {
            name: PAGE_ACTION.VIEW_ALL,
            title: 'Xem Danh sách nhà phân phối',
         },
         {
            name: PAGE_ACTION.VIEW_ONE,
            title: 'Xem Chi tiết thông tin nhà phân phối',
         },
         {
            name: PAGE_ACTION.CREATE,
            title: 'Thêm mới thông tin nhà phân phối',
         },
         {
            name: PAGE_ACTION.DELETE,
            title: 'Xóa thông tin nhà phân phối',
         },
         {
            name: PAGE_ACTION.UPDATE,
            title: 'Cập nhật thông tin nhà phân phối',
         },
      ],
   },
   // MATERIALS_CATALOGS
   {
      name: MODULE_PAGE.MATERIALS_CATALOGS,
      title: 'Danh mục vật tư',
      action: [
         {
            name: PAGE_ACTION.VIEW_ALL,
            title: 'Xem Danh sách vật tư',
         },
         {
            name: PAGE_ACTION.VIEW_ONE,
            title: 'Xem Chi tiết thông tin vật tư',
         },
         {
            name: PAGE_ACTION.CREATE,
            title: 'Thêm mới thông tin vật tư',
         },
         {
            name: PAGE_ACTION.DELETE,
            title: 'Xóa thông tin vật tư',
         },
         {
            name: PAGE_ACTION.UPDATE,
            title: 'Cập nhật thông tin vật tư',
         },
      ],
   },
   // Personnel
   {
      name: MODULE_PAGE.PERSONNELS,
      title: 'Nhân viên',
      action: [
         {
            name: PAGE_ACTION.VIEW_ALL,
            title: 'Xem Danh sách nhân viên',
         },
         {
            name: PAGE_ACTION.VIEW_ONE,
            title: 'Xem Chi tiết thông tin nhân viên',
         },
         {
            name: PAGE_ACTION.CREATE,
            title: 'Thêm mới thông tin nhân viên',
         },
         {
            name: PAGE_ACTION.DELETE,
            title: 'Xóa thông tin nhân viên',
         },
         {
            name: PAGE_ACTION.UPDATE,
            title: 'Cập nhật thông tin nhân viên',
         },
         {
            name: PAGE_ACTION.IS_LOCK,
            title: 'Khóa tài khoản nhân viên',
         },
      ],
   },
   // Role
   {
      name: MODULE_PAGE.ROLES,
      title: 'Vai trò',
      action: [
         {
            name: PAGE_ACTION.VIEW_ALL,
            title: 'Xem Danh sách vai trò',
         },
         {
            name: PAGE_ACTION.VIEW_ONE,
            title: 'Xem Chi tiết thông tin vai trò',
         },
         {
            name: PAGE_ACTION.CREATE,
            title: 'Thêm mới thông tin vai trò',
         },
         {
            name: PAGE_ACTION.DELETE,
            title: 'Xóa thông tin vai trò',
         },
         {
            name: PAGE_ACTION.UPDATE,
            title: 'Cập nhật thông tin vai trò',
         },
      ],
   },
] as const;
