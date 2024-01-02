/* eslint-disable @typescript-eslint/naming-convention */
import messageValidate from '@App/helpers/messageValidate';
import Regexs from '@Core/Configs/Regexs';
import * as yup from 'yup';

export const distributorSchema = yup.object({
   name: yup
      .string()
      .required(messageValidate.required('Tên nhà phân phối'))
      .trim()
      .strict(true)
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

   bank_number: yup
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

   bank_account_name: yup.string().trim().strict(true).default(''),

   province: yup.string().trim().strict(true).default(''),

   district: yup.string().trim().strict(true).default(''),

   ward: yup.string().trim().strict(true).default(''),

   address: yup.string().trim().strict(true).default(''),
});

export type DistributorSchema = yup.InferType<typeof distributorSchema>;
