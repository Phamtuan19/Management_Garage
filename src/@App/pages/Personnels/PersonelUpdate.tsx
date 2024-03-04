import ROUTE_PATH from '@App/configs/router-path';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { errorMessage, successMessage } from '@Core/Helper/message';
import { AxiosError } from 'axios';
import HttpStatusCode from '@Core/Configs/HttpStatusCode';
import setErrorMessageHookForm from '@App/helpers/setErrorMessageHookForm';
import { useParams } from 'react-router-dom';
import setValueHookForm from '@App/helpers/setValueHookForm';
import { HandleErrorApi } from '@Core/Api/axios-config';
import { useNavigate } from 'react-router-dom';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import personnelService from '@App/services/personnel.service';

import { ValidationFormCreate, validationFormCreate } from './utils/personnel.schema';
import BaseFormPersonnel from './components/BaseFormPersonnel';

const breadcrumbs = [
   {
      title: 'Nhân viên',
      link: ROUTE_PATH.PERSONNELS,
   },
];
const PersonelUpdate = () => {
   const { id: personnelId } = useParams();
   const navigate = useNavigate();
   const form = useForm<ValidationFormCreate>({
      resolver: yupResolver(validationFormCreate),
      defaultValues: validationFormCreate.getDefault(),
   });

   const { refetch: getPersonnels } = useQuery(
      ['getPersonnels', personnelId],
      async () => {
         const res = await personnelService.find(personnelId!);
         return res.data;
      },
      {
         onSuccess: (data) => {
            setValueHookForm(form.setValue, data as never);
         },
      },
   );

   const { mutate: Personnel, isLoading } = useMutation({
      mutationFn: async (data: ValidationFormCreate) => {
         return await personnelService.update(data, personnelId, 'patch');
      },
      onSuccess: async () => {
         successMessage('Cập nhật thành công !');
         await getPersonnels();
         navigate('/user/profile');
      },
      onError: (err: AxiosError) => {
         const dataError = err.response?.data as HandleErrorApi;

         if (Number(dataError.statusCode) === Number(HttpStatusCode.BAD_REQUEST)) {
            return setErrorMessageHookForm(form.setError, dataError.message);
         }
         return errorMessage(err);
      },
   });

   const onSubmitForm: SubmitHandler<ValidationFormCreate> = (data) => Personnel(data);

   return (
      <BaseBreadcrumbs arialabel="Cập nhật thông tin" breadcrumbs={breadcrumbs}>
         <BaseFormPersonnel onSubmitForm={onSubmitForm} form={form} isLoading={isLoading} isUpdate />
      </BaseBreadcrumbs>
   );
};

export default PersonelUpdate;

// const PersonelUpdate = () => {
//    return <div>PersonelUpdate</div>;
// };

// export default PersonelUpdate;
