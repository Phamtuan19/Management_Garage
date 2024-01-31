import * as yup from 'yup';

const ROUTE_PATH = {
   DOASHBOARD: '/',

   // module HR
   PERSONNELS: '/hr/personnels',

   ROLES: '/hr/roles',

   // module kho (warehouse)
   CUSTOMERS: '/wh/customers',

   DISTRIBUTORS: '/wh/distributors',

   MATERIALS_CATALOGS: '/wh/materials-catalogs',

   SUPPLIES: '/wh/supplies',

   CARS: '/fix/cars',

   // Module sửa chữa FIX
   REPAIR_ORDERS: '/fix/repair-orders',

   REPAIR_SERVICES: '/fix/repair-services',

   WAREHOUSES: '/wh/warehouses',

   SIGN_IN: '/sign-in',

   CREATE: '/create',

   UPDATE: '/:id/update',

   DETAILS: '/:id/details',
} as const;

export const routePathSchema = yup.string().oneOf(Object.values(ROUTE_PATH)).required();

export type RoutePathPropsType = yup.InferType<typeof routePathSchema>;

export default ROUTE_PATH;
