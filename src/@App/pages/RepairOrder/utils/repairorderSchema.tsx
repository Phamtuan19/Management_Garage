/* eslint-disable @typescript-eslint/naming-convention */

import messageValidate from '@App/helpers/messageValidate';
import * as yup from 'yup';

const serviceOrder = yup
   .array()
   .of(
      yup.object({
         supplies_detail_id: yup.string(), // id của chi tiết vật tư
         supplies_detail_name: yup.string(),
         quantity: yup.number(),
         price: yup.number(),
         surcharge: yup.number(),
         discount: yup.number(),
         describe: yup.string(),
      }),
   )
   .default([]);

export type ServiceOrderSchema = yup.InferType<typeof serviceOrder>;

const suppliesOrder = yup
   .array()
   .of(
      yup.object({
         repair_service_id: yup.string(), // id của bảng dịch vụ sửa chữa
         repair_service_name: yup.string(),
         quantity: yup.number(),
         price: yup.number(),
         surcharge: yup.number(),
         discount: yup.number(),
         describe: yup.string(),
      }),
   )
   .default([]);

export type SuppliesOrderSchema = yup.InferType<typeof suppliesOrder>;

export const repairorderSchema = yup.object({
   code: yup.string().required(messageValidate.required('Mã phiếu sửa chữa')).trim().default(''),
   personnel_id: yup.string().required(messageValidate.required('Nhân viên tạo')).default(''),

   customer_id: yup.string().required(messageValidate.required('Khách hàng')).default(''),

   car_id: yup.string().required(messageValidate.required('Xe')),
   kilometer: yup.string().required(messageValidate.required('Số km')).trim().strict(true).default(''),
   status: yup.string().required(messageValidate.required('Trạng thái')).trim().strict(true).default(''),
   describe: yup.string().required(messageValidate.required('Mô tả')).trim().strict(true).default(''),

   serviceOrder: serviceOrder,

   suppliesOrder: suppliesOrder,
});

export type RepairorderSchema = yup.InferType<typeof repairorderSchema>;
