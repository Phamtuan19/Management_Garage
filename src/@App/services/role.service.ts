import { ModulePagePropsType } from '@App/configs/module-page';
import { PageActionPropsType } from '@App/configs/page-action';
import BaseService from '@Core/Api/BaseService';
import { AxiosRequestConfig } from 'axios';

const rolePath = {
   base: 'roles',
   ALL_FIELD: '/all-field',
};

export interface RoleResponseData {
   _id: string;
   name: string;
   describe: string;
   permission: '*' | Record<ModulePagePropsType, '*' | Array<PageActionPropsType>>;
}

export interface ResponseRoleFiellAll extends AxiosRequestConfig {
   data: Pick<RoleResponseData, '_id' | 'name'>[];
}

class RoleService extends BaseService {
   BASE_ENDPOINT = rolePath.base;

   constructor() {
      super();
      this.setRequest();
   }

   fieldAll(): Promise<ResponseRoleFiellAll> {
      return this.request(this.BASE_ENDPOINT + rolePath.ALL_FIELD);
   }
}

const roleService = new RoleService();

export default roleService;
