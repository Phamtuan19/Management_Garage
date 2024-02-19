/* eslint-disable @typescript-eslint/no-misused-promises */
import { yupResolver } from '@hookform/resolvers/yup';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import setErrorMessageHookForm from '@App/helpers/setErrorMessageHookForm';
import { AxiosError } from 'axios';
import { HandleErrorApi } from '@Core/Api/axios-config';
import { errorMessage, successMessage } from '@Core/Helper/message';
import repairorderService from '@App/services/repairorder.service';

import BaseFormRepairOrder from './component/BaseFormRepairorder';
import { RepairorderSchema, repairorderSchema } from './utils/repairorderSchema';

const RepairOrderCreate = () => {
   const form = useForm<RepairorderSchema>({
      resolver: yupResolver(repairorderSchema),
      defaultValues: repairorderSchema.getDefault(),
   });
   const { mutate: handleCreateRepairOrder, isLoading } = useMutation({
      mutationFn: async (data: RepairorderSchema) => {
         return await repairorderService.create(data);
      },
      onSuccess: () => {
         successMessage('Thêm mới thành công');
         form.reset();
      },
      onError: (err: AxiosError) => {
         const dataError = err.response?.data as HandleErrorApi;

         setErrorMessageHookForm(form.setError, dataError.message);

         return errorMessage(err);
      },
   });
   const onSubmitForm: SubmitHandler<RepairorderSchema> = (data) => handleCreateRepairOrder(data);
   return (
      <BaseBreadcrumbs arialabel="Phiếu sửa chữa">
         <BaseFormRepairOrder onSubmitForm={onSubmitForm} form={form} isLoading={isLoading} />
      </BaseBreadcrumbs>
   );
};
export default RepairOrderCreate;
