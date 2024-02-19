/* eslint-disable @typescript-eslint/naming-convention */
import BaseService from '@Core/Api/BaseService';
import { AxiosResponseData } from '@Core/Api/axios-config';

const carsPath = {
   base: 'cars',
   ALL_FIELD: '/all-field',
};

interface ResponseGetAllField extends AxiosResponseData {
   data: Array<{
      _id: string;
      name: string;
   }>;
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
