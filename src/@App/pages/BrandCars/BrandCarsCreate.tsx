/* eslint-disable @typescript-eslint/no-misused-promises */
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import ROUTE_PATH from '@App/configs/router-path';
import { LoadingButton } from '@mui/lab';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { BrandCarSchema, brandCarSchema } from './utils/brand-car.schema';
import BaseFrom from './components/BaseFrom';

const breadcrumbs = [
   {
      title: 'Thương hiệu xe',
      link: ROUTE_PATH.BRAND_CARS,
   },
];

const BrandCarsCreate = () => {
   const form = useForm<BrandCarSchema>({
      resolver: yupResolver(brandCarSchema),
   });

   const { isLoading } = useMutation({});

   const onSubmitForm: SubmitHandler<BrandCarSchema> = () => {};

   return (
      <BaseBreadcrumbs arialabel="Thêm mới" breadcrumbs={breadcrumbs}>
         <LoadingButton type="submit" variant="contained" loading={isLoading} onClick={form.handleSubmit(onSubmitForm)}>
            Lưu
         </LoadingButton>
         <BaseFrom form={form} />
      </BaseBreadcrumbs>
   );
};

export default BrandCarsCreate;
