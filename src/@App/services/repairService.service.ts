/* eslint-disable @typescript-eslint/naming-convention */
import BaseService from '@Core/Api/BaseService';
import { AxiosResponseData } from '@Core/Api/axios-config';

const repairServicePath = {
   base: 'repair-services',
   ALL_FIELD: '/all-field',
};
export interface IRepairService {
   _id: string;
   code: string;
   name: string;
   price: number;
   discount: number;
   describe: string;
   createdAt: Date;
   updatedAt: Date;
}

// export interface DataGetAllFieldRepairService

interface ResponseGetAllField extends AxiosResponseData {
   data: Array<{
      code: string;
      createdAt: string;
      describe: string;
      discount: number;
      name: string;
      price: number;
      updatedAt: string;
      _id: string;
      details:
         | Array<{
              name: string;
              describe: string;
           }>
         | [];
   }>;
}

class RepairServiceService extends BaseService {
   BASE_ENDPOINT = repairServicePath.base;

   constructor() {
      super();
      this.setRequest();
   }

   fieldAll(params: {
      q?: string;
      car_name: string;
      repair_service_category_id?: string;
   }): Promise<ResponseGetAllField> {
      return this.request(this.BASE_ENDPOINT + repairServicePath.ALL_FIELD, { params });
   }
}
const repairServiceService = new RepairServiceService();
export default repairServiceService;
