/* eslint-disable @typescript-eslint/naming-convention */
import messageValidate from '@App/helpers/messageValidate';
import Regexs from '@Core/Configs/Regexs';
import * as yup from 'yup';

export const distributorSchema = yup.object({
   name: yup
      .string()
      .required(messageValidate.required('Tên nhà phân phối'))
      .max(60, messageValidate.maxText('Tên nhà phân phối', 60))
      .default(''),

   email: yup
      .string()
      .required(messageValidate.required('Email'))
      .trim()
      .strict(true)
      .matches(Regexs.email, messageValidate.format('Email'))
      .default(''),

   phone: yup
      .string()
      .required(messageValidate.required('Số điện thoại'))
      .trim()
      .strict(true)
      .matches(Regexs.phoneVn, messageValidate.format('Số điện thoại'))
      .default(''),

   bank_account_number: yup
      .string()
      .trim()
      .strict(true)
      .test('custom_bank_number', messageValidate.format('Số tài khoản'), (value) => {
         if (value!.length > 0 && !value?.match(Regexs.bankNumber)) {
            return false;
         }

         return true;
      })
      .default(''),

   bank_branch: yup.string().trim().strict(true).default(''),

   bank_name: yup.string().trim().strict(true).default(''),

   account_holder_name: yup.string().trim().strict(true).default(''),

   address: yup.object({

      province: yup.object({
         code: yup.number().default(null),
         name: yup.string().strict(true).default('')
      }),

      district: yup.object({
         code: yup.number().default(null),
         name: yup.string().strict(true).default('')
      }),

      ward: yup.object({
         code: yup.number().default(null),
         name: yup.string().strict(true).default('')
      }),

      specific: yup.string().trim().strict(true).default(''),
   })
});

export type DistributorSchema = yup.InferType<typeof distributorSchema>;
