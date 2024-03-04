/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/naming-convention */

import messageValidate from '@App/helpers/messageValidate';
import * as yup from 'yup';

export const deliveryUpdateExportQuantity = yup.object({
   id: yup.string().default(''),
   export_quantity: yup
      .number()
      .default(0)
      .test('lessThanInventory', messageValidate.maxNumber('Số lượng xuất', 'Số lượng tồn'), function (value) {
         if (this.parent && typeof this.parent.inventory === 'number') {
            const inventory = Number(this.parent.inventory);
            return Number(value) <= inventory;
         }
         return true; // Hoặc bạn có thể trả về false nếu không muốn cho phép giá trị này khi không có 'inventory'
      }),
   inventory: yup.number().default(0),
   describe: yup.string().default(''),
});

export type DeliveryUpdateExportQuantity = yup.InferType<typeof deliveryUpdateExportQuantity>;
