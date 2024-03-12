import BaseService from '@Core/Api/BaseService';

export const authPathUrl = {
   BASE: 'repair-services-categories',
};

class RepairServiceCategoriesService extends BaseService {
   BASE_ENDPOINT = authPathUrl.BASE;

   constructor() {
      super();
      this.setRequest();
   }
}

const repairServiceCategoriesService = new RepairServiceCategoriesService();

export default repairServiceCategoriesService;
