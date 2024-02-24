import * as yup from 'yup';

export const ResetpassSchema = yup.object({
   oldPassword: yup.string().required('Mật khẩu cũ là trường bắt buộc'),
   newPassword: yup.string().required('Mật khẩu mới là trường bắt buộc'),
   confirmPassword: yup.string().oneOf([yup.ref('newPassword')], 'Xác nhận mật khẩu không khớp'),
});

export type ResetpassSchema = yup.InferType<typeof ResetpassSchema>;
