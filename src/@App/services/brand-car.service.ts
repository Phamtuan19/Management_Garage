import BaseService from '@Core/Api/BaseService';

export const brandCarPath = {
   BASE: 'brand-cars',
};

class BrandCarService extends BaseService {
   BASE_ENDPOINT = brandCarPath.BASE;

   constructor() {
      super();
      this.setRequest();
   }
}

const brandCarService = new BrandCarService();

export default brandCarService;
