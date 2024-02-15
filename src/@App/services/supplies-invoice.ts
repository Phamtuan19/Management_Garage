import BaseService from '@Core/Api/BaseService';

const repairorderPath = {
   base: 'supplies-invoices',
};
class SuppliesInvoiceService extends BaseService {
   BASE_ENDPOINT = repairorderPath.base;
   constructor() {
      super();
      this.setRequest();
   }
}
const suppliesInvoiceService = new SuppliesInvoiceService();

export default suppliesInvoiceService;
