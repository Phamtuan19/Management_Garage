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
import { HandleErrorApi } from '@Core/Api/type';
import HttpStatusCode from '@Core/Configs/HttpStatusCode';
import setErrorMessageHookForm from '@App/helpers/setErrorMessageHookForm';
import { useParams } from 'react-router-dom';

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

   useQuery(
      ['getDistributorDetail', distributorId],
      async () => {
         const res = await distributorService.find(distributorId!);
         return res.data;
      },
      {
         onSuccess: (data) => {},
      },
   );

   const { mutate: handleUpdateDistributor, isLoading } = useMutation({
      mutationFn: async (data: DistributorSchema) => {
         return await distributorService.update(data, distributorId);
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

   const onSubmitForm: SubmitHandler<DistributorSchema> = (data) => handleUpdateDistributor(data);

   return (
      <BaseBreadcrumbs arialabel="Thêm mới" breadcrumbs={breadcrumbs}>
         <BaseFormDistributor form={form} onSubmitForm={onSubmitForm} isLoading={isLoading} />
      </BaseBreadcrumbs>
   );
};

export default DistributorUpdate;