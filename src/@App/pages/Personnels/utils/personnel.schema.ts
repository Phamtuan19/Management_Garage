import messageValidate from '@App/helpers/messageValidate';
import Regexs from '@Core/Configs/Regexs';
import * as yup from 'yup';

export const validationFormCreate = yup.object({
   name: yup.string().required(messageValidate.required('Tên')).default(''),

   email: yup
      .string()
      .required(messageValidate.required('Email'))
      .matches(Regexs.email, messageValidate.format('Email'))
      .max(100, messageValidate.maxText('Email', 100))
      .default(''),
   address: yup.string().required(messageValidate.required('Địa chỉ')).default(''),
   sdt: yup
      .string()
      .required(messageValidate.required('SĐT'))
      .matches(Regexs.phoneVn, messageValidate.format('SĐT'))
      .default(''),

   cmnd: yup
      .string()
      .required(messageValidate.required('CMND'))
      .matches(Regexs.cmnd, messageValidate.format('CMND'))
      .default(''),

   role: yup.string().required(messageValidate.required('Bộ phận')).default(''),
   gender: yup.string().required(messageValidate.required('Giới tính')).default('nu'),
   status: yup.string().required(messageValidate.required('Trạng thái')).default('absent'),
});

export type ValidationFormCreate = yup.InferType<typeof validationFormCreate>;
