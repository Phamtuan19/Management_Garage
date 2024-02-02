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
import { useParams } from 'react-router-dom';
import setValueHookForm from '@App/helpers/setValueHookForm';
import { HandleErrorApi } from '@Core/Api/axios-config';
import suppliesService, { Supplies } from '@App/services/supplies.service';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';

import BaseFormSupplies from './component/BaseFormSupplies';
import { SuppliesSchema, suppliesSchema } from './utils/supplies.schema';

const breadcrumbs = [
   {
      title: 'Danh mục sản phẩm',
      link: ROUTE_PATH.SUPPLIES,
   },
];

const SuppliesUpdate = () => {
   const { id: materialsCatalogId } = useParams();

   const form = useForm<SuppliesSchema>({
      resolver: yupResolver(suppliesSchema),
      defaultValues: suppliesSchema.getDefault(),
   });

   const { refetch: getMaterialsCatalog } = useQuery(
      ['getDistributorDetail', materialsCatalogId],
      async () => {
         const res = await suppliesService.find(materialsCatalogId!);
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
         return await suppliesService.update({ ...data, discount: Number(data.discount) });
      },
      onSuccess: async () => {
         successMessage('Tạo mới nhà phân phối thành công.');
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

   const onSubmitForm: SubmitHandler<SuppliesSchema> = (data) => SuppliesUpdate(data);

   return (
      <BaseBreadcrumbs
         arialabel="Chi tiết"
         breadcrumbs={breadcrumbs}
         sx={({ base }) => ({ bgcolor: base.background.default, border: 'none', p: 0 })}
      >
         <LoadingButton type="submit" variant="contained" loading={isLoading} onClick={form.handleSubmit(onSubmitForm)}>
            Cập nhật
         </LoadingButton>
         <Box
            sx={({ base }) => ({
               marginTop: '12px',
               padding: '12px',
               borderRadius: '5px',
               backgroundColor: base.background.white as string,
            })}
         >
            <BaseFormSupplies form={form} />
         </Box>
      </BaseBreadcrumbs>
   );
};

export default SuppliesUpdate;
