import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { errorMessage, successMessage } from '@Core/Helper/message';
import { AxiosError } from 'axios';
import setErrorMessageHookForm from '@App/helpers/setErrorMessageHookForm';
import personnelService from '@App/services/personnel.service';
import { HandleErrorApi } from '@Core/Api/axios-config';
import ROUTE_PATH from '@App/configs/router-path';

import { ValidationFormCreate, validationFormCreate } from './utils/personnel.schema';
import BaseFormPersonnel from './components/BaseFormPersonnel';

const breadcrumbs = [
   {
      title: 'Nhân viên',
      link: ROUTE_PATH.PERSONNELS,
   },
];

const PersonnelCreate = () => {
   const form = useForm<ValidationFormCreate>({
      resolver: yupResolver(validationFormCreate),
      defaultValues: validationFormCreate.getDefault(),
   });
   const { mutate: handleCreatePersonnel, isLoading } = useMutation({
      mutationFn: async (data: ValidationFormCreate) => {
         return await personnelService.create(data);
      },
      onSuccess: () => {
         successMessage('Thêm mới nhân viên thành công');
      },
      onError: (err: AxiosError) => {
         const dataError = err.response?.data as HandleErrorApi;

         setErrorMessageHookForm(form.setError, dataError.message);

         return errorMessage(err);
      },
   });

   const onSubmitForm: SubmitHandler<ValidationFormCreate> = (data) => handleCreatePersonnel(data);

   return (
      <BaseBreadcrumbs arialabel="Thêm mới" breadcrumbs={breadcrumbs}>
         <BaseFormPersonnel form={form} onSubmitForm={onSubmitForm} isLoading={isLoading} />
      </BaseBreadcrumbs>
   );
};

export default PersonnelCreate;
