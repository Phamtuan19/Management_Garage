/* eslint-disable @typescript-eslint/naming-convention */
import BaseService from '@Core/Api/BaseService';

import { IAddressOption } from './distributor.service';
const suppliesdetailsPath = {
   BASE: 'supplies-details',
};

export interface ISuppliesdetails {
   _id: string;
   name_detail: string;
   isInStock: boolean;
   describe: string;
   supplies_id: {
      _id: string;
      code: string;
      name: string;
      materials_catalog_id: {
         _id: string;
         code: string;
         name: string;
         describe: string;
      };
   };
   distributor_id: {
      _id: string;
      code: string;
      name: string;
      phone: string;
      email: string;
      address: {
         province: IAddressOption;
         district: IAddressOption;
         wards: IAddressOption;
         specifict: string;
      };
   };
}
class SuppliesDetailsService extends BaseService {
   BASE_ENDPOINT = suppliesdetailsPath.BASE;
   constructor() {
      super();
      this.setRequest();
   }
}
const suppliesdetailsServices = new SuppliesDetailsService();
export default suppliesdetailsServices;
