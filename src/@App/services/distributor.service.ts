/* eslint-disable @typescript-eslint/naming-convention */
import BaseService from '@Core/Api/BaseService';
import { AxiosResponseData } from '@Core/Api/axios-config';

import { IMaterialsCatalog } from './materialsCatalog.service';

const distributorPath = {
   BASE: 'distributors',
   allField: '/all-field',
   DistrictsRepairInvoice: '/repair-invoice',
   GET_SUPPLIES_INVOICE: '/supplies-invoice/',
};

export interface IAddressOption {
   code: string;
   name: string;
}
export interface IDistributor {
   _id: string;
   code: string;
   name: string;
   phone: string;
   email: string;
   materials_catalog_id: Array<string>;
   address: {
      province: IAddressOption;
      district: IAddressOption;
      wards: IAddressOption;
      specific: string;
   };
   bank_account_id: {
      bank_name?: string;
      bank_branch?: string;
      account_holder_name?: string;
      bank_account_number?: string;
   };
   createdAt: string;
   updatedAt: string;
   materials_catalogs: Array<IMaterialsCatalog>;
}

interface ResponseDataGetAllField extends AxiosResponseData {
   data: {
      _id: string;
      name: string;
   }[];
}
interface ResponseDataSuppliesInvoice extends AxiosResponseData {
   data: {
      distributor_id: string;
      distributor_code: string;
      supplies_detail_id: string;
      supplies_detail_code: string;
      supplies_detail_name: string;
   }[];
}

export interface DistributorSuppliesInvoice {
   _id: string;
   code: string;
   supplies_id: string;
   distributor_id: string;
   name_detail: string;
   imported_price: number;
   selling_price: number;
   isInStock: true;
   describe: string;
   createdAt: string;
   updatedAt: string;
   supplies: {
      _id: string;
      code: string;
      name: string;
      materials_catalog_id: string;
      unit: string;
      discount: number;
      describe: string;
      createdAt: string;
      updatedAt: string;
   };
}

interface ResponseDistributorSuppliesInvoice extends AxiosResponseData {
   data: DistributorSuppliesInvoice;
}

class DistributorService extends BaseService {
   BASE_ENDPOINT = distributorPath.BASE;

   constructor() {
      super();
      this.setRequest();
   }

   getAllField(params: { materials_catalog_id?: string }): Promise<ResponseDataGetAllField> {
      return this.request.get(this.BASE_ENDPOINT + distributorPath.allField, { params });
   }

   getDistrictsRepairInvoice(params: { supplies_id: string }): Promise<ResponseDataSuppliesInvoice> {
      return this.request.get(this.BASE_ENDPOINT + distributorPath.DistrictsRepairInvoice, { params });
   }

   getDistributorsSuppliesInvoice(id: string): Promise<ResponseDistributorSuppliesInvoice> {
      return this.request(this.BASE_ENDPOINT + distributorPath.GET_SUPPLIES_INVOICE + id);
   }
}

const distributorService = new DistributorService();

export default distributorService;
