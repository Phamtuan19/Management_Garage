/* eslint-disable @typescript-eslint/naming-convention */

import messageValidate from '@App/helpers/messageValidate';
import * as yup from 'yup';
export const repairorderSchema = yup.object({
   code: yup.string().required(messageValidate.required('Mã phiếu sửa chữa')).trim().strict(true).default(''),
   personnel_id: yup.object().required(messageValidate.required('Nhân viên tạo')).default({}),
   car_id: yup.object().required(messageValidate.required('Xe')).default({}),
   kilometer: yup.string().required(messageValidate.required('Số km')).trim().strict(true).default(''),
   status: yup.string().required(messageValidate.required('Trạng thái')).trim().strict(true).default(''),
   describe: yup.string().required(messageValidate.required('Mô tả')).trim().strict(true).default(''),
});
export type RepairorderSchema = yup.InferType<typeof repairorderSchema>;
