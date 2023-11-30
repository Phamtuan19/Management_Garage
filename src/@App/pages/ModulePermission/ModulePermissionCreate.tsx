import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import BaseFormModulePermission from './component/BaseFormModulePermission';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { PermissionSchemaType, permissionSchema } from './utils/permission.schema';
import { useMutation } from '@tanstack/react-query';
import modulePermissionService from '@App/services/modulePermission.service';
import { successMessage } from '@Core/Helper/message';

const breadcrumbs = [
   {
      title: 'Dánh sách module',
      link: 'permissions',
   },
];

const ModulePermissionCreate = () => {
   const form = useForm<PermissionSchemaType>({
      resolver: yupResolver(permissionSchema),
      defaultValues: permissionSchema.getDefault(),
   });

   const { mutate: onSubmitForm } = useMutation({
      // mutationKey: 'createModulePermission',
      mutationFn: async (data: PermissionSchemaType) => {
         return await modulePermissionService.create(data);
      },
      onSuccess: (data: any) => {
         form.reset();
         successMessage(data?.message);
      },
      onError: (error) => {
         console.log(error);
      },
   });

   const onSubmit: SubmitHandler<PermissionSchemaType> = (data: PermissionSchemaType) => onSubmitForm(data);

   return (
      <BaseBreadcrumbs arialabel="Thêm mới nhóm quyền" breadcrumbs={breadcrumbs}>
         <BaseFormModulePermission form={form} onSubmit={onSubmit} />
      </BaseBreadcrumbs>
   );
};

export default ModulePermissionCreate;
