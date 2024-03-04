/* eslint-disable @typescript-eslint/naming-convention */

import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import ROUTE_PATH from '@App/configs/router-path';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import distributorService, { IDistributor } from '@App/services/distributor.service';
import { errorMessage, successMessage } from '@Core/Helper/message';
import { AxiosError } from 'axios';
import { HandleErrorApi } from '@Core/Api/axios-config';
import HttpStatusCode from '@Core/Configs/HttpStatusCode';
import setErrorMessageHookForm from '@App/helpers/setErrorMessageHookForm';
import { useNavigate, useParams } from 'react-router-dom';
import PageContent from '@App/component/customs/PageContent';

import { DistributorSchema, distributorSchema } from './utils/distributor.schema';
import BaseFormDistributor from './components/BaseFormDistributor';

const breadcrumbs = [
   {
      title: 'Nhà phân phối',
      link: ROUTE_PATH.DISTRIBUTORS,
   },
];
const DistributorUpdate = () => {
   const { id: distributorId } = useParams();
   const navigate = useNavigate();
   const form = useForm<DistributorSchema>({
      resolver: yupResolver(distributorSchema),
      defaultValues: distributorSchema.getDefault(),
   });

   const { isLoading, refetch: getDistributor } = useQuery(
      ['getDistributor', distributorId],
      async () => {
         const res = await distributorService.find(distributorId!);
         return res.data as IDistributor;
      },
      {
         onSuccess: (data) => {
            form.reset({
               name: data.name,
               email: data.email,
               phone: data.phone,
               bank_name: data.bank_account_id.bank_name ?? '',
               bank_branch: data.bank_account_id.bank_branch ?? '',
               bank_account_number: data.bank_account_id.bank_account_number ?? '',
               account_holder_name: data.bank_account_id.account_holder_name ?? '',
               address: {
                  district: {
                     code: data.address.district.code,
                     name: data.address.district.name,
                  },
                  province: {
                     code: data.address.province.code,
                     name: data.address.province.name,
                  },
                  wards: {
                     code: data.address.wards.code,
                     name: data.address.wards.name,
                  },
                  specific: data.address.specific,
               },
            });
            return data;
         },
      },
   );

   const { mutate: handleUpdateDistributor } = useMutation({
      mutationFn: async (data: DistributorSchema) => {
         return await distributorService.update(data, distributorId);
      },
      onSuccess: async () => {
         successMessage('Cập nhật thành công !');
         await getDistributor();
         navigate('/wh/distributors');
      },
      onError: (err: AxiosError) => {
         const dataError = err.response?.data as HandleErrorApi;

         if (Number(dataError.statusCode) === Number(HttpStatusCode.BAD_REQUEST)) {
            return setErrorMessageHookForm(form.setError, dataError.message) as never;
         }

         return errorMessage(err);
      },
   });

   const onSubmitForm: SubmitHandler<DistributorSchema> = (data) => handleUpdateDistributor(data);

   return (
      <BaseBreadcrumbs arialabel="Cập nhật thông tin" breadcrumbs={breadcrumbs}>
         <PageContent>
            <BaseFormDistributor form={form} onSubmitForm={onSubmitForm} isLoading={isLoading} />
         </PageContent>
      </BaseBreadcrumbs>
   );
};

export default DistributorUpdate;
