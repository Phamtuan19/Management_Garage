/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import * as yup from 'yup';
import messageValidate from '@App/helpers/messageValidate';

export const suppliesInvoicesSchema = yup.object({
   personnel_id: yup.string().required(messageValidate.required).default(''),
   details: yup.lazy((value: any) =>
      Array.isArray(value) && value.length > 0
         ? yup
              .array()
              .of(
                 yup.object().shape({
                    supplies_detail_id: yup
                       .string()
                       .required(messageValidate.required('Vật tư'))
                       .strict(true)
                       .trim(messageValidate.trim())
                       .default(''),
                    quantity_received: yup
                       .string()
                       .required(messageValidate.required('Số lượng'))
                       .strict(true)
                       .trim(messageValidate.trim())
                       .default(''),
                    cost_price: yup
                       .string()
                       .required(messageValidate.required('Giá nhập'))
                       .strict(true)
                       .trim(messageValidate.trim())
                       .default(''),
                    selling_price: yup.string().strict(true).trim(messageValidate.trim()).default(''),
                    describe: yup.string().strict(true).trim(messageValidate.trim()).default(''),
                 }),
              )
              .default([])
         : yup
              .array()
              .of(
                 yup.object().shape({
                    supplies_detail_id: yup.string().strict(true).trim(messageValidate.trim()).default(''),
                    quantity_received: yup.string().strict(true).trim(messageValidate.trim()).default(''),
                    cost_price: yup.string().strict(true).trim(messageValidate.trim()).default(''),
                    selling_price: yup.string().strict(true).trim(messageValidate.trim()).default(''),
                    describe: yup.string().strict(true).trim(messageValidate.trim()).default(''),
                 }),
              )
              .default([]),
   ),
});

export type SuppliesInvoicesSchema = yup.InferType<typeof suppliesInvoicesSchema>;