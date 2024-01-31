/* eslint-disable @typescript-eslint/no-misused-promises */
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

import { MaterialsCatalogSchema, materialsCatalogSchema } from './utils/materialsCatalog.schema';
import BaseFormSupplies from './component/BaseFormSupplies';

const breadcrumbs = [
   {
      title: 'Danh mục sản phẩm',
      link: ROUTE_PATH.SUPPLIES,
   },
];

const SuppliesUpdate = () => {
   const { id: materialsCatalogId } = useParams();

   const form = useForm<MaterialsCatalogSchema>({
      resolver: yupResolver(materialsCatalogSchema),
      defaultValues: materialsCatalogSchema.getDefault(),
   });

   const { refetch: getMaterialsCatalog } = useQuery(
      ['getDistributorDetail', materialsCatalogId],
      async () => {
         const res = await suppliesService.find(materialsCatalogId!);
         return res.data;
      },
      {
         onSuccess: (data: Supplies) => {
            const { details, ...res } = data;
            setValueHookForm(form.setValue, res);
            form.setValue('details', details || []);
         },
      },
   );

   const { mutate: SuppliesUpdate, isLoading } = useMutation({
      mutationFn: async (data: MaterialsCatalogSchema) => {
         return await suppliesService.update(data);
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

   const onSubmitForm: SubmitHandler<MaterialsCatalogSchema> = (data) => SuppliesUpdate(data);

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
