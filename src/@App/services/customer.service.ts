import BaseService from '@Core/Api/BaseService';
import { AxiosResponseData } from '@Core/Api/axios-config';

const customerPath = {
   BASE: 'customers',
   ALL_FIELD: '/all-field',
};

interface ResponseGetAllField extends AxiosResponseData {
   data: Array<ICustomer>;
}
export interface ICustomer {
   _id: string;
   name: string;
   phone: string;
   email: string;
   gender: string;
   createdAt: string;
   updateAt: string;
}
class CustomerService extends BaseService {
   BASE_ENDPOINT = customerPath.BASE;

   constructor() {
      super();
      this.setRequest();
   }

   fieldAll(): Promise<ResponseGetAllField> {
      return this.request(this.BASE_ENDPOINT + customerPath.ALL_FIELD);
   }
}

const customerService = new CustomerService();

export default customerService;
