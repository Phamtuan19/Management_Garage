import BaseService from '@Core/Api/BaseService';

const permissionServicePath = {
   base: 'roles',
};

export interface RoleResponseData {
   _id: string;
   name: string;
   permission: string | { [key: string]: string | Array<string> }[];
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
