/* eslint-disable @typescript-eslint/naming-convention */
import { CarStatusKeys } from '@App/configs/status-config';
import BaseService from '@Core/Api/BaseService';
import { AxiosResponseData } from '@Core/Api/axios-config';

const carsPath = {
   base: 'cars',
   ALL_FIELD: '/all-field',
};

export interface DataGetAllFieldCart {
   _id: string;
   code: string;
   name: string;
   brand_car: string;
   license_plate: string;
   production_year: string;
   car_color: string;
   car_type: string;
   status: CarStatusKeys;
}
interface ResponseGetAllField extends AxiosResponseData {
   data: Array<DataGetAllFieldCart>;
}

class CarsService extends BaseService {
   BASE_ENDPOINT = carsPath.base;

   constructor() {
      super();
      this.setRequest();
   }

   fieldAll(params: { customer_id?: string }): Promise<ResponseGetAllField> {
      return this.request(this.BASE_ENDPOINT + carsPath.ALL_FIELD, { params });
   }
}
const carsService = new CarsService();
export default carsService;
