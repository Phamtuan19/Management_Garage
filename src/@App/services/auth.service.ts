import { ServicePathUrl } from '@App/types/servicePathUrl';
import BaseService from '@Core/Api/BaseService';

export const authPathUrl: ServicePathUrl = {
   BASE: 'account',
   LOGIN: 'login',
   REGISTER: 'register',
   REFRESH_TOKEN: 'refresh-token',
   USER: '',
};

class LoginService extends BaseService {
   BASE_ENDPOINT = authPathUrl.BASE;

   register(data: { lastName: string; firstName: string; email: string; password: string }) {
      return this.request.post(this.BASE_URL + '/' + this.BASE_ENDPOINT + '/' + authPathUrl.REGISTER, data);
   }

   login(data: { email: string; password: string }) {
      return this.request.post(this.BASE_ENDPOINT + '/' + authPathUrl.LOGIN, data);
   }

   refreshToken() {
      return this.request.post(this.BASE_ENDPOINT + '/' + authPathUrl.REFRESH_TOKEN);
      // return this.request.post(this.BASE_ENDPOINT + '/' + authPathUrl.REFRESH_TOKEN);
   }

   getUser() {
      return this.request.get(this.BASE_ENDPOINT + '/' + authPathUrl.USER);
   }
}

const loginService = new LoginService();

export default loginService;
