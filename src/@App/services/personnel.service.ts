/* eslint-disable @typescript-eslint/no-explicit-any */
import BaseService from '@Core/Api/BaseService';

export const personnelPathUrl: ServicePathUrl = {
   BASE: 'staff',
};

class PersonnelService extends BaseService {
   BASE_ENDPOINT = personnelPathUrl.BASE;
   getUser: any;

   constructor() {
      super();
      this.setRequest();
   }
}

const personnelService = new PersonnelService();

export default personnelService;
