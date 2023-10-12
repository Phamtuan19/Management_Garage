import messageValidate from '@App/helpers/messageValidate';
import Regexs from '@Core/Configs/Regexs';
import * as yup from 'yup';

export const validationFormRegister = yup.object({
   lastName: yup.string().required(messageValidate.required('Họ')).max(50, messageValidate.maxText('Họ', 50)),
   firstName: yup.string().required(messageValidate.required('Tên')).max(50, messageValidate.maxText('Tên', 50)),
   email: yup
      .string()
      .required(messageValidate.required('Email'))
      .matches(Regexs.email, messageValidate.email)
      .max(100, messageValidate.maxText('Email', 100)),
   password: yup
      .string()
      .required(messageValidate.required('Mật khẩu'))
      .min(6, messageValidate.minText('Mật khẩu', 6))
      .matches(Regexs.uppercaseCharacters, 'Mật khẩu phải có ít nhất 1 ký tự viết hoa')
      .matches(Regexs.characterCharacter, 'Mật khẩu phải có ít nhất 1 ký đặc biệt'),
});

export type FormRegisterProps = yup.InferType<typeof validationFormRegister>;
