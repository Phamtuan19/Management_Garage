import { ModulePagePropsType } from '@App/configs/module-page';
import { PageActionPropsType } from '@App/configs/page-action';
import BaseService from '@Core/Api/BaseService';

const permissionServicePath = {
   base: 'roles',
};

export interface RoleResponseData {
   _id: string;
   name: string;
   describe: string;
   permission: '*' | Record<ModulePagePropsType, '*' | Array<PageActionPropsType>>;
}

class RoleService extends BaseService {
   BASE_ENDPOINT = permissionServicePath.base;

   constructor() {
      super();
      this.setRequest();
   }
}

const roleService = new RoleService();

export default roleService;
