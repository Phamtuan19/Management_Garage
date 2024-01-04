import * as yup from 'yup';

const MODULE_PAGE = {
   DOASHBOARD: 'DOASHBOARD',

   PERSONNELS: 'PERSONNELS',

   CUSTOMERS: 'CUSTOMERS',

   ROLES: 'ROLES',

   DISTRIBUTORS: 'DISTRIBUTORS',

   MATERIALS_CATALOGS: 'MATERIALS_CATALOGS',

   SUPPLIES: 'SUPPLIES',

   SUPPLIES_INVOICE: 'SUPPLIES_INVOICE',

   WAREHOUSES: 'WAREHOUSES',
} as const;

export const modulePageSchema = yup.string().oneOf(Object.values(MODULE_PAGE)).required();

export type ModulePagePropsType = yup.InferType<typeof modulePageSchema>;

export default MODULE_PAGE;
