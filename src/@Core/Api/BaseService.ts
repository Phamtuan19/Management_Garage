import { AxiosInstance } from 'axios';
import createInstance from './axios';

interface TypeRequestParams {
   page_index: number;
   page_size: number;
   sort: string;
}

type TData = {
   [key: string]: any; // Loại này có thể được điều chỉnh để phù hợp với cấu trúc dữ liệu thực tế của bạn
};

class BaseService {
   //
   BASE_URL: string = import.meta.env.VITE_BASE_URL + '/api';

   BASE_ENDPOINT: string = '';

   DEFAULT_LIMIT: number = 10;

   DEFAULT_PAGE: number = 1;

   PRIMARY_KEY: string = 'id';

   DEFAULT_SORT = 'asc';

   request!: AxiosInstance;

   requestParams: TypeRequestParams | null = null;

   constructor() {
      this.setRequest();
   }

   setRequest() {
      this.request = createInstance(this.BASE_URL);

      this.requestParams = {
         page_index: this.DEFAULT_PAGE,
         page_size: this.DEFAULT_LIMIT,
         sort: this.DEFAULT_SORT,
      };
   }

   /**
    * @param {Object} query
    * @returns
    */
   get<Q>(query?: TypeRequestParams | Q): Promise<Array<Q>> {
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
   find<T>(id: string): Promise<T> {
      const url = `${this.BASE_ENDPOINT}/${id}`;
      return this.request.get(url);
   }

   /**
    * @param {Object} data
    * @returns
    */
   create<T>(data: TData): Promise<T> {
      return this.request.post(this.BASE_ENDPOINT, data);
   }

   /**
    * @param {Object} data
    * @returns
    */
   update<T>(data: TData, id?: string, method: 'put' | 'patch' = 'put'): Promise<T> {
      const updateId = id || data[this.PRIMARY_KEY];

      return this.request[method](`${this.BASE_ENDPOINT}/${updateId}`, data);
   }

   /**
    * @param {Object} data
    * @returns
    */
   save<T>(data: TData): Promise<T> {
      // kiểm tra xem có id nếu có thì update còn chưa thì tạo mới
      if (data.hasOwnProperty(this.PRIMARY_KEY) && data[this.PRIMARY_KEY]) {
         return this.update(data);
      } else {
         return this.create(data);
      }
   }

   /**
    * @param {string} id
    * @returns
    */
   delete(id: string): Promise<AxiosInstance> {
      return this.request.delete(this.BASE_ENDPOINT + '/' + id);
   }
}

export default BaseService;
