import { AxiosInstance } from 'axios';

import createInstance from './axios';
import { AxiosResponseData } from './axios-config';

interface TypeRequestParams {
   page: number;
   limit: number;
}

type TData = {
   [key: string]: unknown; // Loại này có thể được điều chỉnh để phù hợp với cấu trúc dữ liệu thực tế của bạn
};

class BaseService {
   //
   BASE_URL: string = import.meta.env.VITE_BASE_URL + '/api';

   BASE_ENDPOINT: string = '';

   DEFAULT_LIMIT: number = 10;

   DEFAULT_PAGE: number = 1;

   PRIMARY_KEY: string = 'id';

   DEFAULT_SORT: 'asc' | 'desc' = 'asc';

   request!: AxiosInstance;

   requestParams: TypeRequestParams | null = null;

   constructor() {
      this.setRequest();
   }

   setRequest() {
      this.request = createInstance(this.BASE_URL);

      this.requestParams = {
         page: this.DEFAULT_PAGE,
         limit: this.DEFAULT_LIMIT,
      };
   }

   /**
    * @param {Object} query
    * @returns
    */
   get<G>(query?: TypeRequestParams | G): Promise<AxiosResponseData> {
      const params = {
         ...this.requestParams,
         ...query,
      };

      return this.request.get(this.BASE_ENDPOINT, { params });
   }

   /**
    * @param {string} id
    * @returns
    */
   find(id: string): Promise<AxiosResponseData> {
      const url = `${this.BASE_ENDPOINT}/${id}`;
      return this.request.get(url);
   }

   /**
    * @param {Object} data
    * @returns
    */
   create(data: TData): Promise<AxiosResponseData> {
      return this.request.post(this.BASE_ENDPOINT + '/create', data);
   }

   /**
    * @param {Object} data
    * @returns
    */
   update(data: TData, id?: string, method: 'put' | 'patch' = 'put'): Promise<AxiosResponseData> {
      const updateId = id || (data[this.PRIMARY_KEY] as string);
      return this.request[method](`${this.BASE_ENDPOINT}/${updateId}`, data);
   }

   /**
    * @param {Object} data
    * @returns
    */
   save(data: TData): Promise<AxiosResponseData> {
      // kiểm tra xem có id nếu có thì update còn chưa thì tạo mới
      if (Object.prototype.hasOwnProperty.call(data, this.PRIMARY_KEY) && data[this.PRIMARY_KEY]) {
         return this.update(data);
      } else {
         return this.create(data);
      }
   }

   /**
    * @param {string} id
    * @returns
    */
   delete(id: string): Promise<AxiosResponseData> {
      return this.request.delete(this.BASE_ENDPOINT + '/' + id);
   }
}

export default BaseService;
