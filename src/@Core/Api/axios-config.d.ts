/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpStatusCodeSType } from '@Core/Configs/HttpStatusCode';

export interface AxiosResponseData<TData = Record<string, any>> {
   [x: string]: RoleResponseData;
   map: any;
   success: boolean;
   message: string;
   data: TData;
}

export interface AxiosResponseDataType<TData = Record<string, any>> {
   [key: string]: TData;
}

export interface HandleErrorApi {
   data: any;
   success: boolean;
   statusCode: HttpStatusCodeSType;
   message: { [key: string]: string[] };
}
