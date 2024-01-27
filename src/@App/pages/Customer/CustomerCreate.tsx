import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import customerService from '@App/services/customer.service';
import { errorMessage, successMessage } from '@Core/Helper/message';
import { HandleErrorApi } from '@Core/Api/axios-config';
import { AxiosError } from 'axios';
import HttpStatusCode from '@Core/Configs/HttpStatusCode';
import setErrorMessageHookForm from '@App/helpers/setErrorMessageHookForm';

import { CustomerSchema, customerSchema } from './utils/customer.schema';
// eslint-disable-next-line import/order
import BaseFormCustomer from './components/BaseFormCustomer';
// eslint-disable-next-line import/order
import { useNavigate } from 'react-router-dom';
const CustomerCreate = () => {
   const form = useForm<CustomerSchema>({
      resolver: yupResolver(customerSchema),
      defaultValues: customerSchema.getDefault(),
   });
   const navigate = useNavigate();
   const { mutate: handleCreateCustomer, isLoading } = useMutation({
      mutationFn: async (data: CustomerSchema) => {
         return await customerService.create(data);
      },
      onSuccess: () => {
         successMessage('Thêm mới khách hàng thành công .');
         form.reset();
         navigate('/customers');
      },
      onError: (err: AxiosError) => {
         const dataError = err.response?.data as HandleErrorApi;

         if (Number(dataError.statusCode) === Number(HttpStatusCode.BAD_REQUEST)) {
            return setErrorMessageHookForm<CustomerSchema>(form.setError, dataError.message);
         }

         return errorMessage(err);
      },
   });

   const onSubmitForm: SubmitHandler<CustomerSchema> = (data) => handleCreateCustomer(data);

   return (
      <BaseBreadcrumbs arialabel="Thêm khách hàng">
         <BaseFormCustomer form={form} onSubmitForm={onSubmitForm} isLoading={isLoading} />
      </BaseBreadcrumbs>
   );
};

export default CustomerCreate;