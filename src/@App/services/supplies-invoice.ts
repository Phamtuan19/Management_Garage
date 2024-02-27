/* eslint-disable @typescript-eslint/naming-convention */
import { StatusPayment } from '@App/configs/status-config';
import BaseService from '@Core/Api/BaseService';
import { AxiosResponseData } from '@Core/Api/axios-config';

const suppliesInvoicederPath = {
   base: 'supplies-invoices',
   getListDeatils: 'details',
   getListDeatilsSort: 'sort-createAt',
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

export interface DataSuppliesDetails {
   code: string;
   _id: string;
   supplies_invoice_id: string;
   supplies_detail_id: string;
   quantity_received: number;
   cost_price: number;
   selling_price: number;
   quantity_sold: number;
   describe: string;
}

export interface ResponseSuppliesDetails extends AxiosResponseData {
   data: DataSuppliesDetails[];
}

export interface ResponseSuppliesDetailsSort extends AxiosResponseData {
   data: {
      _id: string;
      selling_price: number;
      supplies_invoice_code: string;
      inventory: number;
   }[];
}

class SuppliesInvoiceService extends BaseService {
   BASE_ENDPOINT = suppliesInvoicederPath.base;
   constructor() {
      super();
      this.setRequest();
   }

   getListSuppliesInvoiceDetails(): Promise<ResponseSuppliesDetails> {
      return this.request.get(this.BASE_ENDPOINT + '/' + suppliesInvoicederPath.getListDeatils);
   }

   getListDeatilsSort(params: { supplies_detail_id: string }): Promise<ResponseSuppliesDetailsSort> {
      return this.request.get(this.BASE_ENDPOINT + '/' + suppliesInvoicederPath.getListDeatilsSort, { params });
   }
}
const suppliesInvoiceService = new SuppliesInvoiceService();

export default suppliesInvoiceService;
