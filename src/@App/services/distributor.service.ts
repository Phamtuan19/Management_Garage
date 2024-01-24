import BaseService from '@Core/Api/BaseService';

const distributorPath = {
   BASE: 'distributors',
};
interface IAddress{
   
}
// export interface IDistributor {
//    _id: string;
//    name: string;
//    phone: string;
//    email: string;
//    bank_account_number: string;
//    bank_name: string;
//    bank_branch: string;
//    account_holder_name: string;
//    address: Object;
//    province: string;
//    district: string;
//    ward: string;
// }
 

class DistributorService extends BaseService {
   BASE_ENDPOINT = distributorPath.BASE;

   constructor() {
      super();
      this.setRequest();
   }
}

const distributorService = new DistributorService();

export default distributorService;
