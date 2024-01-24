import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import distributorService from '@App/services/distributor.service';
import { errorMessage, successMessage } from '@Core/Helper/message';
import { HandleErrorApi } from '@Core/Api/axios-config';
import { AxiosError } from 'axios';
import HttpStatusCode from '@Core/Configs/HttpStatusCode';
import setErrorMessageHookForm from '@App/helpers/setErrorMessageHookForm';

import { DistributorSchema, distributorSchema } from './utils/distributor.schema';
import BaseFormDistributor from './components/BaseFormDistributor';

const DistributorCreate = () => {
   const form = useForm<DistributorSchema>({
      resolver: yupResolver(distributorSchema),
      defaultValues: distributorSchema.getDefault(),
   });

   const { mutate: handleCreateDistributor, isLoading } = useMutation({
      mutationFn: async (data: DistributorSchema) => {
         console.log(data);
         return await distributorService.create(data);
         
      },
      onSuccess: () => {
         successMessage('Tạo mới nhà phân phối thành công.');
         form.reset();
      },
      onError: (err: AxiosError) => {
         const dataError = err.response?.data as HandleErrorApi;

         if (Number(dataError.statusCode) === Number(HttpStatusCode.BAD_REQUEST)) {
            return setErrorMessageHookForm<DistributorSchema>(form.setError, dataError.message);
         }

         return errorMessage(err);
      },
   });

   const onSubmitForm: SubmitHandler<DistributorSchema> = (data) => handleCreateDistributor(data);

   return (
      <BaseBreadcrumbs arialabel="thêm nhà phân phối">
         <BaseFormDistributor form={form} onSubmitForm={onSubmitForm} isLoading={isLoading} />
      </BaseBreadcrumbs>
   );
};

export default DistributorCreate;
