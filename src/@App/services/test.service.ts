import BaseService from '@Core/Api/BaseService';

class TestService extends BaseService {
   BASE_ENDPOINT = 'posts';

   getPosts() {
      return this.get();
   }
}

const testService = new TestService();

export default testService;
