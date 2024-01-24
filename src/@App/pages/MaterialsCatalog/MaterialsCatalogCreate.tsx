import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import ROUTE_PATH from '@App/configs/router-path';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import materialsCatalogService from '@App/services/materialsCatalog.service';
import { errorMessage, successMessage } from '@Core/Helper/message';
import { AxiosError } from 'axios';
import HttpStatusCode from '@Core/Configs/HttpStatusCode';
import setErrorMessageHookForm from '@App/helpers/setErrorMessageHookForm';
import { HandleErrorApi } from '@Core/Api/axios-config';
import { useNavigate } from 'react-router-dom';

import { MaterialsCatalogSchema, materialsCatalogSchema } from './utils/materialsCatalogSchema';
import BaseFormMaterialCatalog from './components/BaseFormMaterialCatalog';
const breadcrumbs = [
   {
      title: 'Danh mục vật tư',
      link: ROUTE_PATH.MATERIALS_CATALOGS,
   },
];

const MaterialsCatalogCreate = () => {
   const form = useForm<MaterialsCatalogSchema>({
      resolver: yupResolver(materialsCatalogSchema),
      defaultValues: materialsCatalogSchema.getDefault(),
   });
   const navigate = useNavigate();
   const { mutate: MaterialsCatalogCreate, isLoading } = useMutation({
      mutationFn: async (data: MaterialsCatalogSchema) => {
         return await materialsCatalogService.create(data);
      },
      onSuccess: () => {
         successMessage('Tạo mới danh mục thành công.');
         form.reset();
         navigate('/materials-catalogs');
      },
      onError: (err: AxiosError) => {
         const dataError = err.response?.data as HandleErrorApi;

         if (Number(dataError.statusCode) === Number(HttpStatusCode.BAD_REQUEST)) {
            return setErrorMessageHookForm(form.setError, dataError.message);
         }

         return errorMessage(err);
      },
   });

   const onSubmitForm: SubmitHandler<MaterialsCatalogSchema> = (data) => MaterialsCatalogCreate(data);

   return (
      <BaseBreadcrumbs arialabel="Thêm mới" breadcrumbs={breadcrumbs}>
         <BaseFormMaterialCatalog onSubmitForm={onSubmitForm} form={form} isLoading={isLoading} />
      </BaseBreadcrumbs>
   );
};

export default MaterialsCatalogCreate;
