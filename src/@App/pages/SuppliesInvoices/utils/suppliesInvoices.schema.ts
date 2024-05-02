/* eslint-disable @typescript-eslint/naming-convention */
import * as yup from 'yup';
import messageValidate from '@App/helpers/messageValidate';
import { PAYMENT_TYPE } from '@App/configs/status-config';

export const suppliesInvoicesSchema = yup.object({
   personnel_id: yup.string().required(messageValidate.required).default(''),
   distributor_id: yup.string().min(0).default(''),
   image: yup.string().default(''),
   describe: yup.string().default(''),

   transaction: yup.object({
      total_price: yup.number().min(0).default(0),
      transfer_money: yup.number().min(0).default(0),
      cash_money: yup.number().min(0).default(0),
      payment_type: yup.string().default(PAYMENT_TYPE.EMPTY),
   }),

   details: yup
      .array()
      .of(
         yup.object().shape({
            supplies_invoice_detail_id: yup.string().default(''),
            code: yup.string().default(''), // mã code của vật tư chi tiết
            name_detail: yup.string().default(''),
            unit: yup.string().default(''),

            supplies_detail_id: yup
               .string()
               .required(messageValidate.required('Vật tư'))
               .strict(true)
               .trim(messageValidate.trim())
               .default(''),
            quantity_received: yup.number().default(0),
            cost_price: yup.number().min(1000).default(0),
            selling_price: yup.number().min(1000).default(0),
            discount: yup.number().default(0),
            describe: yup.string().strict(true).trim(messageValidate.trim()).default(''),
            distributor_name: yup.string().default(''),
         }),
      )
      .default([]),
});

export type SuppliesInvoicesSchema = yup.InferType<typeof suppliesInvoicesSchema>;
