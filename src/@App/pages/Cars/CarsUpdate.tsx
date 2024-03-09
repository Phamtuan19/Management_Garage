/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
import { format } from 'date-fns';

import { CarsSchema, carsSchema } from './utils/cars.schema';
import BaseFormCars from './components/BaseFormCars';

const breadcrumbs = [
   {
      title: 'Thông Tin Xe',
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

   const { data: car, refetch: getCars } = useQuery(
      ['getCars', carsId],
      async () => {
         const res = await carsService.find(carsId!);
         return res.data;
      },
      {
         onSuccess: (data) => {
            setValueHookForm(form.setValue, data as never);
            form.setValue('customer_id', data.customer_id._id as string);
            form.setValue('production_year', '');

            return data;
         },
      },
   );

   const { mutate: Cars, isLoading } = useMutation({
      mutationFn: async (data: CarsSchema) => {
         return await carsService.update(
            {
               ...data,
               production_year: String(format(new Date(data.production_year), 'yyyy')),
            },
            carsId,
            'patch',
         );
      },
      onSuccess: async () => {
         successMessage('Cập nhật thành công !');
         await getCars();
         navigate(ROUTE_PATH.CARS);
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
      <BaseBreadcrumbs breadcrumbs={breadcrumbs} arialabel={`${car?.name} - (#${car?.code})`}>
         <BaseFormCars onSubmitForm={onSubmitForm} form={form} isLoading={isLoading} />
      </BaseBreadcrumbs>
   );
};

export default CarsUpdate;
