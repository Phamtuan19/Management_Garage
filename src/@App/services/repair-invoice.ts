import { StatusRepair } from '@App/configs/status-config';
/* eslint-disable @typescript-eslint/naming-convention */
import BaseService from '@Core/Api/BaseService';

export const personnelPathUrl = {
   BASE: 'repair-invoices',
};

export interface ResponseReadSuppliesInvoices {
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

      name: string;
      brand_car: string;
      license_plate: string;
   };
   kilometer: string;
   status: StatusRepair;
   describe: string;
   createdAt: string;
   updatedAt: string;
}

class RepairInvoiceService extends BaseService {
   BASE_ENDPOINT = personnelPathUrl.BASE;

   constructor() {
      super();
      this.setRequest();
   }
}

const repairInvoiceService = new RepairInvoiceService();

export default repairInvoiceService;
