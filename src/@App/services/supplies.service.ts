/* eslint-disable @typescript-eslint/naming-convention */
import BaseService from '@Core/Api/BaseService';

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
   name_supplie: string;
   unit: string;
   discount: number;
   name_distributor: string;
   createdAt: string;
   updatedAt: string;
}



class SuppliesService extends BaseService {
   BASE_ENDPOINT = suppliesPath.base;

   constructor() {
      super();
      this.setRequest();
   }

   getAllSupplies(): Promise<Supplies> {
      return this.request.get(this.BASE_ENDPOINT + suppliesPath.getAll);
   }
}
const suppliesService = new SuppliesService();
export default suppliesService;
