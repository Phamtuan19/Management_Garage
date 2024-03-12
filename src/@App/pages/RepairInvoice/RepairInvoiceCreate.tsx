/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-misused-promises */

import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useAuth } from '@App/redux/slices/auth.slice';
import ROUTE_PATH from '@App/configs/router-path';
import repairInvoiceService from '@App/services/repair-invoice';
import { errorMessage, successMessage } from '@Core/Helper/message';
import setErrorMessageHookForm from '@App/helpers/setErrorMessageHookForm';
import { HandleErrorApi } from '@Core/Api/axios-config';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';

import BaseFormRepairInvoiceCreate from './components/BaseFormRepairInvoiceCreate';
import { RepairInvoiceSchema, repairInvoiceSchema } from './utils/repair-invoice-create';

const breadcrumbs = [
   {
      title: 'Phiếu Sửa Chữa',
      link: ROUTE_PATH.REPAIR_INVOICE,
   },
];
const RepairOrderCreate = () => {
   const navigate = useNavigate();
   const { user } = useAuth();
   const form = useForm<RepairInvoiceSchema>({
      resolver: yupResolver(repairInvoiceSchema),
      defaultValues: repairInvoiceSchema.getDefault(),
   });

   const { mutate: handleCreateRepairOrder, isLoading } = useMutation({
      mutationFn: async (data: RepairInvoiceSchema) => {
         const newDate = {
            personnel_id: user?._id,
            car_id: data.car.car_id,
            customer_id: data.customer.customer_id,
            kilometer: data.car.kilometer,
            describe: '',

            repairService: data.repairService.map((item) => ({
               supplies_service_id: item.repair_invoice_id,
               price: item.price,
               discount: item.discount,
               describe: '',
            })),

            repairSupplies: data.suppliesInvoices.map((item) => ({
               supplies_service_id: item.repair_invoice_id,
               describe: '',
               quantity: item.quantity,
            })),
         };

         return await repairInvoiceService.create(newDate);
      },
      onSuccess: () => {
         successMessage('Thêm mới thành công');
         return navigate(ROUTE_PATH.REPAIR_INVOICE);
      },
      onError: (err: AxiosError) => {
         const dataError = err.response?.data as HandleErrorApi;
         setErrorMessageHookForm(form.setError, dataError.message);
         return errorMessage(err);
      },
   });

   const handleSubmitForm: SubmitHandler<RepairInvoiceSchema> = (data) => handleCreateRepairOrder(data);

   return (
      <BaseBreadcrumbs arialabel="Thêm mới" breadcrumbs={breadcrumbs}>
         <Box>
            <LoadingButton variant="contained" loading={isLoading} onClick={form.handleSubmit(handleSubmitForm)}>
               Lưu
            </LoadingButton>
         </Box>
         <BaseFormRepairInvoiceCreate form={form} />
      </BaseBreadcrumbs>
   );
};

export default RepairOrderCreate;
