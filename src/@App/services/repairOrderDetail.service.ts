/* eslint-disable @typescript-eslint/naming-convention */
import BaseService from '@Core/Api/BaseService';
import { AxiosRequestConfig } from 'axios';

const repairorderPath = {
   base: 'repair-order-details',
   readByField: '/read',
   EXPORT_QUANTITY: '/export_quantity',
};

class RepairOrderDetailService extends BaseService {
   BASE_ENDPOINT = repairorderPath.base;
   constructor() {
      super();
      this.setRequest();
   }

   updateExportQuantity(
      id: string,
      data: { export_quantity: number; describe: string; type: 'full' | 'custom' },
   ): Promise<AxiosRequestConfig> {
      return this.request.put(this.BASE_ENDPOINT + '/' + id + repairorderPath.EXPORT_QUANTITY, data);
   }
}
const repairOrderDetailService = new RepairOrderDetailService();

export default repairOrderDetailService;
