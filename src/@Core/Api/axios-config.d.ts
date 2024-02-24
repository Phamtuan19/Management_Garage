/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpStatusCodeSType } from '@Core/Configs/HttpStatusCode';

export interface AxiosResponseData<TData = Record<string, any>> {
   map: any;
   success: boolean;
   message: string;
   data: TData;
}

export interface AxiosResponseDataType<TData = Record<string, any>> {
   [key: string]: TData;
}

export interface HandleErrorApi {
   [x: string]: {
      account_name?: string[] | undefined;
      full_name?: string[] | undefined;
      password?: string[] | undefined;
      email?: string[] | undefined;
      phone?: string[] | undefined;
      role_id?: string[] | undefined;
   };
   success: boolean;
   statusCode: HttpStatusCodeSType;
   message: { [key: string]: string[] };
}
