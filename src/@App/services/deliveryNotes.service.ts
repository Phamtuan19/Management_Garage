/* eslint-disable @typescript-eslint/naming-convention */
import { StatusDelivery } from '@App/configs/status-config';
import BaseService from '@Core/Api/BaseService';
import { AxiosResponseData } from '@Core/Api/axios-config';
import { DeliveryUpdateExportQuantity } from '@App/pages/Deliverys/utils/delivery';

import { RepairOrderSupplies } from './repairorder.service';

const deliveryNoteServicePath = {
   base: 'delivery-notes',
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

class DeliveryNotesService extends BaseService {
   BASE_ENDPOINT = deliveryNoteServicePath.base;

   constructor() {
      super();
      this.setRequest();
   }

   getCheckEmpty(id: string): Promise<AxiosResponseData> {
      return this.request(this.BASE_ENDPOINT + '/' + id + deliveryNoteServicePath.CHECK_EMPTY);
   }

   updateDeliveryExportSupplies(id: string, data: DeliveryUpdateExportQuantity): Promise<AxiosResponseData> {
      return this.request.patch(
         this.BASE_ENDPOINT + deliveryNoteServicePath.UPDATE_DELIVERY_EXPORT_SUPPLIES + id,
         data,
      );
   }
}

const deliveryNotesService = new DeliveryNotesService();

export default deliveryNotesService;
