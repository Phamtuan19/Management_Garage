import BaseService from '@Core/Api/BaseService';

const suppliesPath = {
   base: 'supplies-invoices-details',
};
class SuppliesInvoiceDetailService extends BaseService {
   BASE_ENDPOINT = suppliesPath.base;

   constructor() {
      super();
      this.setRequest();
   }
}
const suppliesInvoiceDetailService = new SuppliesInvoiceDetailService();
export default suppliesInvoiceDetailService;
