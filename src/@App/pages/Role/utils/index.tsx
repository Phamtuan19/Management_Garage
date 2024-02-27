import MODULE_PAGE, { ModulePagePropsType } from '@App/configs/module-page';
import PAGE_ACTION, { PageActionPropsType } from '@App/configs/page-action';

export const CHIP_COLOR = {
   view: 'primary',
   create: 'success',
   update: 'secondary',
   show: 'info',
   edit: 'warning',
   delete: 'error',
} as const;

export interface RolePropsTypeConfig {
   name: ModulePagePropsType;
   title: string;
   action: {
      name: PageActionPropsType;
      title: string;
   }[];
}

export const ROLES: RolePropsTypeConfig[] = [
   {
      name: MODULE_PAGE.DOASHBOARD,
      title: 'Thống kê',
      action: [
         {
            name: PAGE_ACTION.VIEW_ALL,
            title: 'Xem thống kê',
         },
      ],
   },
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
   // CAR
   {
      name: MODULE_PAGE.CARS,
      title: 'Xe',
      action: [
         {
            name: PAGE_ACTION.VIEW_ALL,
            title: 'Xem Danh sách xe',
         },
         {
            name: PAGE_ACTION.VIEW_ONE,
            title: 'Xem Chi tiết thông tin xe',
         },
         {
            name: PAGE_ACTION.CREATE,
            title: 'Thêm mới thông tin xe',
         },
         {
            name: PAGE_ACTION.DELETE,
            title: 'Xóa thông tin xe',
         },
         {
            name: PAGE_ACTION.UPDATE,
            title: 'Cập nhật thông tin xe',
         },
      ],
   },
   // CUSTOMERS
   {
      name: MODULE_PAGE.CUSTOMERS,
      title: 'Người dùng',
      action: [
         {
            name: PAGE_ACTION.VIEW_ALL,
            title: 'Xem Danh sách người dùng',
         },
         {
            name: PAGE_ACTION.VIEW_ONE,
            title: 'Xem Chi tiết thông tin người dùng',
         },
         {
            name: PAGE_ACTION.CREATE,
            title: 'Thêm mới thông tin người dùng',
         },
         {
            name: PAGE_ACTION.DELETE,
            title: 'Xóa thông tin người dùng',
         },
         {
            name: PAGE_ACTION.UPDATE,
            title: 'Cập nhật thông tin người dùng',
         },
      ],
   },
   // SUPPLIES_INVOICES
   {
      name: MODULE_PAGE.SUPPLIES_INVOICES,
      title: 'Hóa đơn nhập vật tư',
      action: [
         {
            name: PAGE_ACTION.VIEW_ALL,
            title: 'Xem Danh sách hóa đơn nhập vật tư',
         },
         {
            name: PAGE_ACTION.VIEW_ONE,
            title: 'Xem Chi tiết thông tin hóa đơn nhập vật tư',
         },
         {
            name: PAGE_ACTION.CREATE,
            title: 'Thêm mới thông tin hóa đơn nhập vật tư',
         },
         {
            name: PAGE_ACTION.DELETE,
            title: 'Xóa thông tin hóa đơn nhập vật tư',
         },
         {
            name: PAGE_ACTION.UPDATE,
            title: 'Cập nhật thông tin hóa đơn nhập vật tư',
         },
      ],
   },
   // SUPPLIES_DETAILS
   {
      name: MODULE_PAGE.SUPPLIES_DETAILS,
      title: 'Vật tư chi tiết',
      action: [
         {
            name: PAGE_ACTION.VIEW_ALL,
            title: 'Xem Danh sách Vật tư chi tiết',
         },
         {
            name: PAGE_ACTION.VIEW_ONE,
            title: 'Xem Chi tiết thông tin Vật tư chi tiết',
         },
         {
            name: PAGE_ACTION.CREATE,
            title: 'Thêm mới thông tin Vật tư chi tiết',
         },
         {
            name: PAGE_ACTION.DELETE,
            title: 'Xóa thông tin Vật tư chi tiết',
         },
         {
            name: PAGE_ACTION.UPDATE,
            title: 'Cập nhật thông tin Vật tư chi tiết',
         },
      ],
   },
   // WAREHOUSES
   {
      name: MODULE_PAGE.WAREHOUSES,
      title: 'kho hàng',
      action: [
         {
            name: PAGE_ACTION.VIEW_ALL,
            title: 'Xem Danh sách kho hàng',
         },
         {
            name: PAGE_ACTION.VIEW_ONE,
            title: 'Xem Chi tiết thông tin kho hàng',
         },
         {
            name: PAGE_ACTION.CREATE,
            title: 'Thêm mới thông tin kho hàng',
         },
         {
            name: PAGE_ACTION.DELETE,
            title: 'Xóa thông tin kho hàng',
         },
         {
            name: PAGE_ACTION.UPDATE,
            title: 'Cập nhật thông tin kho hàng',
         },
      ],
   },
   // REPAIR_ORDERS
   {
      name: MODULE_PAGE.REPAIR_ORDERS,
      title: 'Hóa đơn sử chữa',
      action: [
         {
            name: PAGE_ACTION.VIEW_ALL,
            title: 'Xem Danh sách hóa đơn sử chữa',
         },
         {
            name: PAGE_ACTION.VIEW_ONE,
            title: 'Xem Chi tiết thông tin hóa đơn sử chữa',
         },
         {
            name: PAGE_ACTION.CREATE,
            title: 'Thêm mới thông tin hóa đơn sử chữa',
         },
         {
            name: PAGE_ACTION.DELETE,
            title: 'Xóa thông tin hóa đơn sử chữa',
         },
         {
            name: PAGE_ACTION.UPDATE,
            title: 'Cập nhật thông tin hóa đơn sử chữa',
         },
      ],
   },
   // REPAIR_SERVICES
   {
      name: MODULE_PAGE.REPAIR_SERVICES,
      title: 'Dịch vụ sửa chữa',
      action: [
         {
            name: PAGE_ACTION.VIEW_ALL,
            title: 'Xem Danh sách dịch vụ sửa chữa',
         },
         {
            name: PAGE_ACTION.VIEW_ONE,
            title: 'Xem Chi tiết thông tin dịch vụ sửa chữa',
         },
         {
            name: PAGE_ACTION.CREATE,
            title: 'Thêm mới thông tin dịch vụ sửa chữa',
         },
         {
            name: PAGE_ACTION.DELETE,
            title: 'Xóa thông tin dịch vụ sửa chữa',
         },
         {
            name: PAGE_ACTION.UPDATE,
            title: 'Cập nhật thông tin dịch vụ sửa chữa',
         },
      ],
   },
];
