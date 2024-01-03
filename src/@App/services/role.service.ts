import BaseService from '@Core/Api/BaseService';

const permissionServicePath = {
   base: 'roles',
};

class ModuleRoleService extends BaseService {
   BASE_ENDPOINT = permissionServicePath.base;

   constructor() {
      super();
      this.setRequest();
   }
}

const moduleRoleService = new ModuleRoleService();

export default moduleRoleService;
