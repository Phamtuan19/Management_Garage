import BaseService from '@Core/Api/BaseService';

const repairorderPath = {
   base: 'repair-order-details',
   readByField: '/read',
};

class RepairOrderDetailService extends BaseService {
   BASE_ENDPOINT = repairorderPath.base;
   constructor() {
      super();
      this.setRequest();
   }
}
const repairOrderDetailService = new RepairOrderDetailService();

export default repairOrderDetailService;
