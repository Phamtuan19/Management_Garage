/* eslint-disable @typescript-eslint/naming-convention */
import { StatusPayment } from '@App/configs/status-config';
import BaseService from '@Core/Api/BaseService';

const repairorderPath = {
   base: 'supplies-invoices',
};

export interface SuppliesInvoicesResponse {
   _id: string;
   code: string;
   describe: string;
   createdAt: string;
   updatedAt: string;
   personnel: {
      _id: string;
      full_name: string;
   };
   transaction: {
      _id: string;
      total_price: number;
      transfer_money: number;
      cash_money: number;
      payment_type: string;
      status: StatusPayment;
      createdAt: string;
      updatedAt: string;
   };
   total_supplies_details: number;
   total_supplies: number;
}
class SuppliesInvoiceService extends BaseService {
   BASE_ENDPOINT = repairorderPath.base;
   constructor() {
      super();
      this.setRequest();
   }
}
const suppliesInvoiceService = new SuppliesInvoiceService();

export default suppliesInvoiceService;
