import BaseService from '@Core/Api/BaseService';

export const personnelPathUrl: ServicePathUrl = {
   BASE: 'account',
   USER: 'profile',
};

class PersonnelService extends BaseService {
   BASE_ENDPOINT = personnelPathUrl.BASE;

   constructor() {
      super();
      this.setRequest();
   }

   getUser() {
      return this.request.get(this.BASE_ENDPOINT + '/' + personnelPathUrl.USER);
   }
}

const   personnelService = new PersonnelService();

export default personnelService;
