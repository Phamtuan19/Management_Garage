import * as yup from 'yup';

const MODULE_PAGE = {
   DOASHBOARD: 'DOASHBOARD',

   PERSONNELS: 'PERSONNELS',

   CUSTOMERS: 'CUSTOMERS',

   ROLES: 'ROLES',

   DISTRIBUTORS: 'DISTRIBUTORS',

   MATERIALS_CATALOGS: 'MATERIALS_CATALOGS',

   SUPPLIES: 'SUPPLIES',

   CARS: 'CARS',

   SUPPLIES_INVOICES: 'SUPPLIES_INVOICES',

   SUPPLIES_DETAILS: 'SUPPLIES_DETAILS',

   WAREHOUSES: 'WAREHOUSES',

   REPAIR_ORDERS: 'REPAIR_ORDERS',

   REPAIR_SERVICES: 'REPAIR_SERVICES',

   USER_PROFILE: 'USER_PROFILE',
} as const;

export const modulePageSchema = yup.string().oneOf(Object.values(MODULE_PAGE)).required();

export type ModulePagePropsType = yup.InferType<typeof modulePageSchema>;

export default MODULE_PAGE;
