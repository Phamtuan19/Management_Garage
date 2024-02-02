import messageValidate from '@App/helpers/messageValidate';
import Regexs from '@Core/Configs/Regexs';
import * as yup from 'yup';

export const customerSchema = yup.object({
   name: yup.string().required(messageValidate.required('Tên')).default(''),
   phone: yup
      .string()
      .required(messageValidate.required('SĐT'))
      .matches(Regexs.phoneVn, messageValidate.format('SĐT'))
      .default(''),
   email: yup
      .string()
      .required(messageValidate.required('Email'))
      .matches(Regexs.email, messageValidate.format('Email'))
      .max(100, messageValidate.maxText('Email', 100))
      .default(''),
   gender: yup.string().required('Giới tính không được để trống').default('Nam'),
});

export type CustomerSchema = yup.InferType<typeof customerSchema>;
