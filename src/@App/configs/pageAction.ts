import * as yup from 'yup';

const PAGEACTION = {
   view: 'view',
   create: 'create',
   show: 'show',
   edit: 'edit',
} as const;

export const pageActionSchema = yup.string().oneOf(Object.values(PAGEACTION));

export type PageActionPropsType = yup.InferType<typeof pageActionSchema>;

export default PAGEACTION;
