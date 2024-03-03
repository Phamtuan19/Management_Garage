/* eslint-disable @typescript-eslint/naming-convention */
import { CarStatusKeys, StatusRepair } from '@App/configs/status-config';
import BaseService from '@Core/Api/BaseService';
import { AxiosRequestConfig } from 'axios';

const repairorderPath = {
   base: 'repair-orders',
   UPDATE_STAUTS: '/status',
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

export interface RepairOrderSupplies {
   _id: string;
   quantity: number;
   price: number;
   discount: number;
   describe: string;
   describe_export: string;
   distributor_id: string;
   distributor_name: string;
   is_shipped: boolean;
   export_quantity: number;
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

export interface RepairOrderServiceFind {
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
   _id: string;
   code: string;
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
      code: string;
      license_plate: string;
      brand_car: string;
      car_type: string;
      car_color: string;
      production_year: string;
      status: CarStatusKeys;
      createdAt: string;
   };

   supplies: RepairOrderSupplies[];
   services: RepairOrderServiceFind[];

   createdAt: string;
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

   updateStatus(data: { status: string }, id: string): Promise<AxiosRequestConfig> {
      return this.request.patch(this.BASE_ENDPOINT + repairorderPath.UPDATE_STAUTS + '/' + id, data);
   }
}
const repairorderService = new RepairOrderService();
export default repairorderService;
