import BaseService from '@Core/Api/BaseService';

const permissionServicePath = {
   base: 'dashboard/permission',
};

class ModulePermissionService extends BaseService {
   BASE_ENDPOINT = permissionServicePath.base;

   constructor() {
      super();
      this.setRequest();
   }
}

const modulePermissionService = new ModulePermissionService();

export default modulePermissionService;
