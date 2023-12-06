import * as yup from 'yup';

const MODULE_PAGE = {
   DOASHBOARD: 'doashboard',
   PERSONNELS: 'personnels',
   PERMISSIONS: 'permissions',
   WAREHOUSE: 'warehouse',
   DISTRIBUTORS: 'distributors',
   STAFF: 'staff',
   MATERIACATALOG: 'materialCatalog',
   MATERIAL: 'material',
   CAR: 'car',
} as const;

export const modulePageSchema = yup.string().oneOf(Object.values(MODULE_PAGE)).required();

export type ModulePagePropsType = yup.InferType<typeof modulePageSchema>;

export default MODULE_PAGE;
