import * as yup from 'yup';
interface ModulePage {
   readonly DOASHBOARD: 'DOASHBOARD';
   readonly PERSONNELS: 'PERSONNELS';
   readonly CUSTOMERS: 'CUSTOMERS';
   readonly ROLES: 'ROLES';
   readonly DISTRIBUTORS: 'DISTRIBUTORS';
   readonly MATERIALS_CATALOGS: 'MATERIALS_CATALOGS';
   readonly SUPPLIES: 'SUPPLIES';
   readonly CARS: 'CARS';
   readonly SUPPLIES_INVOICE: 'SUPPLIES_INVOICE';
   readonly WAREHOUSES: 'WAREHOUSES';
   readonly REPAIR_ORDERS: 'REPAIR_ORDERS';
   readonly REPAIR_SERVICES: 'REPAIR_SERVICES';
}
const MODULE_PAGE: ModulePage = {
   DOASHBOARD: 'DOASHBOARD',

   PERSONNELS: 'PERSONNELS',

   CUSTOMERS: 'CUSTOMERS',

   ROLES: 'ROLES',

   DISTRIBUTORS: 'DISTRIBUTORS',

   MATERIALS_CATALOGS: 'MATERIALS_CATALOGS',

   SUPPLIES: 'SUPPLIES',

   CARS: 'CARS',

   SUPPLIES_INVOICE: 'SUPPLIES_INVOICE',

   SUPPLIES_DETAILS: 'SUPPLIES_DETAILS',

   WAREHOUSES: 'WAREHOUSES',

   REPAIR_ORDERS: 'REPAIR_ORDERS',

   REPAIR_SERVICES: 'REPAIR_SERVICES',
};

export const modulePageSchema = yup.string().oneOf(Object.values(MODULE_PAGE)).required();

export type ModulePagePropsType = yup.InferType<typeof modulePageSchema>;

export default MODULE_PAGE;
