import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import ROUTE_PATH from '@App/configs/router-path';
import BaseFormMaterialsCatalog from './component/BaseFormMaterialsCatalog';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { MaterialsCatalogSchema, materialsCatalogSchema } from './utils/materialsCatalog.schema';
import { useMutation, useQuery } from '@tanstack/react-query';
import materialsCatalogService from '@App/services/materialsCatalog.service';
import { errorMessage, successMessage } from '@Core/Helper/message';
import { AxiosError } from 'axios';
import HttpStatusCode from '@Core/Configs/HttpStatusCode';
import setErrorMessageHookForm from '@App/helpers/setErrorMessageHookForm';
import { HandleErrorApi } from '@Core/Api/type';
import { useParams } from 'react-router-dom';
import setValueHookForm from '@App/helpers/setValueHookForm';

const breadcrumbs = [
   {
      title: 'Danh mục sản phẩm',
      link: ROUTE_PATH.MATERIALSCATALOG,
   },
];

const MaterialsCatalogUpdate = () => {
   const { id: materialsCatalogId } = useParams();

   const form = useForm<MaterialsCatalogSchema>({
      resolver: yupResolver(materialsCatalogSchema),
      defaultValues: materialsCatalogSchema.getDefault(),
   });

   const { refetch: getMaterialsCatalog } = useQuery(
      ['getDistributorDetail', materialsCatalogId],
      async () => {
         const res = await materialsCatalogService.find(materialsCatalogId!);
         return res.data;
      },
      {
         onSuccess: (data) => {
            setValueHookForm(form.setValue, data as any);
         },
      },
   );

   const { mutate: materialsCatalogUpdate, isLoading } = useMutation({
      mutationFn: async (data: MaterialsCatalogSchema) => {
         return await materialsCatalogService.update(data);
      },
      onSuccess: () => {
         successMessage('Tạo mới nhà phân phối thành công.');
         getMaterialsCatalog();
      },
      onError: (err: AxiosError) => {
         const dataError = err.response?.data as HandleErrorApi;

         if (Number(dataError.statusCode) === Number(HttpStatusCode.BAD_REQUEST)) {
            return setErrorMessageHookForm(form.setError, dataError.message);
         }

         return errorMessage(err);
      },
   });

   const onSubmitForm: SubmitHandler<MaterialsCatalogSchema> = (data) => materialsCatalogUpdate(data);

   return (
      <BaseBreadcrumbs arialabel="Chi tiết" breadcrumbs={breadcrumbs}>
         <BaseFormMaterialsCatalog onSubmitForm={onSubmitForm} form={form} isLoading={isLoading} />
      </BaseBreadcrumbs>
   );
};

export default MaterialsCatalogUpdate;
