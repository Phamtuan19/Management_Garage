/* eslint-disable @typescript-eslint/no-misused-promises */
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { errorMessage, successMessage } from '@Core/Helper/message';
import { AxiosError } from 'axios';
import setErrorMessageHookForm from '@App/helpers/setErrorMessageHookForm';
import { HandleErrorApi } from '@Core/Api/axios-config';
import ROUTE_PATH from '@App/configs/router-path';
import repairServiceService from '@App/services/repairService.service';
import { useNavigate } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useRef } from 'react';

import { RepairServiceSchema, validationFormCreate } from './utils/repairService.schema';
import BaseFormRepairService from './components/BaseFormRepairService';
import ModalCreateCategories, { ModalCreateCategoriesRef } from './components/ModalCreateCategories';

const breadcrumbs = [
   {
      title: 'Dịch vụ sửa chữa',
      link: ROUTE_PATH.REPAIR_SERVICES,
   },
];

const RepairServiceCreate = () => {
   const navigate = useNavigate();
   const form = useForm<RepairServiceSchema>({
      resolver: yupResolver(validationFormCreate),
      defaultValues: validationFormCreate.getDefault(),
   });

   const refModalCate = useRef<ModalCreateCategoriesRef>(null);

   const { mutate: handleCreateRepairService, isLoading } = useMutation({
      mutationFn: async (data: RepairServiceSchema) => {
         return await repairServiceService.create(data);
      },
      onSuccess: () => {
         successMessage('Thêm mới thành công');
         navigate('/fix/repair-services');
      },
      onError: (err: AxiosError) => {
         const dataError = err.response?.data as HandleErrorApi;

         setErrorMessageHookForm(form.setError, dataError.message);

         return errorMessage(err);
      },
   });

   const onSubmitForm: SubmitHandler<RepairServiceSchema> = (data) => handleCreateRepairService(data);

   return (
      <BaseBreadcrumbs arialabel="Thêm mới" breadcrumbs={breadcrumbs}>
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

export default RepairServiceCreate;
