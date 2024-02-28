/* eslint-disable @typescript-eslint/naming-convention */
import ArrowRight from '@App/component/common/ArrowRight';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import { Box } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import repairorderService, { RepairOrdersResponse } from '@App/services/repairorder.service';
import { errorMessage, successMessage } from '@Core/Helper/message';
import { AxiosError } from 'axios';
import { HandleErrorApi } from '@Core/Api/axios-config';
import setErrorMessageHookForm from '@App/helpers/setErrorMessageHookForm';
import { useParams } from 'react-router-dom';

import { RepairInvoiceSchema, repairInvoiceSchema } from './utils/repair-invoice';
import BaseFormRepairInvoice from './components/BaseFormRepairInvoice';
import { arrowRightOption } from './utils';

const RepairInvoiceUpdate = () => {
   const form = useForm<RepairInvoiceSchema>({
      mode: 'onSubmit',
      reValidateMode: 'onSubmit',
      resolver: yupResolver(repairInvoiceSchema),
      defaultValues: repairInvoiceSchema.getDefault(),
   });

   const { id: repairOrderId } = useParams();

   const { data } = useQuery(
      ['getRepairDetail', repairOrderId],
      async () => {
         const res = await repairorderService.find(repairOrderId as string);
         return res.data as RepairOrdersResponse;
      },
      {
         onSuccess: (data) => {
            // form.setValue('customer.customer_id', data.customer)
            if (data.status === 'shipped') {
               errorMessage('Bạn không thể sửa với trạng thái lấy vật tư');
            }
            return data;
         },
      },
   );

   const { mutate: handleCreateRepairOrder, isLoading } = useMutation({
      mutationFn: async (data: RepairInvoiceSchema) => {
         const supplies = data.suppliesInvoice.map((item) => ({
            supplies_detail_id: item.supplies_detail_id,
            repair_service_id: '',
            quantity: item.quantity,
            price: item.selling_price,
            surcharge: 0,
            discount: 0,
            describe: '',
         }));

         const service = data.suppliesService.map((item) => ({
            supplies_detail_id: '',
            repair_service_id: item.repair_service_id,
            quantity: item.quantity,
            price: item.price,
            surcharge: 0,
            discount: item.discount,
            describe: '',
         }));

         const newData = {
            personnel_id: data.personnel_id,
            car_id: data.car.car_id,
            kilometer: Number(data.car.kilometer),
            describe: '',
            details: [...supplies, ...service],
         };

         return await repairorderService.update(newData);
      },
      onSuccess: () => {
         successMessage('Thêm mới nhân viên thành công');
         // navigate('/fix/repair-services');
      },
      onError: (err: AxiosError) => {
         const dataError = err.response?.data as HandleErrorApi;

         setErrorMessageHookForm(form.setError, dataError.message);

         return errorMessage(err);
      },
   });

   const onSubmitForm: SubmitHandler<RepairInvoiceSchema> = (data) => handleCreateRepairOrder(data);

   return (
      <BaseBreadcrumbs arialabel="Phiếu sửa chữa">
         <Box mb={1}>
            <ArrowRight options={arrowRightOption} check={data?.status ?? 'draft'} />
         </Box>
         <BaseFormRepairInvoice
            form={form}
            isLoading={isLoading}
            isShipped={data?.status === 'shipped'}
            onSubmitForm={onSubmitForm}
         />
      </BaseBreadcrumbs>
   );
};

export default RepairInvoiceUpdate;
