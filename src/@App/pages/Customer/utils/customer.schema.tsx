/* eslint-disable @typescript-eslint/naming-convention */
import messageValidate from '@App/helpers/messageValidate';
import Regexs from '@Core/Configs/Regexs';
import * as yup from 'yup';

export const customerSchema = yup.object({
   name: yup
      .string()
      .required(messageValidate.required('Tên khách hàng'))
      .trim()
      .strict(true)
      .max(60, messageValidate.maxText('Tên khách hàng', 60))
      .default(''),
   phone: yup
      .string()
      .required(messageValidate.required('Số điện thoại'))
      .trim()
      .strict(true)
      .matches(Regexs.phoneVn, messageValidate.format('Số điện thoại'))
      .default(''),
    gender: yup
    .string()
    .required('Giới tính không được để trống')
    // .oneOf(['male', 'female', 'other'], 'Giới tính không hợp lệ'),
});

export type CustomerSchema = yup.InferType<typeof customerSchema>;
