/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/naming-convention */
import { SubmitHandler, UseFormReturn, FieldValues, Control } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { Box, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';
import ControllerSelect from '@Core/Component/Input/ControllerSelect';
import customerService from '@App/services/customer.service';
import PageContent from '@App/component/customs/PageContent';
import brandCarService from '@App/services/brand-car.service';
import ControllerAutoComplate from '@Core/Component/Input/ControllerAutoComplate';
import { useMemo } from 'react';
import ControllerDate from '@Core/Component/Input/ControllerDate';

import { CarsSchema } from '../utils/cars.schema';

interface BaseFormCarsPropType {
   form: UseFormReturn<CarsSchema>;
   isLoading: boolean;
   onSubmitForm: SubmitHandler<CarsSchema>;
}
const BaseFormCars = ({ form, onSubmitForm, isLoading }: BaseFormCarsPropType) => {
   const { handleSubmit, control, watch, setValue, clearErrors } = form;

   const { data: customers } = useQuery(['getAllCustomers'], async () => {
      try {
         const res = await customerService.get();
         return res.data?.data as Array<Record<string, string | number>>;
      } catch (error) {
         return [];
      }
   });
   const { data: brandCar } = useQuery(['getBrandCarAll'], async () => {
      const res = await brandCarService.get();
      return res.data;
   });

   const brand_car = watch('brand_car');
   const brand_name = watch('name');

   const brandCars = useMemo(() => {
      const brands =
         brandCar?.map((item: any) => ({
            key: item.name,
            name: item.name,
         })) ?? [];

      const models =
         brandCar?.flatMap((item: any) => {
            return item.models.map((model: any) => {
               return { key: model, name: model };
            });
         }) ?? [];

      return {
         brands,
         models,
      };
   }, [brandCar]);

   return (
      <Box component="form" onSubmit={handleSubmit(onSubmitForm)}>
         <Box>
            <LoadingButton type="submit" variant="contained" loading={isLoading}>
               Lưu
            </LoadingButton>
         </Box>
         <PageContent>
            <Grid container spacing={2}>
               <Grid item md={4}>
                  <ControllerLabel title="Chủ xe" required />
                  <ControllerSelect
                     options={customers || []}
                     valuePath="_id"
                     titlePath="name"
                     defaultValue=""
                     name="customer_id"
                     control={control as unknown as Control<FieldValues>}
                  />
               </Grid>

               <Grid item xs={12} md={4}>
                  <Box height="87.5px">
                     <ControllerLabel title="Thương hiệu xe" required />
                     <ControllerAutoComplate
                        options={brandCars.brands ?? []}
                        valuePath="key"
                        titlePath="name"
                        name="brand_car"
                        control={control}
                     />
                  </Box>
               </Grid>
               <Grid item xs={12} md={4}>
                  <Box height="87.5px">
                     <ControllerLabel title="Tên xe" required />
                     <ControllerAutoComplate
                        options={
                           brandCars.models?.filter(
                              (item: { key: string; name: string }) => brand_car === '' || item.key.includes(brand_car),
                           ) ?? []
                        }
                        valuePath="key"
                        titlePath="name"
                        name="name"
                        control={control}
                        onChange={(e) => {
                           const brand =
                              brandCars.brands?.find(
                                 (item: { key: string; name: string }) => brand_name === '' || e.key.includes(item.key),
                              ) ?? [];
                           setValue('brand_car', brand.key as string);
                           clearErrors('brand_car');
                        }}
                     />
                  </Box>
               </Grid>
               <Grid item xs={12} md={6}>
                  <Box height="87.5px">
                     <ControllerLabel title="Biển số xe" required />
                     <ControllerTextField name="license_plate" control={control} />
                  </Box>
               </Grid>
               <Grid item xs={12} md={6}>
                  <Box height="87.5px">
                     <ControllerLabel title="Năm sản xuất" required />
                     <ControllerDate openTo="year" views={['year']} name="production_year" control={control} />
                  </Box>
               </Grid>
               <Grid item xs={12} md={6}>
                  <Box height="87.5px">
                     <ControllerLabel title="Màu sắc xe" required />
                     <ControllerTextField name="car_color" control={control} />
                  </Box>
               </Grid>
               <Grid item xs={12} md={6}>
                  <Box height="87.5px">
                     <ControllerLabel title="Kiểu dáng xe" required />
                     <ControllerTextField name="car_type" control={control} />
                  </Box>
               </Grid>
            </Grid>
         </PageContent>
      </Box>
   );
};

export default BaseFormCars;
