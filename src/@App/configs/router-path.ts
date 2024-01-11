import * as yup from 'yup';

const ROUTE_PATH = {
   DOASHBOARD: '/',

   // module HR
   PERSONNELS: '/hr/personnels',

   ROLES: '/hr/roles',

   // module
   CUSTOMERS: '/customers',

   DISTRIBUTORS: '/distributors',

   MATERIALS_CATALOGS: '/materials-catalogs',

   SUPPLIES: '/supplies',

   WAREHOUSES: '/warehouses',

   SIGN_IN: '/sign-in',

   CREATE: '/create',

   UPDATE: '/update/:id',

   DETAIL: '/:id',
} as const;

export const routePathSchema = yup.string().oneOf(Object.values(ROUTE_PATH)).required();

export type RoutePathPropsType = yup.InferType<typeof routePathSchema>;

export default ROUTE_PATH;
