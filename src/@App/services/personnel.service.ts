import BaseService from '@Core/Api/BaseService';

export const personnelPathUrl: ServicePathUrl = {
    BASE:'personnel',
  
};
class PersonnelService extends BaseService {
    BASE_ENDPOINT = personnelPathUrl.BASE;

    constructor(){
        super();
        this.setRequest();
    }
   
}
const personnelService = new PersonnelService();
export default personnelService
