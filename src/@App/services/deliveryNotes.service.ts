/* eslint-disable @typescript-eslint/naming-convention */
import { StatusDelivery } from '@App/configs/status-config';
import BaseService from '@Core/Api/BaseService';
import { AxiosResponseData } from '@Core/Api/axios-config';

import { RepairOrderSupplies } from './repairorder.service';

const deliveryNoteServicePath = {
   base: 'delivery-notes',
   CHECK_EMPTY: '/check',
};

export interface DeliveryNoteData {
   _id: string;
   code: string;
   personnel: {
      _id: string;
      full_name: string;
   };
   repair_order: {
      _id: string;
      code: string;
   };
   status: StatusDelivery;
   describe: string;
   createdAt: string;
   updatedAt: string;
   repair_order_details_size: number;
}

export interface FindOneDeliveryNode {
   _id: string;
   code: string;
   personnel_id: string;
   createdAt: string;
   updatedAt: string;
   status: StatusDelivery;
   supplies_order: RepairOrderSupplies;
}

class DeliveryNotesService extends BaseService {
   BASE_ENDPOINT = deliveryNoteServicePath.base;

   constructor() {
      super();
      this.setRequest();
   }

   getCheckEmpty(id: string): Promise<AxiosResponseData> {
      return this.request(this.BASE_ENDPOINT + '/' + id + deliveryNoteServicePath.CHECK_EMPTY);
   }
}

const deliveryNotesService = new DeliveryNotesService();

export default deliveryNotesService;
