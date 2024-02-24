/* eslint-disable @typescript-eslint/naming-convention */
import Regexs from '@Core/Configs/Regexs';
import * as yup from 'yup';

export const resetPasswordSchema = yup.object({
   old_password: yup
      .string()
      .required('Mật khẩu cũ là trường bắt buộc')
      .matches(Regexs.password, 'Mật khẩu tối thiểu 8 ký tự, 1 số, 1 chữ cái viết hoa')
      .default(''),
   new_password: yup
      .string()
      .required('Mật khẩu mới là trường bắt buộc')
      .matches(Regexs.password, 'Mật khẩu tối thiểu 8 ký tự, 1 số, 1 chữ cái viết hoa')
      .default(''),
   confirmPassword: yup
      .string()
      .oneOf([yup.ref('new_password')], 'Xác nhận mật khẩu không khớp')
      .default(''),
});

export type ResetPasswordType = yup.InferType<typeof resetPasswordSchema>;
