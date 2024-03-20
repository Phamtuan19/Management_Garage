/* eslint-disable @typescript-eslint/naming-convention */
import messageValidate from '@App/helpers/messageValidate';
import Regexs from '@Core/Configs/Regexs';
import * as yup from 'yup';

export const profileUpdateSchema = yup.object({
   full_name: yup
      .string()
      .required(messageValidate.required('Họ và tên'))
      .max(50, messageValidate.maxText('Họ và tên', 50))
      .default(''),
   email: yup
      .string()
      .required(messageValidate.required('Email'))
      .matches(Regexs.email, messageValidate.format('Email'))
      .max(100, messageValidate.maxText('Email', 100))
      .default(''),
   gender: yup.string().required('Giới tính không được để trống').default('Nam'),
   birth_day: yup.string().default(''),
   phone: yup
      .string()
      .required(messageValidate.required('SĐT'))
      .matches(Regexs.phoneVn, messageValidate.format('SĐT'))
      .default(''),
   cccd_number: yup
      .string()
      .required(messageValidate.required('Cccd'))
      .matches(/^.{12}$/, messageValidate.format('Cccd'))
      .default(''),
   bank_account_number: yup
      .string()
      .required(messageValidate.required('Số tài khoản'))
      .matches(/^\d{10,13}$/, messageValidate.format('Số tài khoản'))
      .default(''),
   bank_name: yup.string().required(messageValidate.required('Tên ngân hàng')).max(100, 'Tên ngân hàng').default(''),
   bank_branch: yup.string().required(messageValidate.required('Chi nhánh')).max(100, 'Chi nhánh').default(''),
   account_holder_name: yup
      .string()
      .max(50, 'Tên chủ tài khoản')
      .required(messageValidate.required('Tên chủ tài khoản'))
      .default(''),
});

export type ProfileUpdateType = yup.InferType<typeof profileUpdateSchema>;
