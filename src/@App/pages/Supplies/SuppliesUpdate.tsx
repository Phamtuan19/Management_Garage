/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */

import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import ROUTE_PATH from '@App/configs/router-path';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation, useQuery } from '@tanstack/react-query';
import { errorMessage, successMessage } from '@Core/Helper/message';
import { AxiosError } from 'axios';
import HttpStatusCode from '@Core/Configs/HttpStatusCode';
import setErrorMessageHookForm from '@App/helpers/setErrorMessageHookForm';
import { useNavigate, useParams } from 'react-router-dom';
import setValueHookForm from '@App/helpers/setValueHookForm';
import { HandleErrorApi } from '@Core/Api/axios-config';
import suppliesService, { Supplies } from '@App/services/supplies.service';
import { LoadingButton } from '@mui/lab';
import PageContent from '@App/component/customs/PageContent';

import BaseFormSupplies from './component/BaseFormSupplies';
import { SuppliesSchema, suppliesSchema } from './utils/supplies.schema';

const breadcrumbs = [
   {
      title: 'Danh mục sản phẩm',
      link: ROUTE_PATH.SUPPLIES,
   },
];

const SuppliesUpdate = () => {
   const { id: suppliesId } = useParams();
   const navigate = useNavigate();

   const form = useForm<SuppliesSchema>({
      resolver: yupResolver(suppliesSchema),
      defaultValues: suppliesSchema.getDefault(),
   });

   const {
      data: supplies,
      isLoading: isLoadingGetSupplies,
      refetch: getMaterialsCatalog,
   } = useQuery(
      ['getDistributorDetail', suppliesId],
      async () => {
         const res = await suppliesService.find(suppliesId!);
         return res.data;
      },
      {
         onSuccess: (data: Supplies) => {
            const { details, materials_catalog_id, discount, ...res } = data;
            setValueHookForm(form.setValue, res);
            form.setValue('details', details || []);
            form.setValue('materials_catalog_id', materials_catalog_id._id);
            form.setValue('discount', String(discount));
         },
      },
   );

   const { mutate: SuppliesUpdate, isLoading } = useMutation({
      mutationFn: async (data: SuppliesSchema) => {
         const { details, ...resData } = data;

         return await suppliesService.update(
            {
               ...resData,
               discount: Number(resData.discount),
               details: details?.map((item) => ({ ...item, imported_price: Number(item.imported_price) })),
            },
            suppliesId,
         );
      },
      onSuccess: async () => {
         successMessage('Cập nhật thành công.');
         await getMaterialsCatalog();
         return navigate(ROUTE_PATH.SUPPLIES);
      },
      onError: (err: AxiosError) => {
         const dataError = err.response?.data as HandleErrorApi;

         if (Number(dataError.statusCode) === Number(HttpStatusCode.BAD_REQUEST)) {
            return setErrorMessageHookForm(form.setError, dataError.message);
         }

         return errorMessage(err);
      },
   });

   const onSubmitForm: SubmitHandler<SuppliesSchema> = (data) => SuppliesUpdate(data);

   return (
      <BaseBreadcrumbs
         arialabel={supplies?.name ?? ''}
         breadcrumbs={breadcrumbs}
         isCheck
         data={supplies}
         isLoading={isLoadingGetSupplies}
      >
         <LoadingButton type="submit" variant="contained" loading={isLoading} onClick={form.handleSubmit(onSubmitForm)}>
            Cập nhật
         </LoadingButton>
         <PageContent>
            <BaseFormSupplies form={form} />
         </PageContent>
      </BaseBreadcrumbs>
   );
};

export default SuppliesUpdate;
