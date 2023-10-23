import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import HttpStatusCode from '@Core/Configs/HttpStatusCode';
import { errorMessage } from '@Core/Helper/message';
import middleware from './Middleware';
// import queryString from 'query-string';

// Tạo hàm tùy chỉnh để biến đổi params thành chuỗi truy vấn URL
// const customParamsSerializer = (params: Record<string, any>): string => {
//    return queryString.stringify(params);
// };

const createInstance = <T, D>(baseURL: string) => {
   const config: AxiosRequestConfig<T> = {
      baseURL: baseURL,
      headers: {
         'X-Requested-With': 'XMLHttpRequest',
      },
      // withCredentials: false,
      // paramsSerializer: customParamsSerializer,
   };

   const axiosInstance: AxiosInstance = axios.create(config);

   axiosInstance.interceptors.request.use(
      (requestConfig: InternalAxiosRequestConfig<T>) => {
         middleware(requestConfig);
         return requestConfig;
      },

      (requestError: AxiosError) => {
         return Promise.reject(requestError);
      },
   );

   axiosInstance.interceptors.response.use(
      // success response
      (response: AxiosResponse<T, D>): AxiosResponse<T, D> => {
         if (response && response.data) {
            console.log(response.data);
            return response.data; // Return the entire response object
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
         errorMessage(error);

         return Promise.reject(error);
      },
   );

   return axiosInstance;
};

export default createInstance;
