import * as yup from 'yup';

const ROUTE_PATH = {
   DOASHBOARD: '/',

   // module HR
   PERSONNELS: '/hr/personnels',

   ROLES: '/hr/roles',

   // module WH

   WAREHOUSES: '/wh/warehouses',

   DISTRIBUTORS: '/wh/distributors',

   MATERIALS_CATALOGS: '/wh/materials-catalogs',

   SUPPLIES: '/wh/supplies',

   SUPPLIES_DETAILS: '/wh/supplies-details',

   DELIVERY_NOTES: '/wh/delivery', // phiếu xuất kho

   // Module sửa chữa FIX
   CARS: '/fix/cars',

   BRAND_CARS: '/fix/band-cars',

   REPAIR_INVOICE: '/fix/repair-invoices',

   REPAIR_SERVICES: '/fix/repair-services',

   CUSTOMERS: '/customers',

   // Profile
   USER_PROFILE: '/user/profile',

   RESET_PASSWORD: '/reset/password',

   SIGN_IN: '/sign-in',

   CREATE: '/create',

   UPDATE: '/:id/update',

   DETAILS: '/:id/details',

   // trs - giao dịch
   SUPPLIES_INVOICES: '/wh/supplies-invoices',
} as const;

export const routePathSchema = yup.string().oneOf(Object.values(ROUTE_PATH)).required();

export type RoutePathPropsType = yup.InferType<typeof routePathSchema>;

export default ROUTE_PATH;
