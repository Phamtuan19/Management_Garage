import BaseService from '@Core/Api/BaseService';

export const personnelPathUrl = {
   BASE: 'repair-invoices',
};

class RepairInvoiceService extends BaseService {
   BASE_ENDPOINT = personnelPathUrl.BASE;

   constructor() {
      super();
      this.setRequest();
   }
}

const repairInvoiceService = new RepairInvoiceService();

export default repairInvoiceService;
