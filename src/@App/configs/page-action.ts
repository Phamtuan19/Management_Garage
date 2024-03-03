import * as yup from 'yup';

const PAGE_ACTION = {
   VIEW_ALL: 'VIEW_ALL',
   VIEW_ONE: 'VIEW_ONE',
   CREATE: 'CREATE',
   UPDATE: 'UPDATE',
   DELETE: 'DELETE',
   IS_LOCK: 'IS_LOCK',
   UPDATE_STATUS_REPAIR_ORDER: 'UPDATE_STATUS_REPAIR_ORDER',
} as const;

export const pageActionSchema = yup.string().oneOf(Object.values(PAGE_ACTION)).required();

export type PageActionPropsType = yup.InferType<typeof pageActionSchema>;

export default PAGE_ACTION;
