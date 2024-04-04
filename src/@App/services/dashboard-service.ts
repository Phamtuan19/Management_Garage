import BaseService from '@Core/Api/BaseService';
import { AxiosResponseData } from '@Core/Api/axios-config';

const path = {
   base: 'dashboard',
   year: '/year',
   repairInvoice: '/repair-invoice',
};

class DashboardService extends BaseService {
   BASE_ENDPOINT = path.base;

   constructor() {
      super();
      this.setRequest();
   }

   getYear(year: string | number): Promise<AxiosResponseData> {
      return this.request(this.BASE_ENDPOINT + path.year + '?year=' + year);
   }
   getRepairInvoice(year: string | number): Promise<AxiosResponseData> {
      return this.request(this.BASE_ENDPOINT + path.repairInvoice + '?year=' + year);
   }
}
const dashboardService = new DashboardService();

export default dashboardService;
