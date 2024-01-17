import BaseService from '@Core/Api/BaseService';

const permissionServicePath = {
   base: 'materials-catalog',
};
export interface MaterialsCatalog {
   _id:string;
   code:string;
   name:string;
   describe:string;
   createdAt:string;
   updatedAt:string;
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
