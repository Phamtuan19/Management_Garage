/* eslint-disable @typescript-eslint/naming-convention */
import BaseService from '@Core/Api/BaseService';

export const dashboardPath = {
   BASE: 'dashboard',
};

class DashboardService extends BaseService {
   BASE_ENDPOINT = dashboardPath.BASE;

   constructor() {
      super();
      this.setRequest();
   }
}

const dashboardService = new DashboardService();

export default dashboardService;
