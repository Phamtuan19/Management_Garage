/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable import/order */
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import distributorService from '@App/services/distributor.service';
import { errorMessage, successMessage } from '@Core/Helper/message';
import { HandleErrorApi } from '@Core/Api/axios-config';
import { AxiosError } from 'axios';
import setErrorMessageHookForm from '@App/helpers/setErrorMessageHookForm';
import { useNavigate } from 'react-router-dom';
import { DistributorSchema, distributorSchema } from './utils/distributor.schema';
import BaseFormDistributor from './components/BaseFormDistributor';
import ROUTE_PATH from '@App/configs/router-path';
import PageContent from '@App/component/customs/PageContent';
import { Box } from '@mui/material';
import { LoadingButton } from '@mui/lab';

const breadcrumbs = [
   {
      title: 'Nhà Phân Phối',
      link: ROUTE_PATH.DISTRIBUTORS,
   },
];
const DistributorCreate = () => {
   const navigate = useNavigate();
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
         form.reset();
         form.setValue('address.district.code', '');
         form.setValue('address.province.code', '');
         form.setValue('address.wards.code', '');
         navigate('/wh/distributors');
      },
      onError: (err: AxiosError) => {
         const dataError = err.response?.data as HandleErrorApi;

         setErrorMessageHookForm<DistributorSchema>(form.setError, dataError.data.data as never);

         return errorMessage(err);
      },
   });

   const onSubmitForm: SubmitHandler<DistributorSchema> = (data) => handleCreateDistributor(data);

   return (
      <BaseBreadcrumbs arialabel="Thêm mới" breadcrumbs={breadcrumbs}>
         <Box>
            <LoadingButton
               type="submit"
               variant="contained"
               loading={isLoading}
               onClick={form.handleSubmit(onSubmitForm)}
            >
               Lưu
            </LoadingButton>
         </Box>
         <PageContent>
            <BaseFormDistributor form={form} />
         </PageContent>
      </BaseBreadcrumbs>
   );
};

export default DistributorCreate;
