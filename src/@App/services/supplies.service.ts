/* eslint-disable @typescript-eslint/naming-convention */
import BaseService from '@Core/Api/BaseService';
import { AxiosResponseData } from '@Core/Api/axios-config';

const suppliesPath = {
   base: 'supplies',
   getAll: '/get-all',
};

export interface Supplies {
   _id: string;
   details: {
      _id: string;
      describe: string;
      distributor_id: string;
      name_detail: string;
      imported_price: string;
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
   _id: string;
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
}

export interface ResponseReadSupplies extends AxiosResponseData {
   data: ReadSupplies[];
}

class SuppliesService extends BaseService {
   BASE_ENDPOINT = suppliesPath.base;

   constructor() {
      super();
      this.setRequest();
   }

   getAllSupplies(params: { q?: string; distributor_id: string }): Promise<ResponseReadSupplies> {
      return this.request.get(this.BASE_ENDPOINT + suppliesPath.getAll, { params });
   }
}
const suppliesService = new SuppliesService();
export default suppliesService;
