import * as yup from 'yup';

const ROUTE_PATH = {
   DOASHBOARD: '/',

   // module personnels
   PERSONNELS: '/personnel',

   CUSTOMERS: '/customers',

   ROLES: '/roles',

   DISTRIBUTORS: '/distributors',

   MATERIALSCATALOG: '/materials-catalog',

   SIGN_IN: '/sign-in',

   CREATE: '/create',

   UPDATE: '/:id',
} as const;

export const routePathSchema = yup.string().oneOf(Object.values(ROUTE_PATH)).required();

export type RoutePathPropsType = yup.InferType<typeof routePathSchema>;

export default ROUTE_PATH;
