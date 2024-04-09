/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import BaseService from '@Core/Api/BaseService';
import { AxiosResponseData } from '@Core/Api/axios-config';

const path = {
   base: 'dashboard',
   year: '/year',
   repairInvoice: '/repair-invoice',
   supplies: '/supplies',
   supplies_export: '/supplies-export',
   supplies_export_top_five: '/supplies/top-export',
   supplies_export_top: '/supplies/top',
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

   getDashboardSupplies(): Promise<AxiosResponseData> {
      return this.request(this.BASE_ENDPOINT + path.supplies);
   }

   getDashboardSuppliesExportTopFive(params: any): Promise<AxiosResponseData> {
      return this.request(this.BASE_ENDPOINT + path.supplies_export_top_five, { params });
   }

   getDashboardSuppliesExportTop(params: any): Promise<AxiosResponseData> {
      return this.request(this.BASE_ENDPOINT + path.supplies_export_top, { params });
   }

   getExportSupplies(params: any): Promise<AxiosResponseData> {
      return this.request.get(this.BASE_ENDPOINT + path.supplies_export, { params });
   }
}
const dashboardService = new DashboardService();

export default dashboardService;
