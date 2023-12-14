import BaseService from '@Core/Api/BaseService';

const personnelPath: ServicePathUrl = {
   BASE: 'staff',
};

class PersonnelService extends BaseService {
   BASE_ENDPOINT = personnelPath.BASE;

   constructor() {
      super();
      this.setRequest();
   }
}

const personnelService = new PersonnelService();

export default personnelService;
