import {
   ResponseSupplieInvoiceDetailBySupplieId,
   ResponseSuppliesInvoiceDetailBySupplieDetailId,
} from '@App/types/supplies-invoice-detail';
import BaseService from '@Core/Api/BaseService';

const path = {
   base: 'supplies-invoices-details',
   BY_DISTRIBUTOR: '/distributor/',
   SUPPLIE_DETAIL: '/supplie-detail/',
};

class SuppliesInvoiceDetailService extends BaseService {
   BASE_ENDPOINT = path.base;

   constructor() {
      super();
      this.setRequest();
   }

   getBySupplieDetailId(id: string): Promise<ResponseSuppliesInvoiceDetailBySupplieDetailId> {
      return this.request(this.BASE_ENDPOINT + path.BY_DISTRIBUTOR + id);
   }

   getBySupplieDetail(id: string): Promise<ResponseSupplieInvoiceDetailBySupplieId> {
      return this.request(this.BASE_ENDPOINT + path.SUPPLIE_DETAIL + id);
   }
}
const suppliesInvoiceDetailService = new SuppliesInvoiceDetailService();
export default suppliesInvoiceDetailService;
