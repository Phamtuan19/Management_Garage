/* eslint-disable @typescript-eslint/no-unsafe-return */
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import BaseFormPersonnel from './components/BaseFormPersonnel';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ValidationFormCreate, validationFormCreate } from './utils/personnel.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { errorMessage, successMessage } from '@Core/Helper/message';
import { AxiosError } from 'axios';
import { HandleErrorApi } from '@Core/Api/type';
import setErrorMessageHookForm from '@App/helpers/setErrorMessageHookForm';
import personnelService from '@App/services/personnel.service';
import HttpStatusCode from '@Core/Configs/HttpStatusCode';

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

         if (Number(dataError.statusCode) === Number(HttpStatusCode.BAD_REQUEST)) {
            return setErrorMessageHookForm(form.setError, dataError.message);
         }

         return errorMessage(err);
      },
   });

   const onSubmitForm: SubmitHandler<ValidationFormCreate> = (data) => handleCreatePersonnel(data);

   return (
      <BaseBreadcrumbs arialabel="Personnels">
         <BaseFormPersonnel form={form} onSubmitForm={onSubmitForm} isLoading={isLoading} />
      </BaseBreadcrumbs>
   );
};

export default PersonnelCreate;
