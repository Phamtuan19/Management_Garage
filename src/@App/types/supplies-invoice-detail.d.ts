import { AxiosResponseData } from '@Core/Api/axios-config';

/* eslint-disable @typescript-eslint/naming-convention */
interface DataGetSuppliesInvoiceDetailBySupplieId {
   _id: string;
   supplies_invoice_id: {
      _id: string;
      code: string;
   };
   quantity_received: number;
   cost_price: number;
   selling_price: number;
   quantity_sold: number;
   discount: number;
   describe: string;
   createdAt: Date;
   updatedAt: Date;
}

interface ResponseSuppliesInvoiceDetailBySupplieDetailId extends AxiosResponseData {
   data: Array<DataGetSuppliesInvoiceDetailBySupplieId>;
}

interface SupplieInvoiceDetailBySupplieId {
   _id: string;
   supplies_invoice_id: string;
   supplies_detail_id: string;
   selling_price: number;
   quantity_sold: number;
   discount: number;
   createdAt: Date;
   supplies_invoice_code: string;
}

interface ResponseSupplieInvoiceDetailBySupplieId extends AxiosResponseData {
   data: Array<SupplieInvoiceDetailBySupplieId>;
}
