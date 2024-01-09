import messageValidate from '@App/helpers/messageValidate';
import * as yup from 'yup';

export const materialsCatalogSchema = yup.object({
   name: yup.string().required(messageValidate.required('Tên danh mục')).strict(true).trim().default(''),
   description: yup.string().strict(true).trim().default(''),
});

export type MaterialsCatalogSchema = yup.InferType<typeof materialsCatalogSchema>;
