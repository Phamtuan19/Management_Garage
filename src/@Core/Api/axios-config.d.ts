import { HttpStatusCodeSType } from '@Core/Configs/HttpStatusCode';

export interface AxiosResponseData {
   success: boolean;
   message: string;
   data: AxiosResponseDataType;
}

export interface AxiosResponseDataType {
   [key: string]: { [key: string]: string }[] | { [key: string]: string } | null | undefined;
}

export interface HandleErrorApi {
   success: boolean;
   statusCode: HttpStatusCodeSType;
   message: { [key: string]: string[] };
}
