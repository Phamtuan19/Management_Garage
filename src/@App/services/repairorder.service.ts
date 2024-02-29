/* eslint-disable @typescript-eslint/naming-convention */
import { StatusRepair } from '@App/configs/status-config';
import BaseService from '@Core/Api/BaseService';
import { AxiosRequestConfig } from 'axios';

const repairorderPath = {
   base: 'repair-orders',
};

export interface RepairOrdersResponse {
   _id: string;
   code: string;
   kilometer: string;
   createdAt: string;
   updatedAt: string;
   status: StatusRepair;
   car_id: {
      _id: string;
      code: string;
      customer_id: string;
      name: string;
      brand_car: string;
      license_plate: string;
      production_year: string;
      car_color: string;
      car_type: string;
      status: StatusRepair;
      createdAt: string;
      updatedAt: string;
   };
   customer: {
      _id: string;
      name: string;
   }[];
   personnel_id: {
      _id: string;
      full_name: string;
   };
   repair_order_detail: {
      totel_detail: number;
      totle_price: number;
   };
   is_shipped: boolean;
}

interface RepairOrderSupplies {
   _id: string;
   quantity: number;
   price: number;
   discount: number;
   describe: string;
   distributor_id: string;
   distributor_name: string;
   supplies_detail: {
      _id: string;
      code: string;
      distributor_id: string;
      name_detail: string;
      imported_price: number;
      selling_price: number;
      isInStock: boolean;
      describe: string;
      supplies_id: string;
      supplies_code: string;
      supplies_name: string;
      supplies_unit: string;
      supplies_describe: string;
      materials_catalog_id: string;
      materials_catalog_code: string;
      materials_catalog_name: string;
      materials_catalog_describe: string;
   };
   supplies_invoice_detail_id: string;
   supplies_invoice_id: string;
   supplies_detail_id: string;
   supplies_detail_quantity_received: number;
   supplies_detail_cost_price: number;
   supplies_detail_selling_price: number;
   supplies_detail_quantity_sold: number;
   supplies_detail_describe: string;
   supplies_invoices_code: string;
}

interface RepairOrderServiceFind {
   _id: string;
   repair_service_id: string;
   quantity: number;
   price: number;
   discount: number;
   describe: string;
   repair_service: {
      _id: string;
      code: string;
      name: string;
      price: number;
      discount: number;
      describe: string;
   };
}

export interface FindRepairOrder {
   personnel: {
      _id: string;
      name: string;
   };
   kilometer: string;
   status: StatusRepair;
   customer: {
      _id: string;
      name: string;
      phone: string;
      email: string;
   };
   car: {
      _id: string;
      license_plate: string;
      brand_car: string;
      car_type: string;
      car_color: string;
   };

   supplies: RepairOrderSupplies[];
   services: RepairOrderServiceFind[];
}

export interface ResponseFindRepairOrder extends AxiosRequestConfig {
   data: FindRepairOrder;
}

class RepairOrderService extends BaseService {
   BASE_ENDPOINT = repairorderPath.base;
   constructor() {
      super();
      this.setRequest();
   }
}
const repairorderService = new RepairOrderService();
export default repairorderService;
