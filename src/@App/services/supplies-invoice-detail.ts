/* eslint-disable @typescript-eslint/no-explicit-any */
import BaseService from '@Core/Api/BaseService';

const suppliesInvoiceDetailPath = {
   base: 'supplies-invoices-details',
   BY_DISTRIBUTOR: '/distributor/',
};

class SuppliesInvoiceDetailService extends BaseService {
   BASE_ENDPOINT = suppliesInvoiceDetailPath.base;

   constructor() {
      super();
      this.setRequest();
   }

   getByDistributor(id: string): Promise<any> {
      return this.request(this.BASE_ENDPOINT + suppliesInvoiceDetailPath.BY_DISTRIBUTOR + id);
   }
}
const suppliesInvoiceDetailService = new SuppliesInvoiceDetailService();
export default suppliesInvoiceDetailService;
