import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import ROUTER_PATH from '@App/configs/router-path';
import { useParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import personnelService from '@App/services/personnel.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { successMessage, errorMessage } from '@Core/Helper/message';
import { AxiosError } from 'axios';
import setErrorMessageHookForm from '@App/helpers/setErrorMessageHookForm';
import { HandleErrorApi } from '@Core/Api/axios-config';

import { ValidationFormCreate, validationFormCreate } from './utils/personnel.schema';
import BaseFormPersonnel from './components/BaseFormPersonnel';
const breadcrumbs = [
   {
      title: 'Personnel',
      link: ROUTER_PATH.ROLES,
   },
];
const PersonnelUpdate = () => {
   const { id: personnelId } = useParams();
   const form = useForm<ValidationFormCreate>({
      resolver: yupResolver(validationFormCreate),
      defaultValues: validationFormCreate.getDefault(),
   });

   useQuery(
      ['getPersonnel', personnelId],
      async () => {
         const res = await personnelService.find(personnelId!);
         return res.data;
      },
      {
         onSuccess: () => {},
      },
   );
   const { mutate: handleUpdatePersonnel, isLoading } = useMutation({
      mutationFn: async (data: ValidationFormCreate) => {
         return await personnelService.update(data, personnelId);
      },
      onSuccess: () => {
         successMessage('Cập nhật nhân viên thành công!');
      },
      onError: (err: AxiosError) => {
         const dataError = err.response?.data as HandleErrorApi;

         setErrorMessageHookForm(form.setError, dataError.message) as never;

         return errorMessage(err);
      },
   });
   const onSubmitForm: SubmitHandler<ValidationFormCreate> = (data) => handleUpdatePersonnel(data);
   return (
      <BaseBreadcrumbs arialabel="Cập nhật" breadcrumbs={breadcrumbs}>
         <BaseFormPersonnel form={form} onSubmitForm={onSubmitForm} isLoading={isLoading} />
      </BaseBreadcrumbs>
   );
};
export default PersonnelUpdate;
