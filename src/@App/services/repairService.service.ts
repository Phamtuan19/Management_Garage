import BaseService from '@Core/Api/BaseService';

const repairServicePath = {
   base: 'repair-services',
};
export interface IRepairService {
   code: string;
   name: string;
   price: number;
   discount: number;
   describe: string;
   createdAt: Date;
   updatedAt: Date;
}
class RepairServiceService extends BaseService {
   BASE_ENDPOINT = repairServicePath.base;

   constructor() {
      super();
      this.setRequest();
   }
}
const repairServiceService = new RepairServiceService();
export default repairServiceService;
