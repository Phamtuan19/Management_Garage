import BaseService from '@Core/Api/BaseService';
class TestService extends BaseService {
   BASE_ENDPOINT = 'booking';

   testApi() {
      return this.request.get(this.BASE_ENDPOINT + '/products');
   }
}

const testService = new TestService();

export default testService;
