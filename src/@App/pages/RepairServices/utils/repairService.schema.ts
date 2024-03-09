import messageValidate from '@App/helpers/messageValidate';
import * as yup from 'yup';

export const validationFormCreate = yup.object({
   name: yup.string().required(messageValidate.required('Tên')).default(''),
   price: yup.number().required(messageValidate.required('Giá')).default(0),
   discount: yup
      .number()
      .typeError('Giá phải là một số')
      .min(0, messageValidate.minNumber('Giảm giá', 0))
      .max(100, messageValidate.maxNumber('Giảm giá', 100))
      .default(0),
   describe: yup.string().default(''),

   // details: yup
   //    .array()
   //    .of(
   //       yup.object({
   //          name: yup.string().required(messageValidate.required('Tên')).default(''),
   //          describe: yup.string().required(messageValidate.required('Mô tả')).default(''),
   //       }),
   //    )
   //    .default([{ name: '', describe: '' }]),

   details: yup.lazy((value) =>
      Array.isArray(value) && value.length > 0
         ? yup.array().of(
              yup.object().shape({
                 name: yup.string().required(messageValidate.required('Tên')).default(''),
                 describe: yup.string().required(messageValidate.required('Mô tả')).default(''),
              }),
           )
         : yup.array().of(
              yup.object().shape({
                 name: yup.string().default(''),
                 describe: yup.string().default(''),
              }),
           ),
   ),
});
export type RepairServiceSchema = yup.InferType<typeof validationFormCreate>;
