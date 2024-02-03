import messageValidate from '@App/helpers/messageValidate';
import * as yup from 'yup';

export const validationFormCreate = yup.object({
   name: yup.string().required(messageValidate.required('Tên')).default(''),
   price: yup.number().required(messageValidate.required('Giá')),
   discount: yup.number(),
});
export type RepairServiceSchema = yup.InferType<typeof validationFormCreate>;
