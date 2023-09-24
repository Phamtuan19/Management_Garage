import * as yup from 'yup';

export const yupSchema = yup.object().shape({
   name: yup.string().required(),
   category: yup.string().required(),
   checkName: yup.string().required(),
});

export type YupSchema = yup.InferType<typeof yupSchema>;
