/* eslint-disable @typescript-eslint/naming-convention */

import messageValidate from '@App/helpers/messageValidate';
import * as yup from 'yup';

const serviceOrder = yup
   .array()
   .of(
      yup.object({
         repair_service_id: yup.string().default(''), // id của bảng dịch vụ sửa chữa
         repair_service_name: yup.string().default(''),
         quantity: yup.number().default(0),
         price: yup.number().default(0),
         surcharge: yup.number().default(0),
         discount: yup.number().default(0),
         describe: yup.string().default(''),
      }),
   )
   .default([]);

export type ServiceOrderSchema = yup.InferType<typeof serviceOrder>;

const suppliesOrder = yup
   .array()
   .of(
      yup.object({
         code: yup.string().default(''),
         distributor_id: yup.string().default(''),
         supplies_detail_id: yup.string().default(''), // id của chi tiết vật tư
         quantity: yup.number().default(0),
         selling_price: yup.number().default(0),
         discount: yup.number().default(0),
         describe: yup.string().default(''),
         supplies_invoices_code: yup.string().default(''),
      }),
   )
   .default([]);

export type SuppliesOrderSchema = yup.InferType<typeof suppliesOrder>;

export const repairorderSchema = yup.object({
   code: yup.string().required(messageValidate.required('Mã phiếu sửa chữa')).default(''),
   personnel_id: yup.string().required(messageValidate.required('Nhân viên tạo')).default(''),

   customer_id: yup.string().required(messageValidate.required('Khách hàng')).default(''),

   car_id: yup.string().required(messageValidate.required('Xe')),
   kilometer: yup.string().required(messageValidate.required('Số km')).default(''),
   status: yup.string().required(messageValidate.required('Trạng thái')).default(''),
   describe: yup.string().required(messageValidate.required('Mô tả')).default(''),

   serviceOrder: serviceOrder,

   suppliesOrder: suppliesOrder,
});

export type RepairorderSchema = yup.InferType<typeof repairorderSchema>;
