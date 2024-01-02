/* eslint-disable @typescript-eslint/naming-convention */
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import BaseFormDistributor from './components/BaseFormDistributor';
import ROUTE_PATH from '@App/configs/router-path';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { DistributorSchema, distributorSchema } from './utils/distributor.schema';
import { useMutation, useQuery } from '@tanstack/react-query';
import distributorService from '@App/services/distributor.service';
import { errorMessage, successMessage } from '@Core/Helper/message';
import { AxiosError } from 'axios';
import { HandleErrorApi } from '@Core/Api/axios-config';
import HttpStatusCode from '@Core/Configs/HttpStatusCode';
import setErrorMessageHookForm from '@App/helpers/setErrorMessageHookForm';
import { useParams } from 'react-router-dom';
import setValueHookForm from '@App/helpers/setValueHookForm';

const breadcrumbs = [
   {
      title: 'Nhà phân phối',
      link: ROUTE_PATH.DISTRIBUTORS,
   },
];

const DistributorUpdate = () => {
   const { id: distributorId } = useParams();

   const form = useForm<DistributorSchema>({
      resolver: yupResolver(distributorSchema),
      defaultValues: distributorSchema.getDefault(),
   });

   const { refetch: getDistributorDetail } = useQuery(
      ['getDistributorDetail', distributorId],
      async () => {
         const res = await distributorService.find(distributorId!);
         return res.data;
      },
      {
         onSuccess: (data) => {
            setValueHookForm(form.setValue, data.distributor as never);
         },
      },
   );

   const { mutate: handleUpdateDistributor, isLoading } = useMutation({
      mutationFn: async (data: Omit<DistributorSchema, 'province' | 'district' | 'ward'>) => {
         return await distributorService.update(data, distributorId);
      },
      onSuccess: async () => {
         successMessage('Tạo mới nhà phân phối thành công.');
         await getDistributorDetail();
      },
      onError: (err: AxiosError) => {
         const dataError = err.response?.data as HandleErrorApi;

         if (Number(dataError.statusCode) === Number(HttpStatusCode.BAD_REQUEST)) {
            return setErrorMessageHookForm(form.setError, dataError.message) as never;
         }

         return errorMessage(err);
      },
   });

   const onSubmitForm: SubmitHandler<DistributorSchema> = (data) => {
      const newData = {
         name: data.name,
         email: data.email,
         phone: data.phone,
         bank_number: data.bank_number,
         bank_branch: data.bank_branch,
         bank_name: data.bank_name,
         bank_account_name: data.bank_account_name,
         address: data.district + '+' + data.province + '+' + data.ward + '+' + data.address,
      };

      handleUpdateDistributor(newData);
   };

   return (
      <BaseBreadcrumbs arialabel="Thêm mới" breadcrumbs={breadcrumbs}>
         <BaseFormDistributor form={form} onSubmitForm={onSubmitForm} isLoading={isLoading} />
      </BaseBreadcrumbs>
   );
};

export default DistributorUpdate;
