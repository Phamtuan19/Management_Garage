/* eslint-disable @typescript-eslint/naming-convention */
import messageValidate from '@App/helpers/messageValidate';
import Regexs from '@Core/Configs/Regexs';
import { format } from 'date-fns';
import * as yup from 'yup';

export const carSchema = yup.object({
   name: yup.string().required(messageValidate.required('Tên')).default(''),
   phone: yup
      .string()
      .required(messageValidate.required('SĐT'))
      .matches(Regexs.phoneVn, messageValidate.format('SĐT'))
      .default(''),
   email: yup
      .string()
      .required(messageValidate.required('Email'))
      .test('is-check-email', 'Email không hợp lệ', (value) => {
         if (value) {
            return !!value.match(Regexs.email);
         }

         return true;
      })
      .max(100, messageValidate.maxText('Email', 100))
      .default(''),
   gender: yup.string().required('Giới tính không được để trống').default('Nam'),

   // XE

   car_name: yup
      .string()
      .test('is-required', 'Tên xe xe không được để trống', function (value) {
         const { brand_car, license_plate, production_year, car_color, car_type } = this.parent as CarSchema;

         if (
            brand_car !== '' ||
            license_plate !== '' ||
            production_year !== '' ||
            car_color !== '' ||
            car_type !== ''
         ) {
            if (value) {
               return true;
            }

            return false;
         }

         return true;
      })
      .default(''),

   brand_car: yup
      .string()
      .test('is-required', 'Thương hiệu xe không được để trống', function (value) {
         const { car_name, license_plate, production_year, car_color, car_type } = this.parent as CarSchema;

         if (car_name !== '' || license_plate !== '' || production_year !== '' || car_color !== '' || car_type !== '') {
            if (value) {
               return true;
            }
            return false;
         }

         return true;
      })
      .default(''),
   license_plate: yup
      .string()
      .test('is-required', 'Biển số xe không được để trống', function (value) {
         const { car_name, brand_car, production_year, car_color, car_type } = this.parent as CarSchema;

         if (car_name !== '' || brand_car !== '' || production_year !== '' || car_color !== '' || car_type !== '') {
            if (value) {
               return true;
            }
            return false;
         }

         return true;
      })
      .test('is-check-license-plate', 'Biển số xe không hợp lệ', (value) => {
         if (value) {
            return !!value.match(Regexs.licensePlate);
         }

         return true;
      })
      .default(''),
   production_year: yup
      .string()
      .test('is-required', 'Năm sản xuất không được để trống', function (value) {
         const { car_name, brand_car, license_plate, car_color, car_type } = this.parent as CarSchema;

         if (car_name !== '' || brand_car !== '' || license_plate !== '' || car_color !== '' || car_type !== '') {
            if (value) {
               return true;
            }
            return false;
         }

         return true;
      })
      .test('is-future-year', 'Năm sản xuất không thể lớn hơn năm hiện tại', function (value) {
         if (value) {
            const currentYear = format(new Date(), 'yyyy');
            const selectedYear = format(new Date(value), 'yyyy');
            if (selectedYear > currentYear) {
               return false; // Trả về false nếu năm sản xuất lớn hơn năm hiện tại
            }
            return true; // Trả về true nếu năm sản xuất hợp lệ
         }

         return true;
      })
      .default(''),
   car_color: yup
      .string()
      .test('is-required', 'Màu xe không được để trống', function (value) {
         const { car_name, brand_car, license_plate, production_year, car_type } = this.parent as CarSchema;

         if (car_name !== '' || brand_car !== '' || license_plate !== '' || production_year !== '' || car_type !== '') {
            if (value) {
               return true;
            }
            return false;
         }

         return true;
      })
      .default(''),
   car_type: yup
      .string()
      .test('is-required', 'Loại xe không được để trống', function (value) {
         const { car_name, brand_car, license_plate, production_year, car_color } = this.parent as CarSchema;

         if (
            car_name !== '' ||
            brand_car !== '' ||
            license_plate !== '' ||
            production_year !== '' ||
            car_color !== ''
         ) {
            if (value) {
               return true;
            }
            return false;
         }

         return true;
      })
      .default(''),
});

export type CarSchema = yup.InferType<typeof carSchema>;
