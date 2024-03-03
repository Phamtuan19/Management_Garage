/* eslint-disable @typescript-eslint/naming-convention */
import * as yup from 'yup';

export const deliveryUpdateExportQuantity = yup.object({
   id: yup.string().default(''),
   export_quantity: yup.number().default(0),
   describe: yup.string().default(''),
});

export type DeliveryUpdateExportQuantity = yup.InferType<typeof deliveryUpdateExportQuantity>;
