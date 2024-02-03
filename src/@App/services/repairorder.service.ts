import BaseService from '@Core/Api/BaseService';

const repairorderPath = {
   base: 'repair-orders',
};
class RepairOrderService extends BaseService {
   BASE_ENDPOINT = repairorderPath.base;
   constructor() {
      super();
      this.setRequest();
   }
}
const repairorderService = new RepairOrderService();
export default repairorderService;
