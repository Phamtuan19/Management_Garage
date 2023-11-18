import * as yup from 'yup';

const MODULE_PAGE = {
   DOASHBOARD: 'doashboard',
   USERS: 'users',
   PRODUCTS: 'products',
} as const;

export const modulePageSchema = yup.string().oneOf(Object.values(MODULE_PAGE)).required();

export type ModulePagePropsType = yup.InferType<typeof modulePageSchema>;

export default MODULE_PAGE;
