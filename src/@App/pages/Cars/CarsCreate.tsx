import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import ROUTE_PATH from '@App/configs/router-path';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { errorMessage, successMessage } from '@Core/Helper/message';
import { AxiosError } from 'axios';
import HttpStatusCode from '@Core/Configs/HttpStatusCode';
import setErrorMessageHookForm from '@App/helpers/setErrorMessageHookForm';
import { HandleErrorApi } from '@Core/Api/axios-config';
import { useNavigate } from 'react-router-dom';
import carsService from '@App/services/cars.service';

import BaseFormCars from './Components/BaseFormCars';
import { CarsSchema, carsSchema } from './utils/cars.schema';

const breadcrumbs = [
   {
      title: 'Thông Tin Xe',
      link: ROUTE_PATH.CARS,
   },
];
const CarsCreate = () => {
   const form = useForm<CarsSchema>({
      resolver: yupResolver(carsSchema),
      defaultValues: carsSchema.getDefault(),
   });
   const navigate = useNavigate();
   const { mutate: CarsCreate, isLoading } = useMutation({
      mutationFn: async (data: CarsSchema) => {
         return await carsService.create(data);
      },
      onSuccess: () => {
         successMessage('Tạo mới thông tin xe thành công.');
         form.reset();
         navigate('/cars');
      },
      onError: (err: AxiosError) => {
         const dataError = err.response?.data as HandleErrorApi;

         if (Number(dataError.statusCode) === Number(HttpStatusCode.BAD_REQUEST)) {
            return setErrorMessageHookForm(form.setError, dataError.message);
         }

         return errorMessage(err);
      },
   });

   const onSubmitForm: SubmitHandler<CarsSchema> = (data) => CarsCreate(data);

   return (
      <BaseBreadcrumbs
         arialabel="Thêm mới"
         breadcrumbs={breadcrumbs}
         sx={({ base }) => ({
            marginTop: '12px',
            padding: '12px',
            borderRadius: '5px',
            backgroundColor: base.background.white as string,
            bgcolor: base.background.default,
            border: 'none',
            p: 0,
         })}
      >
         <BaseFormCars form={form} onSubmitForm={onSubmitForm} isLoading={isLoading} />
      </BaseBreadcrumbs>
   );
};

export default CarsCreate;
