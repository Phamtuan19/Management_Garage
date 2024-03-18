/* eslint-disable @typescript-eslint/naming-convention */
import BaseService from '@Core/Api/BaseService';
import { DeliveryUpdateExportQuantity } from '@App/pages/Deliverys/utils/delivery';
import { AxiosResponseData } from '@Core/Api/axios-config';

const Path = {
   base: 'delivery-detail',

   UPDATE_EXPORT: '/export/',
};

class DeliveryDetailService extends BaseService {
   BASE_ENDPOINT = Path.base;

   constructor() {
      super();
      this.setRequest();
   }

   updateExport(id: string, data: DeliveryUpdateExportQuantity): Promise<AxiosResponseData> {
      return this.request.patch(this.BASE_ENDPOINT + Path.UPDATE_EXPORT + id, data);
   }
}

const deliveryDetailService = new DeliveryDetailService();

export default deliveryDetailService;
