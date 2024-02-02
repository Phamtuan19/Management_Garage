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

class SuppliesService extends BaseService {
   BASE_ENDPOINT = suppliesPath.base;

   constructor() {
      super();
      this.setRequest();
   }

   getAllSupplies(): Promise<AxiosResponseData> {
      return this.request.get(this.BASE_ENDPOINT + suppliesPath.getAll);
   }
}
const suppliesService = new SuppliesService();
export default suppliesService;
