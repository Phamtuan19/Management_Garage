/* eslint-disable @typescript-eslint/naming-convention */

import BaseService from '@Core/Api/BaseService';
import { AxiosResponseData } from '@Core/Api/axios-config';

export const personnelPathUrl = {
   BASE: 'personnel',
   ALL_FIELD: '/all-field',
};
export interface IPersonnel {
   _id: string;
   code?: string;
   full_name?: string;
   email?: string;
   account_name?: string;
   phone?: string;
   password?: string;
   avatar_url?: string;
   birth_day?: Date;
   hire_date?: Date; // Ngày nhận việc
   leave_date?: Date; // Ngày nghỉ làm
   cccd_number?: string; // Số CMND hoặc chứng minh nhân dân
   gender?: string;
   address?: {
      province: {
         code: number;
         name: string;
      };
      district: {
         code: number;
         name: string;
      };
      wards: {
         code: number;
         name: string;
      };
      specific: string;
   };
   bankAccountId?: string;
   role_id: {
      name: string;
   }; // Tên chức vụ - có thể là null nếu lưu dữ liệu khách hàng
   isLock?: boolean;
   createdAt: string;
   updatedAt: string;
   isAdmin: boolean;
}
class PersonnelService extends BaseService {
   BASE_ENDPOINT = personnelPathUrl.BASE;

   constructor() {
      super();
      this.setRequest();
   }

   fieldAll(): Promise<AxiosResponseData> {
      return this.request(this.BASE_ENDPOINT + personnelPathUrl.ALL_FIELD);
   }
}

const personnelService = new PersonnelService();

export default personnelService;
