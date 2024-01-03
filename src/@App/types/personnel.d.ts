/* eslint-disable @typescript-eslint/naming-convention */
interface dataPersonnel {
   _id?: string;
   code?: string;
   full_name?: string;
   email?: string;
   phone?: string;
   address?: string;
   account_type?: string;
   is_lock?: string;
   createdAt?: string;
   updatedAt?: string;
   gender?: string;
   avatar?: string;
   [x: string]: string;
}

interface ResponseDataPersonnel {
   success: boolean;
   message: string;
   data: {
      data: dataPersonnel[];
      total_page: number;
      total_record: number;
      page: number;
      limit: number;
   };
}
