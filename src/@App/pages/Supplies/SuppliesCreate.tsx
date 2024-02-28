/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
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

import BaseFormSupplies from './component/BaseFormSupplies';
import { SuppliesSchema, suppliesSchema } from './utils/supplies.schema';

const breadcrumbs = [
   {
      title: 'Vật tư',
      link: ROUTE_PATH.SUPPLIES,
   },
];

const SuppliesCreate = () => {
   const form = useForm<SuppliesSchema>({
      resolver: yupResolver(suppliesSchema),
      defaultValues: suppliesSchema.getDefault(),
   });

   const { mutate: SuppliesCreate, isLoading } = useMutation({
      mutationFn: async (data: SuppliesSchema) => {
         const { details, ...resData } = data;

         return await suppliesService.create({
            ...resData,
            discount: Number(resData.discount),
            details: details?.map((item) => ({ ...item, imported_price: Number(item.imported_price) })),
         });
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

   const onSubmitForm: SubmitHandler<SuppliesSchema> = (data) => {
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
            Lưu
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
