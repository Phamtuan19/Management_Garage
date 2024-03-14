/* eslint-disable @typescript-eslint/naming-convention */
interface SuppliesDetail {
   _id: string;
   code: string;
   supplies_id: {
      _id: string;
      code: string;
      name: string;
      materials_catalog_id: {
         _id: string;
         code: string;
         name: string;
         describe: string;
      };
      unit: string;
      discount: 0;
      describe: string;
   };
   distributor_id: {
      _id: string;
      code: string;
      name: string;
      phone: string;
      email: string;
   };
   name_detail: string;
   imported_price: 250000;
   selling_price: 0;
   isInStock: true;
   describe: string;

   createdAt: string;
   updatedAt: string;
   car: ['Audi a7', 'Audi a3'];
}
