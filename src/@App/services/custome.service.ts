import BaseService from '@Core/Api/BaseService';

const customerPath = {
   BASE: 'customers',
};
export interface ICustomer{
   _id: string,
   name:string,
   phone: string,
   gender: string,
   createdAt: string,
   updateAt:string,
}
class CustomerService extends BaseService {
   BASE_ENDPOINT = customerPath.BASE;

   constructor() {
      super();
      this.setRequest();
   }
}

const customerService = new CustomerService();

export default customerService;