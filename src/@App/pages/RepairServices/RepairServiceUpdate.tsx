/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-misused-promises */
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import ROUTER_PATH from '@App/configs/router-path';
import { useNavigate, useParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { successMessage, errorMessage } from '@Core/Helper/message';
import { AxiosError } from 'axios';
import setErrorMessageHookForm from '@App/helpers/setErrorMessageHookForm';
import { HandleErrorApi } from '@Core/Api/axios-config';
import repairServiceService from '@App/services/repairService.service';
import setValueHookForm from '@App/helpers/setValueHookForm';
import { Box, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useRef } from 'react';

import { RepairServiceSchema, validationFormCreate } from './utils/repairService.schema';
import BaseFormRepairService from './components/BaseFormRepairService';
import ModalCreateCategories, { ModalCreateCategoriesRef } from './components/ModalCreateCategories';

const breadcrumbs = [
   {
      title: 'Dịch vụ sửa chữa',
      link: ROUTER_PATH.REPAIR_SERVICES,
   },
];
const RepairServiceUpdate = () => {
   const navigate = useNavigate();
   const { id: repairServiceId } = useParams();
   const form = useForm<RepairServiceSchema>({
      resolver: yupResolver(validationFormCreate),
      defaultValues: validationFormCreate.getDefault(),
   });

   const refModalCate = useRef<ModalCreateCategoriesRef>(null);

   const { data: repairService } = useQuery(
      ['getRepairService', repairServiceId],
      async () => {
         const res = await repairServiceService.find(repairServiceId!);
         return res.data;
      },
      {
         onSuccess: (data) => {
            setValueHookForm(form.setValue, data as never);
            form.setValue('repair_service_category_id', data.repair_service_category_id._id as string);
            return data;
         },
      },
   );
   const { mutate: handleUpdateRepairService, isLoading } = useMutation({
      mutationFn: async (data: RepairServiceSchema) => {
         return await repairServiceService.update(data, repairServiceId, 'patch');
      },
      onSuccess: () => {
         successMessage('Cập nhật thành công');
         navigate('/fix/repair-services');
      },
      onError: (err: AxiosError) => {
         const dataError = err.response?.data as HandleErrorApi;

         setErrorMessageHookForm(form.setError, dataError.message) as never;

         return errorMessage(err);
      },
   });
   const onSubmitForm: SubmitHandler<RepairServiceSchema> = (data) => handleUpdateRepairService(data);
   return (
      <BaseBreadcrumbs arialabel={repairService?.name as string} breadcrumbs={breadcrumbs}>
         <Box display="flex" justifyContent="space-between">
            <LoadingButton
               type="submit"
               variant="contained"
               loading={isLoading}
               onClick={form.handleSubmit(onSubmitForm)}
            >
               Lưu
            </LoadingButton>
            <Button variant="contained" color="warning" onClick={() => refModalCate.current?.handleOpen()}>
               Thêm danh mục
            </Button>
         </Box>
         <BaseFormRepairService form={form} onSubmitForm={onSubmitForm} />
         <ModalCreateCategories ref={refModalCate} />
      </BaseBreadcrumbs>
   );
};
export default RepairServiceUpdate;
