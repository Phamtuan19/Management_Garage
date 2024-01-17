/* eslint-disable @typescript-eslint/naming-convention */
import messageValidate from '@App/helpers/messageValidate';
import Regexs from '@Core/Configs/Regexs';
import * as yup from 'yup';

export const validationFormCreate = yup.object({
   full_name: yup.string().required(messageValidate.required('Tên')).default(''),
   account_name: yup.string().required(messageValidate.required('Tài khoản')),
   password: yup.string().required(messageValidate.required('Mật khẩu')),
   avatar: yup.string().required(messageValidate.required('Ảnh đại diện')),
   email: yup
      .string()
      .required(messageValidate.required('Email'))
      .matches(Regexs.email, messageValidate.format('Email'))
      .max(100, messageValidate.maxText('Email', 100))
      .default(''),
   phone: yup
      .string()
      .required(messageValidate.required('SĐT'))
      .matches(Regexs.phoneVn, messageValidate.format('SĐT'))
      .default(''),
   role_id: yup.string().required(messageValidate.required('Bộ phận')).default(''),
   gender: yup.string().required(messageValidate.required('Giới tính')).default('Nam'),
});

export type ValidationFormCreate = yup.InferType<typeof validationFormCreate>;
