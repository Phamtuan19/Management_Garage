import BaseService from '@Core/Api/BaseService';
import { AxiosResponseData } from '@Core/Api/axios-config';

export const personnelPathUrl = {
   BASE: 'personnel',
   ALL_FIELD: '/all-field',
};

class PersonnelService extends BaseService {
   BASE_ENDPOINT = personnelPathUrl.BASE;

   constructor() {
      super();
      this.setRequest();
   }

   fieldAll(): Promise<AxiosResponseData> {
      return this.request(this.BASE_ENDPOINT + personnelPathUrl.ALL_FIELD);
   }
}

const personnelService = new PersonnelService();

export default personnelService;
