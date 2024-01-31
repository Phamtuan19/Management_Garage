import BaseService from '@Core/Api/BaseService';

const repairServicePath = {
   base: 'repair-services',
};

class RepairServiceService extends BaseService {
   BASE_ENDPOINT = repairServicePath.base;

   constructor() {
      super();
      this.setRequest();
   }
}
const repairServiceService = new RepairServiceService();
export default repairServiceService;
