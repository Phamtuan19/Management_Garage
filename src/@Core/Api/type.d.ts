import { HttpStatusCodeSType } from '@Core/Configs/HttpStatusCode';

interface AxiosResponseData {
   success: boolean;
   statusCode: HttpStatusCodeSType;
   message: string;
   data: AxiosResponseDataType;
}

interface AxiosResponseDataType {
   [key: string]: { [key: string]: string }[] | { [key: string]: string } | null;
   [key: string]: { [key: string]: string };
}
