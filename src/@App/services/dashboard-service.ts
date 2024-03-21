import BaseService from '@Core/Api/BaseService';

const carsPath = {
   base: 'dashboard',
};

class DashboardService extends BaseService {
   BASE_ENDPOINT = carsPath.base;

   constructor() {
      super();
      this.setRequest();
   }
}
const dashboardService = new DashboardService();

export default dashboardService;
