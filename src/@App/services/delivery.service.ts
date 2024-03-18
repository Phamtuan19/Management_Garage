/* eslint-disable @typescript-eslint/naming-convention */
import { StatusDelivery } from '@App/configs/status-config';
import BaseService from '@Core/Api/BaseService';
import { AxiosResponseData } from '@Core/Api/axios-config';

import { RepairOrderSupplies } from './repairorder.service';

const deliveryServicePath = {
   base: 'delivery',
   CHECK_EMPTY: '/check',
   UPDATE_DELIVERY_EXPORT_SUPPLIES: '/export-supplies/',
};

export interface FindOneDeliveryNode {
   _id: string;
   code: string;
   personnel_id: string;
   createdAt: string;
   updatedAt: string;
   status: StatusDelivery;
   supplies_order: RepairOrderSupplies;
}

class DeliveryService extends BaseService {
   BASE_ENDPOINT = deliveryServicePath.base;

   constructor() {
      super();
      this.setRequest();
   }

   getCheckEmpty(id: string): Promise<AxiosResponseData> {
      return this.request(this.BASE_ENDPOINT + '/' + id + deliveryServicePath.CHECK_EMPTY);
   }
}

const deliveryService = new DeliveryService();

export default deliveryService;
