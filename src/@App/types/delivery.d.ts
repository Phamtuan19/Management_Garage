import { StatusDelivery } from '@App/configs/status-config';

/* eslint-disable @typescript-eslint/naming-convention */

interface DeliveryNoteDataDetailOption {
   supplies_invoice_id: string;
   supplies_invoice_code: string;
   selling_price: number;
   discount: number;
   export_quantity: number;
   _id: string;
}

interface DeliveryNoteDataDetailHistory {
   quantity: string;
   status: string;
   type: string;
   isSuccess: boolean;
   createdAt: Date;
}

interface DeliveryNoteDataDetail {
   _id: string;
   supplies_service_id: string;
   quantity: number;

   supplies_detail_code: string;
   supplies_detail_name: string;
   unit: string;
   distributors_name: string;
   status: StatusDelivery;
   min_price: number;
   max_price: number;
   total_quantity_inventory: number;
   supplies_detail_isInStock: boolean;
   options: Array<DeliveryNoteDataDetailOption>;
   history: Array<DeliveryNoteDataDetailHistory>;
}

interface DeliveryNoteData {
   _id: string;
   code: string;
   status: StatusDelivery;
   personnel_id: {
      _id: string;
      full_name: string;
   };
   repair_order: {
      _id: string;
      code: string;
   };
   repair_invoice_id: {
      _id: string;
      code: string;
      customer_id: {
         _id: string;
         name: string;
         email: string;
         phone: string;
      };
   };
   details: DeliveryNoteDataDetail[];
   createdAt: string;
   updatedAt: string;
}
