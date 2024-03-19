import BaseService from '@Core/Api/BaseService';

const Path = {
   base: 'delivery-detail',

   UPDATE_EXPORT: 'delivery/export/',
};

class DeliveryDetailService extends BaseService {
   BASE_ENDPOINT = Path.base;

   constructor() {
      super();
      this.setRequest();
   }
}

const deliveryDetailService = new DeliveryDetailService();

export default deliveryDetailService;
