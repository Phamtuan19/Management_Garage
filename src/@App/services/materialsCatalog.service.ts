import BaseService from '@Core/Api/BaseService';

const permissionServicePath = {
   base: 'materials-catalog',
};

export interface MaterialsCatalogResponse {
   _id: string;
   code: string;
   describe: string;
   name: string;
   updatedAt: string;
}

class MaterialsCatalogService extends BaseService {
   BASE_ENDPOINT = permissionServicePath.base;

   constructor() {
      super();
      this.setRequest();
   }
}

const materialsCatalogService = new MaterialsCatalogService();

export default materialsCatalogService;
