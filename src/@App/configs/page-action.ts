import * as yup from 'yup';

const PAGE_ACTION = {
   VIEW: 'view',
   CREATE: 'create',
   SHOW: 'show',
   EDIT: 'edit',
} as const;

export const pageActionSchema = yup.string().oneOf(Object.values(PAGE_ACTION)).required();

export type PageActionPropsType = yup.InferType<typeof pageActionSchema>;

export default PAGE_ACTION;