import messageValidate from '@App/helpers/messageValidate';
// import Regexs from '@Core/Configs/Regexs';
import * as yup from 'yup';

export const validationFormLogin = yup.object({
   email: yup
      .string()
      .required(messageValidate.required('Email'))
      // .matches(Regexs.email, messageValidate.format('email'))
      .max(100, messageValidate.maxText('Email', 100))
      .default('admin'),
   password: yup
      .string()
      .required(messageValidate.required('Mật khẩu'))
      // .min(6, messageValidate.minText('Mật khẩu', 6))
      // .matches(Regexs.uppercaseCharacters, 'Mật khẩu phải có ít nhất 1 ký tự viết hoa')
      // .matches(Regexs.characterCharacter, 'Mật khẩu phải có ít nhất 1 ký đặc biệt')
      .default('admin1234'),
});

export type FormLoginProps = yup.InferType<typeof validationFormLogin>;
