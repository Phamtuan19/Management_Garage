import BaseService from '@Core/Api/BaseService';

export const authPathUrl = {
   BASE: 'auth',
   LOGIN: 'sign-in',
   REFRESH_TOKEN: 'refresh-token',
   VERIFY: 'verify',
};

class AuthService extends BaseService {
   BASE_ENDPOINT = authPathUrl.BASE;

   constructor() {
      super();
      this.setRequest();
   }

   login(data: { email: string; password: string }) {
      return this.request.post(this.BASE_ENDPOINT + '/' + authPathUrl.LOGIN, data);
   }

   refreshToken() {
      return this.request.get(this.BASE_ENDPOINT + '/' + authPathUrl.REFRESH_TOKEN);
   }

   verify() {
      return this.request.get(this.BASE_ENDPOINT + '/' + authPathUrl.VERIFY);
   }
}

const authService = new AuthService();

export default authService;
