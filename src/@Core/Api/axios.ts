import { errorMessage } from '@Core/Helper/message';
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const createInstance = (baseURL: string) => {
   const config = {
      baseURL: baseURL,
      headers: {
         'X-Requested-With': 'XMLHttpRequest',
      },
      withCredentials: false,
   };

   const axiosInstance = axios.create(config);

   axiosInstance.interceptors.request.use(
      (requestConfig: InternalAxiosRequestConfig<any>): InternalAxiosRequestConfig => {
         
         return requestConfig;
      },

      (requestError: AxiosError) => {
         return Promise.reject(requestError);
      },
   );

   axiosInstance.interceptors.response.use(
      (response: AxiosResponse): AxiosResponse => {
         if (response && response.data) {
            return response.data;
         } else {
            return response;
         }
      },
      async (error: Error | AxiosError<unknown, any>) => {
         if (axios.isAxiosError(error) && error.response?.status === 400) {
            errorMessage(error);
            console.log(error.message);
         }

         return Promise.reject(error);
      },
   );

   return axiosInstance;
};

export default createInstance;
