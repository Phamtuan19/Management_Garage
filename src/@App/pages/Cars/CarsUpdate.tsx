import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import ROUTE_PATH from '@App/configs/router-path';
import { useNavigate } from 'react-router-dom';
import carsService from '@App/services/cars.service';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { errorMessage, successMessage } from '@Core/Helper/message';
import { AxiosError } from 'axios';
import HttpStatusCode from '@Core/Configs/HttpStatusCode';
import setErrorMessageHookForm from '@App/helpers/setErrorMessageHookForm';
import { useParams } from 'react-router-dom';
import setValueHookForm from '@App/helpers/setValueHookForm';
import { HandleErrorApi } from '@Core/Api/axios-config';

import { CarsSchema, carsSchema } from './utils/cars.schema';
import BaseFormCars from './Components/BaseFormCars';

const breadcrumbs = [
   {
      title: 'Dịch vụ sửa chữa',
      link: ROUTE_PATH.CARS,
   },
];

const CarsUpdate = () => {
   const { id: carsId } = useParams();
   const navigate = useNavigate();
   const form = useForm<CarsSchema>({
      resolver: yupResolver(carsSchema),
      defaultValues: carsSchema.getDefault(),
   });
   const { refetch: getCars } = useQuery(
      ['getCars', carsId],
      async () => {
         const res = await carsService.find(carsId!);
         return res.data;
      },
      {
         onSuccess: (data) => {
            setValueHookForm(form.setValue, data as never);
         },
      },
   );

   const { mutate: Cars, isLoading } = useMutation({
      mutationFn: async (data: CarsSchema) => {
         return await carsService.update(data, carsId, 'patch');
      },
      onSuccess: async () => {
         successMessage('Cập nhật thành công !');
         await getCars();
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

   const onSubmitForm: SubmitHandler<CarsSchema> = (data) => {
      Cars(data);
   };

   return (
      <BaseBreadcrumbs arialabel="Cập nhật thông tin" breadcrumbs={breadcrumbs}>
         <BaseFormCars onSubmitForm={onSubmitForm} form={form} isLoading={isLoading} isUpdate />
      </BaseBreadcrumbs>
   );
};

export default CarsUpdate;
