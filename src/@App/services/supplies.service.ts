/* eslint-disable @typescript-eslint/naming-convention */
import BaseService from '@Core/Api/BaseService';
import { AxiosResponseData } from '@Core/Api/axios-config';

const suppliesPath = {
   base: 'supplies',
   getAll: '/get-all',
   GET_SUPPLIES_INVOICE: '/get-supplies-invoice',
};

export interface Supplies {
   _id: string;
   details: {
      _id: string;
      code: string;
      describe: string;
      distributor_id: string;
      name_detail: string;
      imported_price: string;
      car: string[];
   }[];
   name: string;
   materials_catalog_id: {
      _id: string;
      code: string;
      name: string;
      describe: string;
   };
   unit: string;
   discount: string;
   describe: string;
}

export interface ReadSupplies {
   _id: string; // id của chi tiết sản phẩm
   code: string;
   isInStock: boolean;
   name_detail: string;
   supplies_id: string;
   name_supplie: number;
   imported_price: number;
   unit: string;
   discount: number;
   name_distributor: string;
   createdAt: string;
   updatedAt: string;
   quantity_received: number;
   quantity_sold: number;
   selling_price: number;
   distributor_id: string;
   supplies_invoice_total: number;
   supplies_invoice_id: string;
   supplies_invoices_code: string;
}

export interface ResponseReadSupplies extends AxiosResponseData {
   data: Array<ReadSupplies>;
}

export interface SuppliesItem {
   _id: string;
   code: string;
   name_detail: string;
   isInStock: string;
   supplies_id: string;
   unit: string;
   distributor: {
      _id: string;
      name: string;
   };
   supplies_invoices_code: string;
   supplies_invoices_id: string;
   supplies_invoices_quantity_received: number;
   supplies_invoices_selling_price: number;
}

export interface ResponseReadSuppliesA extends AxiosResponseData {
   data: SuppliesItem[];
}

export interface SuppliesFindOne {
   _id: string;
   name: string;
   materials_catalog_id: {
      _id: string;
      name: string;
   };
   unit: string;
   discount: number;
   describe: string;
   createdAt: string;
   details: Array<{
      _id: string;
      code: string;
      supplies_id: string;
      distributor_id: string;
      name_detail: string;
      imported_price: number;
      selling_price: number;
      isInStock: true;
      describe: string;
      distributor_name: string;
      createdAt: string;
      updatedAt: string;
   }>;
}

class SuppliesService extends BaseService {
   BASE_ENDPOINT = suppliesPath.base;

   constructor() {
      super();
      this.setRequest();
   }

   getAllSupplies(params: { q?: string; distributor_id?: string }): Promise<ResponseReadSupplies> {
      return this.request.get(this.BASE_ENDPOINT + suppliesPath.getAll, { params });
   }

   getSupplies(params: {
      q?: string;
      distributor_id?: string;
      field: string;
      car_name?: string;
   }): Promise<ResponseReadSuppliesA> {
      return this.request.get(this.BASE_ENDPOINT + suppliesPath.GET_SUPPLIES_INVOICE, { params });
   }
}
const suppliesService = new SuppliesService();
export default suppliesService;
