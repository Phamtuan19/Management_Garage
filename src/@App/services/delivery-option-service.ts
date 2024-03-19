/* eslint-disable @typescript-eslint/no-explicit-any */
import BaseService from '@Core/Api/BaseService';
import { AxiosResponseData } from '@Core/Api/axios-config';

const Path = {
   base: 'delivery-option',
   UPDATE_EXPORT: '/export',
};

class DeliveryOptionService extends BaseService {
   BASE_ENDPOINT = Path.base;

   constructor() {
      super();
      this.setRequest();
   }

   updateExport(data: any): Promise<AxiosResponseData> {
      return this.request.patch(this.BASE_ENDPOINT + Path.UPDATE_EXPORT, data);
   }
}

const deliveryOptionService = new DeliveryOptionService();

export default deliveryOptionService;
