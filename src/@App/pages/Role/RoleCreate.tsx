import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import setErrorMessageHookForm from '@App/helpers/setErrorMessageHookForm';
import { AxiosError } from 'axios';
import { HandleErrorApi } from '@Core/Api/axios-config';
import { errorMessage, successMessage } from '@Core/Helper/message';
import roleService from '@App/services/role.service';
import { yupResolver } from '@hookform/resolvers/yup';

import BaseFormRole from './component/BaseFormRole';
import { ValidationFormCreate, validationFormCreate } from './utils/role.schema';

const breadcrumbs = [
   {
      title: 'Quyền Truy cập',
      link: '',
   },
];

const RoleCreate = () => {
   const form = useForm<ValidationFormCreate>({
      resolver: yupResolver(validationFormCreate),
      defaultValues: validationFormCreate.getDefault(),
   });

   const { mutate: handleCreate, isLoading } = useMutation({
      mutationFn: async (data: ValidationFormCreate) => {
         return await roleService.create(data);
      },
      onSuccess: () => {
         successMessage('Thêm mới nhân viên thành công');
         form.reset();
      },
      onError: (err: AxiosError) => {
         const dataError = err.response?.data as HandleErrorApi;

         setErrorMessageHookForm(form.setError, dataError.message);

         return errorMessage(err);
      },
   });

   const onSubmitForm: SubmitHandler<ValidationFormCreate> = (data) => {
      const isCheck =
         typeof data.permission === 'object' && data.permission !== null
            ? Object.values(data.permission).some((permission) =>
                 Array.isArray(permission) ? permission.length > 0 : permission === '*',
              )
            : false;

      if (isCheck) {
         return handleCreate(data);
      } else {
         errorMessage('Chi tiết vai trò không được để trống.');
      }
   };

   return (
      <BaseBreadcrumbs
         breadcrumbs={breadcrumbs}
         arialabel="Thêm mới"
         sx={({ base }) => ({ bgcolor: base.background.default, border: 'none', p: 0 })}
      >
         <BaseFormRole form={form} onSubmitForm={onSubmitForm} isLoading={isLoading} />
      </BaseBreadcrumbs>
   );
};

export default RoleCreate;
