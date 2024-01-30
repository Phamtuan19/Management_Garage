/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-misused-promises */
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import ROUTE_PATH from '@App/configs/router-path';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { errorMessage, successMessage } from '@Core/Helper/message';
import { AxiosError } from 'axios';
import HttpStatusCode from '@Core/Configs/HttpStatusCode';
import setErrorMessageHookForm from '@App/helpers/setErrorMessageHookForm';
import { HandleErrorApi } from '@Core/Api/axios-config';
import { LoadingButton } from '@mui/lab';
import { Box } from '@mui/material';
import suppliesService from '@App/services/supplies.service';

import { MaterialsCatalogSchema, materialsCatalogSchema } from './utils/materialsCatalog.schema';
import BaseFormSupplies from './component/BaseFormSupplies';

const breadcrumbs = [
   {
      title: 'Vật tư',
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
         return await suppliesService.create({ ...data, discount: Number(data.discount) });
      },
      onSuccess: () => {
         successMessage('Tạo mới nhà thành công.');
         form.reset({ details: [], describe: '', name: '', materials_catalog_id: '', unit: '', discount: '' });
      },
      onError: (err: AxiosError) => {
         const dataError = err.response?.data as HandleErrorApi;

         if (Number(dataError.statusCode) === Number(HttpStatusCode.BAD_REQUEST)) {
            return setErrorMessageHookForm(form.setError, dataError.message);
         }

         return errorMessage(err);
      },
   });

   const onSubmitForm: SubmitHandler<MaterialsCatalogSchema> = (data) => {
      // console.log(data);
      SuppliesCreate(data);
   };

   return (
      <BaseBreadcrumbs
         arialabel="Thêm mới"
         breadcrumbs={breadcrumbs}
         sx={({ base }) => ({ bgcolor: base.background.default, border: 'none', p: 0 })}
      >
         <LoadingButton type="submit" variant="contained" loading={isLoading} onClick={form.handleSubmit(onSubmitForm)}>
            Thêm mới
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

export default SuppliesCreate;
