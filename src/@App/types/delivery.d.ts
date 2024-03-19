import { StatusDelivery } from '@App/configs/status-config';

/* eslint-disable @typescript-eslint/naming-convention */

interface DeliveryNoteDataDetailOption {
   supplies_invoice_id: string;
   supplies_invoice_code: string;
   selling_price: number;
   discount: number;
   export_quantity: number;
   _id: string;
}

interface DeliveryNoteDataDetailHistory {
   delivery_id: string; // id của phiếu xuất kho
   details: Array<{
      delivery_detail_id: string; // id của phiếu xuất kho chi tiết
      supplies_service_id: string; // Id của vật tư chi tiết
      supplies_invoice_detail_id: string; // id của hóa đơn nhập chi tiết
      supplies_invoice_id?: string; // id của hóa đơn nhập hàng
      supplies_invoice_code?: string; // Code của hóa đơn nhập hàng
      quantity: number; // Số lượng yêu cầu lấy thêm hoặc trả lại
      type: StatusDelivery; // Hình thức yêu cầu "export" | "return"
      status: StatusDelivery;
      createdAt: Date;
      updatedAt: Date;
   }>;
}

interface DeliveryNoteDataDetail {
   _id: string;
   delivery_id: string;
   supplies_service_id: string;
   quantity: number;
   supplies_detail_code: string;
   supplies_detail_name: string;
   unit: string;
   distributors_name: string;
   status: StatusDelivery;
   min_price: number;
   max_price: number;
   total_quantity_inventory: number;
   supplies_detail_isInStock: boolean;
   options: Array<DeliveryNoteDataDetailOption>;
   repair_invoice_detail_id: string;
}

interface DeliveryNoteData {
   _id: string;
   code: string;
   status: StatusDelivery;
   personnel_id: {
      _id: string;
      full_name: string;
   };
   repair_order: {
      _id: string;
      code: string;
   };
   repair_invoice_id: {
      _id: string;
      code: string;
      customer_id: {
         _id: string;
         name: string;
         email: string;
         phone: string;
      };
   };
   details: DeliveryNoteDataDetail[];
   createdAt: string;
   updatedAt: string;
   history: Array<DeliveryNoteDataDetailHistory>;
}
