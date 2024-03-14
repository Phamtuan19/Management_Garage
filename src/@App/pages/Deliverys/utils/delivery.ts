/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/naming-convention */

import messageValidate from '@App/helpers/messageValidate';
import * as yup from 'yup';

export const deliveryUpdateExportQuantity = yup.object({
   supplies_service_id: yup.string().default(''),
   exports: yup
      .array()
      .of(
         yup.object({
            supplies_invoice_id: yup.string().required(messageValidate.required()).default(''),
            supplies_invoice_code: yup.string().required(messageValidate.required()).default(''),
            selling_price: yup.number().default(0),
            quantity_inventory: yup.number().min(0, messageValidate.minNumber('Số lượng', 0)).default(0),
            export_quantity: yup
               .number()
               .min(1, messageValidate.minNumber('Số lượng', 0))
               .test('maxExportQuantity', 'Số lượng xuất không được lớn hơn tồn kho', function (value) {
                  return value! <= this.parent.quantity_inventory; // Trả về true nếu export_quantity không lớn hơn quantity_inventory
               })
               .default(0),
            discount: yup.number().default(0),
         }),
      )
      .default([
         {
            supplies_invoice_id: '',
            supplies_invoice_code: '',
            selling_price: 0,
            quantity_inventory: 0,
            discount: 0,
            export_quantity: 0,
         },
      ]),
});

export type DeliveryUpdateExportQuantity = yup.InferType<typeof deliveryUpdateExportQuantity>;
