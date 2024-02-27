/* eslint-disable @typescript-eslint/naming-convention */
import BaseService from '@Core/Api/BaseService';
import { AxiosResponseData } from '@Core/Api/axios-config';

const distributorPath = {
   BASE: 'distributors',
   allField: '/all-field',
};

export interface IAddressOption {
   code: number;
   name: string;
}
export interface IDistributor {
   _id: string;
   code: string;
   name: string;
   phone: string;
   email: string;
   address: {
      province: IAddressOption;
      district: IAddressOption;
      wards: IAddressOption;
      specific: string;
   };
   bank_account_id: {
      _id: string;
      bank_name: string;
      bank_branch: string;
      account_holder_name: string;
      bank_account_number: string;
   };
   createdAt: string;
   updatedAt: string;
}

interface ResponseDataGetAllField extends AxiosResponseData {
   data: {
      _id: string;
      name: string;
   }[];
}

class DistributorService extends BaseService {
   BASE_ENDPOINT = distributorPath.BASE;

   constructor() {
      super();
      this.setRequest();
   }

   getAllField(): Promise<ResponseDataGetAllField> {
      return this.request.get(this.BASE_ENDPOINT + distributorPath.allField);
   }
}

const distributorService = new DistributorService();

export default distributorService;
