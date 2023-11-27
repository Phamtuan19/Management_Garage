import * as yup from 'yup';

const ROUTE_PATH = {
   DOASHBOARD: '/',

   // module personnels
   PERSONNELS: '/personnels',

   PERMISSIONS: '/permissions',

   SIGN_IN: '/sign-in',

   CREATE: '/create',
} as const;

export const routePathSchema = yup.string().oneOf(Object.values(ROUTE_PATH)).required();

export type RoutePathPropsType = yup.InferType<typeof routePathSchema>;

export default ROUTE_PATH;
