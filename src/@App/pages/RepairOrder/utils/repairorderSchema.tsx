/* eslint-disable @typescript-eslint/naming-convention */

import messageValidate from '@App/helpers/messageValidate';
import { PAYMENT_TYPE } from '@App/configs/status-config';
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
         // transaction: yup.object({
         //    total_price: yup.number().min(0).default(0),
         //    transfer_money: yup.number().min(0).default(0),
         //    cash_money: yup.number().min(0).default(0),
         //    payment_type: yup.string().default(PAYMENT_TYPE.EMPTY),
         // }),
      }),
   )
   .default([]);

export type ServiceOrderSchema = yup.InferType<typeof serviceOrder>;

const suppliesOrder = yup
   .array()
   .of(
      yup.object({
         code: yup.string().default(''), // mã code của vật tư chi tiết
         name_detail: yup.string().default(''), // tên của vật tư chi tiết
         distributor_name: yup.string().default(''),
         supplies_detail_id: yup.string().default(''), // id của chi tiết vật tư
         quantity: yup.number().default(0), // số lượn sản phẩm đang chọn
         selling_price: yup.number().default(0), // Giá bán ra
         discount: yup.number().default(0), // giá khuyến mại
         describe: yup.string().default(''), // mô tả
         supplies_invoices_code: yup.string().default(''), // mã code của hóa đơn nhập
         supplies_invoices_id: yup.string().default(''), // mã id của hóa đơn nhập
         total_supplies_crrent: yup.number().default(0),
      }),
   )
   .default([]);

export type SuppliesOrderSchema = yup.InferType<typeof suppliesOrder>;

export const repairorderSchema = yup.object({
   code: yup.string().default(''),
   personnel_id: yup.string().required(messageValidate.required('Nhân viên tạo')).default(''),

   customer: yup.object({
      customer_id: yup.string().required(messageValidate.required('Người dùng')).default(''),
      phone: yup.string().default(''),
      email: yup.string().default(''),
      license_plate: yup.string().default(''),
   }),

   car: yup.object({
      car_id: yup.string().required(messageValidate.required('Xe')),
      kilometer: yup.string().required(messageValidate.required('Số km')).default(''),
      license_plate: yup.string().default(''),
      car_type: yup.string().default(''),
      car_color: yup.string().default(''),
      brand_car: yup.string().default(''),
   }),

   serviceOrder: serviceOrder,

   suppliesOrder: suppliesOrder,

   filterSearch: yup.object({
      distributor_id: yup.string(),
      supplies_detail: yup.string(),
   }),
   transaction: yup.object({
      total_price: yup.number().min(0).default(0),
      transfer_money: yup.number().min(0).default(0),
      cash_money: yup.number().min(0).default(0),
      payment_type: yup.string().default(PAYMENT_TYPE.EMPTY),
   }),
});

export type RepairorderSchema = yup.InferType<typeof repairorderSchema>;
