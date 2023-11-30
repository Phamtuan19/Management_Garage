import BaseService from '@Core/Api/BaseService';

export const authPathUrl: ServicePathUrl = {
   BASE: 'account',
   LOGIN: 'login',
   REGISTER: 'register',
   REFRESH_TOKEN: 'refresh-token',
   USER: 'profile',
   GOOGLE: 'google/login',
};

class AuthService extends BaseService {
   BASE_ENDPOINT = authPathUrl.BASE;

   constructor() {
      super();
      this.setRequest();
   }

   register(data: { lastName: string; firstName: string; email: string; password: string }) {
      return this.request.post(this.BASE_URL + '/' + this.BASE_ENDPOINT + '/' + authPathUrl.REGISTER, data);
   }

   login(data: { email: string; password: string }) {
      return this.request.post(this.BASE_ENDPOINT + '/' + authPathUrl.LOGIN, data);
   }

   google() {
      return this.request.get(this.BASE_ENDPOINT + '/' + authPathUrl.GOOGLE);
   }

   refreshToken() {
      return this.request.get(this.BASE_ENDPOINT + '/' + authPathUrl.REFRESH_TOKEN);
   }

   getUser() {
      return this.request.get(this.BASE_ENDPOINT + '/' + authPathUrl.USER);
   }

   
}

const authService = new AuthService();

export default authService;
