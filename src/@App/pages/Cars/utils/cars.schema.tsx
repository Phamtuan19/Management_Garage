/* eslint-disable @typescript-eslint/naming-convention */
import messageValidate from '@App/helpers/messageValidate';
import * as yup from 'yup';
export const carsSchema = yup.object({
   name: yup.string().required(messageValidate.required('Tên xe')).trim().strict(true).default(''),
   brand_car: yup.string().required(messageValidate.required('Thương hiệu xe')).trim().default(''),
   license_plate: yup.string().required(messageValidate.required('Biển số xe')).default(''),
   production_year: yup.string().required(messageValidate.required('Năm sản xuất')).default(''),
   car_color: yup.string().required(messageValidate.required('Màu sắc xe')).trim().default(''),
   car_type: yup.string().required(messageValidate.required('Kiểu dáng xe')).trim().default(''),
   status: yup.string().required(messageValidate.required('Trạng thái')).trim().default(''),
});
export type CarsSchema = yup.InferType<typeof carsSchema>;
