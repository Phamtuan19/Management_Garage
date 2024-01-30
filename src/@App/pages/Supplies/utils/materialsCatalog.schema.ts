/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */

import messageValidate from '@App/helpers/messageValidate';
import * as yup from 'yup';

const yupSuppliesDetail = yup
   .object()
   .shape({
      distributor_id: yup.string().required(messageValidate.required('Tên danh mục')).strict(true).trim().default(''),
      name_detail: yup.string().required(messageValidate.required('Tên danh mục')).strict(true).trim().default(''),
      describe: yup.string().strict(true).trim(messageValidate.trim()).default(''),
   })
   .default({});

export const yupDetails = yup.object().shape({
   details: yup.array().of(yupSuppliesDetail),
});

export const materialsCatalogSchema = yup.object({
   name: yup.string().required(messageValidate.required('Tên danh mục')).strict(true).trim().default(''),
   materials_catalog_id: yup
      .string()
      .required(messageValidate.required('Danh mục vật tư'))
      .strict(true)
      .trim()
      .default(''),
   unit: yup.string().required(messageValidate.required('Đơn vị tính')).strict(true).trim().default(''),
   discount: yup
      .string()
      .test('checkMax', messageValidate.maxNumber('Đơn vị tính', 100), (value) => {
         if (value) {
            return Number(value) > 100 ? false : true;
         }

         return true;
      })
      .strict(true)
      .trim()
      .default('0'),
   describe: yup.string().strict(true).trim().default(''),
   // details: yup
   //    .array()
   //    .of(yupSuppliesDetail)
   //    .default([{ distributor_id: '', name_detail: '', describe: '' }]),
   details: yup.lazy((value: any) =>
      Array.isArray(value) && value.length > 0
         ? yup.array().of(
              yup
                 .object()
                 .shape({
                    distributor_id: yup
                       .string()
                       .required(messageValidate.required('Tên danh mục'))
                       .strict(true)
                       .trim()
                       .default(''),
                    name_detail: yup.string().strict(true).trim().default(''),
                    describe: yup.string().strict(true).trim(messageValidate.trim()).default(''),
                 })
                 .default({}),
           )
         : yup.array().of(
              yup
                 .object()
                 .shape({
                    distributor_id: yup.string().strict(true).trim().default(''),
                    name_detail: yup.string().strict(true).trim().default(''),
                    describe: yup.string().strict(true).trim(messageValidate.trim()).default(''),
                 })
                 .default({}),
           ),
   ),
});

export type MaterialsCatalogSchema = yup.InferType<typeof materialsCatalogSchema>;
