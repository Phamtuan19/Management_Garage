import BaseService from '@Core/Api/BaseService';

export const path = {
   BASE: 'repair-invoices',
};

class RepairInvoiceService extends BaseService {
   BASE_ENDPOINT = path.BASE;

   constructor() {
      super();
      this.setRequest();
   }
}

const repairInvoiceService = new RepairInvoiceService();

export default repairInvoiceService;
