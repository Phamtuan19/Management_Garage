import BaseService from '@Core/Api/BaseService';

import { CarStatusKeys } from './../configs/status-config';

const permissionServicePath = {
   base: 'materials-catalog',
};
export interface IMaterialsCatalog {
   _id: string;
   code: string;
   name: string;
   status: CarStatusKeys;
   describe: string;
   createdAt: string;
   updatedAt: string;
}

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
