import BaseService from '@Core/Api/BaseService';

const distributorPath = {
   BASE: 'distributors',
};
export interface IDistributors{
   _id: string,
   code:string,
   name: string,
   phone: string,
   email: string,
   address: string,
   bankAcountId: string,
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
