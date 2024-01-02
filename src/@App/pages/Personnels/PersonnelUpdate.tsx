import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import BaseFormPersonnel from './components/BaseFormPersonnel';
import ROUTER_PATH from '@App/configs/router-path';
import { ValidationFormCreate, validationFormCreate } from './utils/personnel.schema';
import { useParams } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import personnelService from '@App/services/personnel.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { successMessage, errorMessage } from '@Core/Helper/message';
import { HandleErrorApi } from '@Core/Api/type';
import { AxiosError } from 'axios';
import HttpStatusCode from '@Core/Configs/HttpStatusCode';
import setErrorMessageHookForm from '@App/helpers/setErrorMessageHookForm';
const breadcrumbs = [
   {
      title: 'Personnel',
      link: ROUTER_PATH.PERMISSIONS,
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

         if (Number(dataError.statusCode) === Number(HttpStatusCode.BAD_REQUEST)) {
            return setErrorMessageHookForm(form.setError, dataError.message) as never;
         }

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
