import BaseService from '@Core/Api/BaseService';
import { AxiosResponseData } from '@Core/Api/axios-config';

export const personnelPathUrl = {
   BASE: 'personnel',
   ALL_FIELD: '/all-field',
};
export interface IPersonnel {
   _id: string;
   code: string;
   fullName?: string;
   email?: string;
   accountName?: string;
   phone?: string;
   password?: string;
   avatarUrl?: string;
   birthDay?: Date;
   hireDate?: Date; // Ngày nhận việc
   leaveDate?: Date; // Ngày nghỉ làm
   cccdNumber?: string; // Số CMND hoặc chứng minh nhân dân
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
   roleId?: string; // Tên chức vụ - có thể là null nếu lưu dữ liệu khách hàng
   isLock?: boolean;
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
