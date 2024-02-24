/* eslint-disable @typescript-eslint/naming-convention */
import { StatusRepair } from '@App/configs/status-config';
import BaseService from '@Core/Api/BaseService';

const repairorderPath = {
   base: 'repair-orders',
};

export interface RepairOrdersResponse {
   _id: string;
   code: string;
   kilometer: string;
   createdAt: string;
   updatedAt: string;
   status: StatusRepair;
   car_id: {
      _id: string,
      code: string,
      customer_id: string,
      name: string,
      brand_car: string,
      license_plate: string,
      production_year: string,
      car_color: string,
      car_type: string,
      status: string,
      createdAt: string,
      updatedAt: string,
   };
   repair_order_detail: {
      totel_detail: number,
      totle_quantity: number
   };
}
class RepairOrderService extends BaseService {
   BASE_ENDPOINT = repairorderPath.base;
   constructor() {
      super();
      this.setRequest();
   }
}
const repairorderService = new RepairOrderService();
export default repairorderService;
