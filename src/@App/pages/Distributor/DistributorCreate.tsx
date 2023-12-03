import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import { SubmitHandler, useForm } from 'react-hook-form';
import BaseFormDistributor from './components/BaseFormDistributor';
import { DistributorSchema, distributorSchema } from './utils/distributor.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import distributorService from '@App/services/distributor.service';
import { errorMessage, successMessage } from '@Core/Helper/message';
import { HandleErrorApi } from '@Core/Api/type';
import { AxiosError } from 'axios';
import HttpStatusCode from '@Core/Configs/HttpStatusCode';
import setErrorMessageHookForm from '@App/helpers/setErrorMessageHookForm';

const DistributorCreate = () => {
   const form = useForm<DistributorSchema>({
      resolver: yupResolver(distributorSchema),
      defaultValues: distributorSchema.getDefault(),
   });

   const { mutate: handleCreateDistributor, isLoading } = useMutation({
      mutationFn: async (data: DistributorSchema) => {
         return await distributorService.create(data);
      },
      onSuccess: () => {
         successMessage('Tạo mới nhà phân phối thành công.');
      },
      onError: (err: AxiosError) => {
         const dataError = err.response?.data as HandleErrorApi;

         if (Number(dataError.statusCode) === Number(HttpStatusCode.BAD_REQUEST)) {
            return setErrorMessageHookForm(form.setError, dataError.message);
         }

         return errorMessage(err);
      },
   });

   const onSubmitForm: SubmitHandler<DistributorSchema> = (data) => handleCreateDistributor(data);

   return (
      <BaseBreadcrumbs arialabel="thêm nhà phân phối">
         <Box p={1}>
            <BaseFormDistributor form={form} onSubmitForm={onSubmitForm} isLoading={isLoading} />
         </Box>
      </BaseBreadcrumbs>
   );
};

export default DistributorCreate;
