/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/naming-convention */

import messageValidate from '@App/helpers/messageValidate';
import * as yup from 'yup';

export const deliveryUpdateExportQuantity = yup.object({
   total_quantity: yup.number().default(0),
   exports: yup
      .array()
      .of(
         yup.object({
            _id: yup.string().default(''),
            delivery_detail_id: yup.string().default(''),
            repair_invoice_detail_id: yup.string().default(''),
            supplies_service_id: yup.string().default(''),
            supplies_invoice_id: yup.string().default(''),
            supplies_invoice_code: yup.string().required(messageValidate.required()).default(''),
            supplies_invoice_detail_id: yup.string().default(''),

            quantity_sold: yup.number().default(0), // Tồn kho
            selling_price: yup.number().default(0), // giá bán
            export_quantity: yup // số lượng xuất
               .number()
               .min(1, messageValidate.minNumber('Số lượng', 0))
               .test('maxExportQuantityInventory', 'Số lượng xuất không được lớn hơn tồn kho', function (value) {
                  return value! <= this.parent.quantity_sold;
                  // Trả về true nếu export_quantity không lớn hơn quantity_sold
               })
               .default(0),
            discount: yup.number().default(0), // giảm giá
         }),
      )
      .default([
         {
            _id: '',
            delivery_detail_id: '',
            export_quantity: 0,
            repair_invoice_detail_id: '',
            supplies_invoice_code: '',
            selling_price: 0,
            quantity_sold: 0,
            supplies_invoice_detail_id: '',
            discount: 0,
            supplies_invoice_id: '',
            supplies_service_id: '',
         },
      ]),
});

export type DeliveryUpdateExportQuantity = yup.InferType<typeof deliveryUpdateExportQuantity>;
