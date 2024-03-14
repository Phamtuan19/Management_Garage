import { ResponseSuppliesInvoiceDetailBySupplieDetailId } from '@App/types/supplies-invoice-detail';
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

   getBySupplieDetailId(id: string): Promise<ResponseSuppliesInvoiceDetailBySupplieDetailId> {
      return this.request(this.BASE_ENDPOINT + suppliesInvoiceDetailPath.BY_DISTRIBUTOR + id);
   }
}
const suppliesInvoiceDetailService = new SuppliesInvoiceDetailService();
export default suppliesInvoiceDetailService;
