/* eslint-disable @typescript-eslint/naming-convention */
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import repairorderService from '@App/services/repairorder.service';
import { errorMessage, successMessage } from '@Core/Helper/message';
import { AxiosError } from 'axios';
import { HandleErrorApi } from '@Core/Api/axios-config';
import setErrorMessageHookForm from '@App/helpers/setErrorMessageHookForm';
import ArrowRight from '@App/component/common/ArrowRight';
import { Box } from '@mui/material';
import { useEffect } from 'react';

import { arrowRightOption } from './utils';
import { RepairInvoiceSchema, repairInvoiceSchema } from './utils/repair-invoice';
import BaseFormRepairInvoice from './component/BaseFormRepairInvoice';

const RepairInvoiceCreate = () => {
   const form = useForm<RepairInvoiceSchema>({
      mode: 'onSubmit',
      reValidateMode: 'onSubmit',
      resolver: yupResolver(repairInvoiceSchema),
      defaultValues: repairInvoiceSchema.getDefault(),
   });

   useEffect(() => {
      if (Object.keys(form.formState.errors).length > 0) {
         return errorMessage('Vui lòng điền đẩy đủ thông tin.');
      }
   }, [form.formState.errors]);

   const { mutate: handleCreateRepairOrder, isLoading } = useMutation({
      mutationFn: async (data: RepairInvoiceSchema) => {
         const supplies = data.suppliesInvoice.map((item) => ({
            supplies_detail_id: item.supplies_detail_id,
            repair_service_id: '',
            quantity: item.quantity,
            price: item.selling_price,
            surcharge: 0,
            discount: 0,
            supplies_invoices_code: item.supplies_invoices_code,
            supplies_invoices_id: item.supplies_invoices_id,
            supplies_detail_code: item.supplies_detail_code,
            describe: '',
         }));

         const service = data.suppliesService.map((item) => ({
            supplies_detail_id: '',
            repair_service_id: item.repair_service_id,
            quantity: item.quantity,
            price: item.price,
            surcharge: 0,
            discount: item.discount,
            repair_service_code: item.repair_service_code,
            describe: '',
         }));

         const newData = {
            personnel_id: data.personnel_id,
            car_id: data.car.car_id,
            kilometer: Number(data.car.kilometer),
            describe: '',
            details: [...supplies, ...service],
         };

         return await repairorderService.create(newData);
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
            <ArrowRight options={arrowRightOption} check="create" />
         </Box>
         <BaseFormRepairInvoice form={form} isLoading={isLoading} onSubmitForm={onSubmitForm} />
      </BaseBreadcrumbs>
   );
};

export default RepairInvoiceCreate;
