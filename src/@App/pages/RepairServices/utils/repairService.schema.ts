import messageValidate from '@App/helpers/messageValidate';
import * as yup from 'yup';

export const validationFormCreate = yup.object({
   name: yup.string().required(messageValidate.required('Tên')).default(''),
   price: yup.number()
   .required(messageValidate.required('Giá'))
   .typeError('Giá phải là một số') 
   .nullable(),
   discount: yup.number()
   .required(messageValidate.required('Giảm giá'))
   .min(10, messageValidate.minNumber('Giảm giá', 10)) 
   .max(100, messageValidate.maxNumber('Giảm giá', 100))
   .typeError('Giá phải là một số')
   .nullable(),
});
export type RepairServiceSchema = yup.InferType<typeof validationFormCreate>;
