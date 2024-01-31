/* eslint-disable @typescript-eslint/naming-convention */
import BaseService from '@Core/Api/BaseService';

const carsPath = {
   base: 'supplies',
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
      code: string;
      name: string;
      describe: string;
   };
   unit: string;
   discount: string;
   describe: string;
}

class SuppliesService extends BaseService {
   BASE_ENDPOINT = carsPath.base;

   constructor() {
      super();
      this.setRequest();
   }
}
const suppliesService = new SuppliesService();
export default suppliesService;
