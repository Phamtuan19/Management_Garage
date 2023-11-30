import messageValidate from '@App/helpers/messageValidate';
import * as yup from 'yup';

export const permissionSchema = yup.object({
   title: yup
      .string()
      .required(messageValidate.required('Tên hiển thị'))
      .trim('Vui lòng bỏ khoảng trống')
      .strict(true)
      .default(''),
   name: yup
      .string()
      .required(messageValidate.required('Tên module'))
      .trim('Vui lòng bỏ khoảng trống')
      .strict(true)
      .default(''),
   action: yup.array().min(1, messageValidate.required('Action')).default([]),
   description: yup.string().trim('Vui lòng bỏ khoảng trống').strict(true).default(''),
});

export type PermissionSchemaType = yup.InferType<typeof permissionSchema>;