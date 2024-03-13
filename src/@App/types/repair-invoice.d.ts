import { StatusRepair } from '@App/configs/status-config';

/* eslint-disable @typescript-eslint/naming-convention */
interface ResponseReadSuppliesInvoices {
   _id: string;
   code: string;
   personnel_id: {
      _id: string;
      full_name: string;
   };
   customer_id: {
      _id: string;
      name: string;
      email: string;
      phone: string;
   };
   transactions_id: string;
   car_id: {
      _id: string;
      code: string;
      car_type: string;
      car_color: string;
      brand_car: string;
      name: string;
      license_plate: string;
   };
   kilometer: number;
   status: StatusRepair;
   describe: string;
   createdAt: string;
   updatedAt: string;
}

interface ResponseFindOneRepairInvoiceService {
   _id: string;
   repair_invoice_id: string;
   supplies_service_id: string;
   price: number;
   discount: number;
   describe: string;
   type: string;
   details: [
      {
         name: string;
         describe: string;
         repair_staff_id: string;
         status: string;
         note: string;
         _id: string;
      },
   ];
   createdAt: string;
   service_name: string;
   service_describe: string;
   service_code: string;
   service_id: string;
   category_id: string;
   category_name: string;
}

interface ResponseFindOneRepairInvoiceSupplies {
   _id: string;
   repair_invoice_id: string;
   supplies_service_id: string;
   quantity: number;
   price?: number;
   discount?: number;
   describe: string;
   type: string;
   details: [];
   createdAt: string;
   supplies_detail_code: string;
   supplies_detail_id: string;
   supplies_detail_name: string;
   unit: string;
   distributors_name: string;
   min_price: number;
   max_price: number;
   total_quantity_inventory: number;
   repair_staff_id: string;
   status_repair: string;
}

interface ResponseFindOneRepairInvoice extends ResponseReadSuppliesInvoices {
   repairInvoiceService: ResponseFindOneRepairInvoiceService[] | [];
   repairInvoiceSupplies: ResponseFindOneRepairInvoiceSupplies[] | [];
}
