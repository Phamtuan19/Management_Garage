import messageValidate from '@App/helpers/messageValidate';
import Regexs from '@Core/Configs/Regexs';
import * as yup from 'yup';

export const userSchema = yup.object({
    name: yup.string().required(messageValidate.required('Tên')).default(''),
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

   cmnd: yup
      .string()
      .required(messageValidate.required('CMND'))
      .matches(Regexs.cmnd, messageValidate.format('CMND'))
      .default(''),
   gender: yup.string().required(messageValidate.required('Giới tính')).default('nu'),
})