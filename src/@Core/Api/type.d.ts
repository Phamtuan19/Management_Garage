import { HttpStatusCodeSType } from '@Core/Configs/HttpStatusCode';

interface AxiosResponseData {
   success: boolean;
   statusCode: HttpStatusCodeSType;
   message: string;
   data: { [key: string]: string }[] | { [key: string]: string } | null;
}
