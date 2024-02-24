import { yupResolver } from '@hookform/resolvers/yup';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import setErrorMessageHookForm from '@App/helpers/setErrorMessageHookForm';
import { AxiosError } from 'axios';
import { HandleErrorApi } from '@Core/Api/axios-config';
import { errorMessage, successMessage } from '@Core/Helper/message';
import repairorderService from '@App/services/repairorder.service';
import ArrowRight from '@App/component/common/ArrowRight';

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
   const handleOnSubmitForm: SubmitHandler<RepairorderSchema> = (data) => {
      handleCreateRepairOrder(data);
   };
   return (
      <BaseBreadcrumbs arialabel="Phiếu sửa chữa">
         <ArrowRight
            options={[
               {
                  title: 'Nháp',
                  name: 'draft',
               },
               {
                  title: 'Chờ phê duyệt',
                  name: 'waiting_approval',
               },
               {
                  title: 'Đã duyệt',
                  name: 'approved',
               },
               {
                  title: 'Đang tuyển',
                  name: 'recruiting',
               },
               {
                  title: 'Hoàn thành',
                  name: 'done',
               },
               {
                  title: 'Từ chối',
                  name: 'refused',
               },
            ]}
            check="draft"
         />
         <BaseFormRepairOrder onSubmitForm={handleOnSubmitForm} form={form} isLoading={isLoading} />
      </BaseBreadcrumbs>
   );
};
export default RepairOrderCreate;
