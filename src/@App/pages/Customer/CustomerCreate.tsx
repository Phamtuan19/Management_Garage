import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import customerService from '@App/services/customer.service';
import { errorMessage, successMessage } from '@Core/Helper/message';
import { HandleErrorApi } from '@Core/Api/axios-config';
import { AxiosError } from 'axios';
import setErrorMessageHookForm from '@App/helpers/setErrorMessageHookForm';
import { useNavigate } from 'react-router-dom';
import ROUTE_PATH from '@App/configs/router-path';

import { CustomerSchema, customerSchema } from './utils/customer.schema';
import BaseFormCustomer from './components/BaseFormCustomer';

const breadcrumbs = [
   {
      title: 'Danh Sách Khách Hàng',
      link: ROUTE_PATH.CUSTOMERS,
   },
];
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
         setErrorMessageHookForm<CustomerSchema>(form.setError, dataError.data as never);
         return errorMessage(err);
      },
   });

   const onSubmitForm: SubmitHandler<CustomerSchema> = (data) => handleCreateCustomer(data);

   return (
      <BaseBreadcrumbs
         arialabel="Thêm mới"
         breadcrumbs={breadcrumbs}
         sx={({ base }) => ({
            marginTop: '12px',
            padding: '12px',
            borderRadius: '5px',
            backgroundColor: base.background.white as string,
            bgcolor: base.background.default,
            border: 'none',
            p: 0,
         })}
      >
         <BaseFormCustomer form={form} onSubmitForm={onSubmitForm} isLoading={isLoading} />
      </BaseBreadcrumbs>
   );
};

export default CustomerCreate;
