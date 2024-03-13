/* eslint-disable @typescript-eslint/naming-convention */
import * as yup from 'yup';

export const repairServiceSchema = yup.object({
   _id: yup.string().default(''),
   repair_invoice_id: yup.string().default(''),
   price: yup.number().default(0),
   discount: yup.number().default(0),
   type: yup.string().default(''),
   describe: yup.string().default(''),

   repair_service_code: yup.string().default(''),
   repair_service_name: yup.string().default(''),
   repair_service_category_id: yup.string().default(''),
   repair_service_category_name: yup.string().default(''),
   details: yup.array().of(
      yup.object({
         name: yup.string().default(''),
         describe: yup.string().default(''),
         repair_staff_id: yup.string().default(''),
         status: yup.string().default(''),
         note: yup.string().default(''),
         _id: yup.string().default(''),
      }),
   ),
});

export type RepairServiceUpdateSchema = yup.InferType<typeof repairServiceSchema>;

export const suppliesInvoicesSchema = yup.object({
   _id: yup.string().default(''),
   repair_invoice_id: yup.string().default(''),
   quantity: yup.number().default(0),
   price: yup.string().default('0'),
   discount: yup.number().default(0),
   type: yup.string().default(''),
   describe: yup.string().default(''),
   repair_staff_id: yup.string().default(''),
   status_repair: yup.string().default(''),

   inventory: yup.number().default(1),
   supplies_detail_code: yup.string().default(''),
   supplies_detail_name: yup.string().default(''),
   distributor_name: yup.string().default(''),
});

export type SuppliesInvoiceUpdateSchema = yup.InferType<typeof suppliesInvoicesSchema>;

export const repairInvoiceUpdateSchema = yup.object({
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

   suppliesInvoices: yup.array().of(suppliesInvoicesSchema).default([]),

   repairService: yup.array().of(repairServiceSchema).default([]),
});

export type RepairInvoiceUpdateSchema = yup.InferType<typeof repairInvoiceUpdateSchema>;
