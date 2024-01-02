import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import middleware from './Middleware';
import { AxiosResponseData } from './axios-config';

const createInstance = <T extends { data: AxiosResponseData }, D>(baseURL: string) => {
   const config: AxiosRequestConfig<T> = {
      baseURL: baseURL,
      headers: {
         // 'X-Requested-With': 'XMLHttpRequest',
      },
   };

   const axiosInstance: AxiosInstance = axios.create(config);

   axiosInstance.interceptors.request.use(
      (requestConfig: InternalAxiosRequestConfig<T>) => {
         void middleware(requestConfig);
         return requestConfig;
      },

      (requestError: AxiosError) => {
         return Promise.reject(requestError);
      },
   );

   axiosInstance.interceptors.response.use(
      // success response
      (response: AxiosResponse<T, D>): AxiosResponse => {
         if (response && response.data) {
            return response.data as unknown as AxiosResponse;
         }
         return response;
      },

      // error response
      async (error: Error | AxiosError<T>): Promise<AxiosError<T>> => {
         // if (axios.isAxiosError(error)) {
         // const originalRequest = error.config;
         // const currentRequestUrl = originalRequest!.url;
         // console.log(error.response!.status === HttpStatusCode.UNAUTHORIZED);
         // if (
         //    error.response!.status === HttpStatusCode.UNAUTHORIZED &&
         //    currentRequestUrl !== authPathUrl.REFRESH_TOKEN
         // ) {
         //    console.log('object');
         //    // const refreshTokenRequest = createInstance(import.meta.env.BASE_URL + '/' + 'api');
         //    // const res = await refreshTokenRequest.get('auth/refresh-token');
         //    // console.log(res);
         // }
         // }
         return Promise.reject(error);
      },
   );

   return axiosInstance;
};

export default createInstance;
