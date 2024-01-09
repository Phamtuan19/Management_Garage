/* eslint-disable @typescript-eslint/naming-convention */
import messageValidate from '@App/helpers/messageValidate';
import Regexs from '@Core/Configs/Regexs';
import * as yup from 'yup';

export const validationFormCreate = yup.object({
   fullname: yup.string().required(messageValidate.required('Tên')).default(''),
   password: yup.string().required(messageValidate.required('Mật khẩu')),
   avatar: yup.string().required(messageValidate.required('Ảnh đại diện')),
   birthday: yup.string().required(messageValidate.required('Ngày sinh')),
   email: yup
      .string()
      .required(messageValidate.required('Email'))
      .matches(Regexs.email, messageValidate.format('Email'))
      .max(100, messageValidate.maxText('Email', 100))
      .default(''),
   address: yup.string().required(messageValidate.required('Địa chỉ')).default(''),
   phone: yup
      .string()
      .required(messageValidate.required('SĐT'))
      .matches(Regexs.phoneVn, messageValidate.format('SĐT'))
      .default(''),

   cmnd: yup.string().required(messageValidate.required('CMND')),
   // .matches(Regexs.cmnd, messageValidate.format('CMND'))
   // .default(''),
   start_day: yup.string().required(messageValidate.required('Ngày bắt đầu')),
   end_day: yup.string().required(messageValidate.required('Ngày kết thúc')),
   role_id: yup.string().required(messageValidate.required('Bộ phận')).default(''),
   gender: yup.string().required(messageValidate.required('Giới tính')).default('nu'),
   working_status: yup.string().required(messageValidate.required('Trạng thái')).default('absent'),
});

export type ValidationFormCreate = yup.InferType<typeof validationFormCreate>;
