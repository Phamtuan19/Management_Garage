import BaseService from '@Core/Api/BaseService';


const distributorPath = {
   BASE: 'distributors',
};

interface Address {
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
      province: Address;
      district: Address;
      wards: Address;
      specific: string;
   };
  
   createdAt: string;
   updatedAt: string;
}
class DistributorService extends BaseService {
   BASE_ENDPOINT = distributorPath.BASE;

   constructor() {
      super();
      this.setRequest();
   }
}

const distributorService = new DistributorService();

export default distributorService;
