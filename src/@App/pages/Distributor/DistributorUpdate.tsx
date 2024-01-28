/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import ROUTE_PATH from '@App/configs/router-path';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import distributorService from '@App/services/distributor.service';
import { errorMessage, successMessage } from '@Core/Helper/message';
import { AxiosError } from 'axios';
import { HandleErrorApi } from '@Core/Api/axios-config';
import HttpStatusCode from '@Core/Configs/HttpStatusCode';
import setErrorMessageHookForm from '@App/helpers/setErrorMessageHookForm';
import { useNavigate, useParams } from 'react-router-dom';
import setValueHookForm from '@App/helpers/setValueHookForm';

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

   const { refetch: getDistributor } = useQuery(
      ['getDistributor', distributorId],
      async () => {
         const res = await distributorService.find(distributorId!);
         return res.data;
      },
      {
         onSuccess: (data) => {
            setValueHookForm(form.setValue, data);
            setValueHookForm(form.setValue, data.bank_account_id);
            setValueHookForm(form.setValue, data.address.district);
            // province
            form.setValue('address.province.code', data.address.province.code);
            form.setValue('address.province.name', data.address.province.name);
            // district
            form.setValue('address.district.name', data.address.district.name);
            form.setValue('address.district.code', data.address.district.code);
            // ward
            form.setValue('address.wards.code', data.address.wards.code);
            form.setValue('address.wards.name', data.address.wards.name);

            // form.setValue('bank_account_number', .bank_account_number as string);
         },
      },
   );

   const { mutate: handleUpdateDistributor, isLoading } = useMutation({
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
         <BaseFormDistributor form={form} onSubmitForm={onSubmitForm} isLoading={isLoading} />
      </BaseBreadcrumbs>
   );
};

export default DistributorUpdate;
