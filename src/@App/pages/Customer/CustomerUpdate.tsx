/* eslint-disable import/order */
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import ROUTE_PATH from '@App/configs/router-path';
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
import { useNavigate } from 'react-router-dom';
import { CustomerSchema, customerSchema } from '../Customer/utils/customer.schema';
import customerService from '@App/services/customer.service';
import BaseFormCustomer from '../Customer/components/BaseFormCustomer';
const breadcrumbs = [
   {
      title: 'Khách hàng',
      link: ROUTE_PATH.CUSTOMERS,
   },
];

const CustomerUpdate = () => {
   const { id: customerId } = useParams();
   const navigate = useNavigate();
   const form = useForm<CustomerSchema>({
      resolver: yupResolver(customerSchema),
      defaultValues: customerSchema.getDefault(),
   });

   const { refetch: getCustomer } = useQuery(
      ['getCustomer', customerId],
      async () => {
         const res = await customerService.find(customerId!);
         return res.data;
      },

      {
         onSuccess: (data) => {
            setValueHookForm(form.setValue, data as never);
         },
      },
   );

   const { mutate: Customer, isLoading } = useMutation({
      mutationFn: async (data: CustomerSchema) => {
         return await customerService.update(data, customerId, 'patch');
      },
      onSuccess: async () => {
         successMessage('Cập nhật thành công !');
         await getCustomer();
         navigate('/customers');
      },
      onError: (err: AxiosError) => {
         const dataError = err.response?.data as HandleErrorApi;

         if (Number(dataError.statusCode) === Number(HttpStatusCode.BAD_REQUEST)) {
            return setErrorMessageHookForm(form.setError, dataError.message);
         }

         return errorMessage(err);
      },
   });

   const onSubmitForm: SubmitHandler<CustomerSchema> = (data) => Customer(data);

   return (
      <BaseBreadcrumbs arialabel="Cập nhật thông tin" breadcrumbs={breadcrumbs}>
         <BaseFormCustomer onSubmitForm={onSubmitForm} form={form} isLoading={isLoading} isUpdate />
      </BaseBreadcrumbs>
   );
};

export default CustomerUpdate;
