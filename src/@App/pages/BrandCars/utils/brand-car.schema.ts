import messageValidate from '@App/helpers/messageValidate';
import * as yup from 'yup';

export const brandCarSchema = yup.object({
   name: yup.string().required(messageValidate.required('Tên thương hiệu')).default(''),
   models: yup.array().of(yup.string()),
});

export type BrandCarSchema = yup.InferType<typeof brandCarSchema>;
