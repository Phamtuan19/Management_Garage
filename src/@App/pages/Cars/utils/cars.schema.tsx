/* eslint-disable @typescript-eslint/naming-convention */
import messageValidate from '@App/helpers/messageValidate';
import Regexs from '@Core/Configs/Regexs';
import { format } from 'date-fns';
import * as yup from 'yup';

export const carsSchema = yup.object({
   name: yup.string().required(messageValidate.required('Tên xe')).default(''),
   brand_car: yup
      .string()
      .required(messageValidate.required('Thương hiệu xe'))

      .default(''),
   license_plate: yup
      .string()
      .required(messageValidate.required('Biển số xe'))
      .matches(Regexs.licensePlate, 'Biển số xe không hợp lệ')
      .default(''),
   production_year: yup
      .string()
      .required(messageValidate.required('Năm sản xuất'))
      .test('is-future-year', 'Năm sản xuất không thể lớn hơn năm hiện tại', function (value) {
         if (value) {
            const currentYear = format(new Date(), 'yyyy');
            const selectedYear = format(new Date(value), 'yyyy');
            if (selectedYear > currentYear) {
               return false; // Trả về false nếu năm sản xuất lớn hơn năm hiện tại
            }
            return true; // Trả về true nếu năm sản xuất hợp lệ
         }
      })
      .default(''),
   car_color: yup.string().required(messageValidate.required('Màu sắc xe')).trim().default(''),
   car_type: yup.string().required(messageValidate.required('Kiểu dáng xe')).trim().default(''),
   customer_id: yup.string().required(messageValidate.required('Danh sách khách hàng')),
});
export type CarsSchema = yup.InferType<typeof carsSchema>;
