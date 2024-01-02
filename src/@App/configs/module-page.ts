import * as yup from 'yup';

const MODULE_PAGE = {
   DOASHBOARD: 'doashboard', // trang thống kê module này chỉ có view
   STAFF: 'staff', // module nhân viên
   PERMISSIONS: 'permission', // module phân quyền
   WAREHOUSE: 'warehouse', // module kho hàng
   DISTRIBUTORS: 'distributor', // module nhà phân phối
   MATERIAL: 'material', // module vật tư
   MATERIALSCATALOG: 'materialsCatalog', // module danh mục vật tư
   CAR: 'car', // module xe
   REPAIRSERVICE: 'repairServices', // module dịch vụ sửa chữa
   USER: 'user', //module người dùng
} as const;

export const modulePageSchema = yup.string().oneOf(Object.values(MODULE_PAGE)).required();

export type ModulePagePropsType = yup.InferType<typeof modulePageSchema>;

export default MODULE_PAGE;
