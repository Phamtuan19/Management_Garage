import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import roleService, { RoleResponseData } from '@App/services/role.service';
import { errorMessage, successMessage } from '@Core/Helper/message';
import { AxiosError } from 'axios';
import { HandleErrorApi } from '@Core/Api/axios-config';
import setErrorMessageHookForm from '@App/helpers/setErrorMessageHookForm';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import ROUTE_PATH from '@App/configs/router-path';
import { useParams } from 'react-router-dom';

import { ValidationFormCreate, validationFormCreate } from './utils/role.schema';
import BaseFormRole from './component/BaseFormRole';

const breadcrumbs = [
   {
      title: 'Danh sách vai trò',
      link: ROUTE_PATH.ROLES,
   },
];

const RoleUpdate = () => {
   const { id: roleId } = useParams();
   const form = useForm<ValidationFormCreate>({
      resolver: yupResolver(validationFormCreate),
      defaultValues: validationFormCreate.getDefault(),
   });

   const { refetch: handleGetRoleById } = useQuery(
      ['getRoleById', roleId],
      async () => {
         const res = await roleService.find(roleId || '');
         return res.data;
      },
      {
         onSuccess(data: RoleResponseData) {
            form.reset({
               name: data.name,
               permission: data.permission as never,
               describe: data.describe,
            });
         },
      },
   );

   const { mutate: handleUpdate, isLoading } = useMutation({
      mutationFn: async (data: ValidationFormCreate) => {
         return await roleService.update(data, roleId, 'patch');
      },
      onSuccess: async () => {
         successMessage('Cập nhật thành công');
         await handleGetRoleById();
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
         return handleUpdate(data);
      } else {
         errorMessage('Chi tiết vai trò không được để trống.');
      }
   };

   return (
      <BaseBreadcrumbs
         breadcrumbs={breadcrumbs}
         arialabel="Chỉnh sửa"
         sx={({ base }) => ({ bgcolor: base.background.default, border: 'none', p: 0 })}
      >
         <BaseFormRole form={form} onSubmitForm={onSubmitForm} isLoading={isLoading} />
      </BaseBreadcrumbs>
   );
};

export default RoleUpdate;
