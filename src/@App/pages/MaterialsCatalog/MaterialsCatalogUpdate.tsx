import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import ROUTE_PATH from '@App/configs/router-path';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import materialsCatalogService from '@App/services/materialsCatalog.service';
import { errorMessage, successMessage } from '@Core/Helper/message';
import { AxiosError } from 'axios';
import HttpStatusCode from '@Core/Configs/HttpStatusCode';
import setErrorMessageHookForm from '@App/helpers/setErrorMessageHookForm';
import { useParams } from 'react-router-dom';
import setValueHookForm from '@App/helpers/setValueHookForm';
import { HandleErrorApi } from '@Core/Api/axios-config';
import { MaterialsCatalogSchema, materialsCatalogSchema } from './utils/materialsCatalogSchema';
import BaseFormMaterialCatalog from './BaseFormMaterialCatalog';

const breadcrumbs = [
   {
      title: 'Danh mục sản phẩm',
      link: ROUTE_PATH.MATERIALS_CATALOGS,
   },
];

const MaterialsCatalogUpdate = () => {
   const { id: materialsCatalogId } = useParams();
 

   const form = useForm<MaterialsCatalogSchema>({
      resolver: yupResolver(materialsCatalogSchema),
      defaultValues: materialsCatalogSchema.getDefault(),
   });

   const { refetch: getMaterialsCatalog } = useQuery(
      ['getMaterialCatalog', materialsCatalogId],
      async () => {
         const res = await materialsCatalogService.find(materialsCatalogId!);
         return res.data;
      },

      {
         onSuccess: (data) => {
            setValueHookForm(form.setValue, data as never);
         },
      },
   );

   const { mutate: MaterialsCatalog , isLoading } = useMutation({
      mutationFn: async (data: MaterialsCatalogSchema) => {
         return await materialsCatalogService.update(data, materialsCatalogId);
      },
      onSuccess: async () => {
         successMessage('Cập nhật thành công !');
         await getMaterialsCatalog();
      },
      onError: (err: AxiosError) => {
         const dataError = err.response?.data as HandleErrorApi;

         if (Number(dataError.statusCode) === Number(HttpStatusCode.BAD_REQUEST)) {
            return setErrorMessageHookForm(form.setError, dataError.message);
         }

         return errorMessage(err);
      },
   });

   const onSubmitForm: SubmitHandler<MaterialsCatalogSchema> = (data) => MaterialsCatalog(data);

   return (
      <BaseBreadcrumbs arialabel="Cập nhật thông tin" breadcrumbs={breadcrumbs}>
         <BaseFormMaterialCatalog onSubmitForm={onSubmitForm} form={form} isLoading={isLoading} />
      </BaseBreadcrumbs>
   );
};

export default MaterialsCatalogUpdate;