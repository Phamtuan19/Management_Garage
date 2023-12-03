import BaseService from '@Core/Api/BaseService';

const distributorPath: ServicePathUrl = {
   BASE: 'distributor',
};

class DistributorService extends BaseService {
   BASE_ENDPOINT = distributorPath.BASE;

   constructor() {
      super();
      this.setRequest();
   }
}

const distributorService = new DistributorService();

export default distributorService;
