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

interface SuppliesInvoiceDetails {
   _id: string;
   code: string;
   supplies_invoice_id: string;
   supplies_detail_id: string;
   quantity_received: number;
   cost_price: number;
   selling_price: number;
   describe: string;
   name_detail: string;
   unit: string;
}

interface Transactions {
   _id: string;
   total_price: number;
   transfer_money: number;
   cash_money: number;
   payment_type: string;
}
export interface ResponseGetSuppliesInvoice {
   _id: string;
   code: string;
   describe: string;
   details: Array<SuppliesInvoiceDetails>;
   transactions: Transactions;
   personnel: { _id: string; full_name: string };
   distributor_id: string;
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
