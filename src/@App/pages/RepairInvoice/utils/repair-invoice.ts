/* eslint-disable @typescript-eslint/naming-convention */
import messageValidate from '@App/helpers/messageValidate';
import * as yup from 'yup';

const suppliesInvoice = yup
   .array()
   .of(
      yup.object({
         supplies_detail_code: yup.string().default(''), // mã code của vật tư chi tiết
         supplies_detail_id: yup.string().default(''), // id của chi tiết vật tư
         supplies_detail_name: yup.string().default(''), // tên của chi tiết vật tư
         quantity: yup.number().default(0), // số lượng sản phẩm đang chọn
         selling_price: yup.number().default(0), // giá bán của sản phẩm đang chọn
         // describe: yup.string().default(''), // mô tả
         supplies_invoices_code: yup.string().default(''), // mã code của hóa đơn nhập
         supplies_invoices_id: yup.string().default(''), // mã id của hóa đơn nhập
         inventory: yup.number().default(0), // số lượng tồn kho
         distributor_name: yup.string().default(''),
         supplies_id: yup.string().default(''), // id của vật tư chính
      }),
   )
   .default([]);

export type SuppliesInvoicesSchema = yup.InferType<typeof suppliesInvoice>;

export const repairInvoiceSchema = yup.object({
   personnel_id: yup.string().required(messageValidate.required('Nhân viên tạo phiếu')).default(''),

   customer: yup.object({
      customer_id: yup.string().required(messageValidate.required('Khách hàng')).default(''),
      phone: yup.string().default(''),
      email: yup.string().default(''),
   }),

   car: yup.object({
      car_id: yup.string().required(messageValidate.required('Xe')).default(''),
      car_color: yup.string().default(''),
      car_type: yup.string().default(''),
      brand_car: yup.string().default(''),
      license_plate: yup.string().default(''),
   }),

   suppliesInvoice: suppliesInvoice,
});

export type RepairInvoiceSchema = yup.InferType<typeof repairInvoiceSchema>;
