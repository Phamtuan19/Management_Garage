import BaseService from '@Core/Api/BaseService';

class LoginService extends BaseService {
   BASE_ENDPOINT = 'login';

   getAll(data: { id: string; name: string }) {
      return this.request.get(this.BASE_ENDPOINT + '/abc', { data });
   }
}

const loginService = new LoginService();
export default loginService;
