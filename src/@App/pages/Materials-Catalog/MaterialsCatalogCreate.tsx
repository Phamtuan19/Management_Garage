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

import { MaterialsCatalogSchema, materialsCatalogSchema } from './utils/materialsCatalog.schema';
import BaseFormSupplies from './component/BaseFormSupplies';

const breadcrumbs = [
   {
      title: 'Danh mục sản phẩm',
      link: ROUTE_PATH.SUPPLIES,
   },
];

const SuppliesCreate = () => {
   const form = useForm<MaterialsCatalogSchema>({
      resolver: yupResolver(materialsCatalogSchema),
      defaultValues: materialsCatalogSchema.getDefault(),
   });

   const { mutate: SuppliesCreate, isLoading } = useMutation({
      mutationFn: async (data: MaterialsCatalogSchema) => {
         return await materialsCatalogService.create(data);
      },
      onSuccess: () => {
         successMessage('Tạo mới nhà phân phối thành công.');
         form.reset();
      },
      onError: (err: AxiosError) => {
         const dataError = err.response?.data as HandleErrorApi;

         if (Number(dataError.statusCode) === Number(HttpStatusCode.BAD_REQUEST)) {
            return setErrorMessageHookForm(form.setError, dataError.message);
         }

         return errorMessage(err);
      },
   });

   const onSubmitForm: SubmitHandler<MaterialsCatalogSchema> = (data) => SuppliesCreate(data);

   return (
      <BaseBreadcrumbs arialabel="Thêm mới" breadcrumbs={breadcrumbs}>
         <BaseFormSupplies onSubmitForm={onSubmitForm} form={form} isLoading={isLoading} />
      </BaseBreadcrumbs>
   );
};

export default SuppliesCreate;
