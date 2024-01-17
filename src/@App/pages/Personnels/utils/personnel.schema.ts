/* eslint-disable @typescript-eslint/naming-convention */
import messageValidate from '@App/helpers/messageValidate';
import Regexs from '@Core/Configs/Regexs';
import * as yup from 'yup';

export const validationFormCreate = yup.object({
   full_name: yup.string().required(messageValidate.required('Tên')).default(''),
   account_name: yup.string().min(8, messageValidate.minText('Tài khoản', 8)),
   password: yup.string().matches(Regexs.password, 'Mật khẩu tối thiểu 8 ký tự, 1 số, 1 chữ cái viết hoa'),
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
