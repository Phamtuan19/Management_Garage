import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import BaseFormModulePermission from './component/BaseFormModulePermission';
import { SubmitHandler, useForm } from 'react-hook-form';
import { PermissionSchemaType, permissionSchema } from './utils/permission.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import modulePermissionService from '@App/services/modulePermission.service';
import { successMessage } from '@Core/Helper/message';
import { useParams } from 'react-router-dom';

const breadcrumbs = [
   {
      title: 'Dánh sách module',
      link: 'permissions',
   },
];

type ResponsePermissionType = {
   title: string;
   name: string;
   action: string;
   description: string;
};

const ModulePermissionUpdate = () => {
   const { id: permissionId } = useParams();

   const form = useForm<PermissionSchemaType>({
      resolver: yupResolver(permissionSchema),
      defaultValues: permissionSchema.getDefault(),
   });

   const {} = useQuery(
      ['getModulePermission', permissionId],
      async () => {
         const res = await modulePermissionService.find(permissionId as string);
         return res.data;
      },
      {
         onSuccess: (data) => {
            form.reset(data);
         },
      },
   );

   const { mutate: onSubmitForm } = useMutation({
      // mutationKey: 'createModulePermission',
      mutationFn: async (data: ResponsePermissionType) => {
         return await modulePermissionService.update(data, permissionId);
      },
      onSuccess: (data: any) => {
         form.reset();
         successMessage(data?.message);
      },
      onError: (error) => {
         console.log(error);
      },
   });

   const onSubmit: SubmitHandler<PermissionSchemaType> = (data: PermissionSchemaType) => {
      const newData = {
         ...data,
         action: data.action.toString(),
      };
      onSubmitForm(newData);
   };

   return (
      <BaseBreadcrumbs arialabel="Chỉnh sửa nhóm quyền" breadcrumbs={breadcrumbs}>
         <BaseFormModulePermission form={form} onSubmit={onSubmit} />
      </BaseBreadcrumbs>
   );
};

export default ModulePermissionUpdate;
