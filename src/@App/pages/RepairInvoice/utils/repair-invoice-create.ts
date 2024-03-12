/* eslint-disable @typescript-eslint/naming-convention */
import * as yup from 'yup';

const repairService = yup
   .array()
   .of(
      yup.object({
         _id: yup.string().default(''), // _id cua hóa đơn sửa chữa chi tiêt
         repair_invoice_id: yup.string().default(''), // _id của dịch vụ sửa chữa nếu type === "service" nếu type === "supplies" => _id là của vật tư chi tiết
         price: yup.number().default(0),
         discount: yup.number().default(0),
         type: yup.string().default(''),
         describe: yup.string().default(''),

         repair_service_code: yup.string().default(''),
         repair_service_name: yup.string().default(''),
         repair_service_category_id: yup.string().default(''),
         repair_service_category_name: yup.string().default(''),
      }),
   )
   .default([]);

const suppliesInvoices = yup
   .array()
   .of(
      yup.object({
         _id: yup.string().default(''), // _id cua hóa đơn sửa chữa chi tiêt
         repair_invoice_id: yup.string().default(''), // _id của dịch vụ sửa chữa nếu type === "service" nếu type === "supplies" => _id là của vật tư chi tiết
         quantity: yup.number().default(0),
         price: yup.string().default('0'),
         type: yup.string().default(''),
         describe: yup.string().default(''),
         repair_staff_id: yup.string().default(''), // id của nhân viên sửa chữa
         status_repair: yup.string().default(''), // trạng thái sửa chữa

         //
         inventory: yup.number().default(1), // số lượng tồn kho
         supplies_detail_code: yup.string().default(''),
         supplies_detail_name: yup.string().default(''),
         distributor_name: yup.string().default(''),
      }),
   )
   .default([]);

export const repairInvoiceSchema = yup.object({
   personnel_id: yup.string().default(''),

   customer: yup.object({
      customer_id: yup.string().default(''),
      phone: yup.string().default(''),
      email: yup.string().default(''),
   }),

   car: yup.object({
      car_id: yup.string().default(''),
      car_name: yup.string().default(''),
      car_color: yup.string().default(''),
      car_type: yup.string().default(''),
      brand_car: yup.string().default(''),
      license_plate: yup.string().default(''),
      kilometer: yup.number().max(999999, 'Số kilometer không hợp lệ').default(0),
   }),

   suppliesInvoices: suppliesInvoices,

   repairService: repairService,
});

export type RepairInvoiceSchema = yup.InferType<typeof repairInvoiceSchema>;
