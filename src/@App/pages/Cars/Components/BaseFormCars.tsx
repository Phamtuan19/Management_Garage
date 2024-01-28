/* eslint-disable @typescript-eslint/no-misused-promises */
import { SubmitHandler, UseFormReturn, FieldValues, Control } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { Box, Grid } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';
import ControllerSelect from '@Core/Component/Input/ControllerSelect';
import customerService from '@App/services/custome.service';

import { CarsSchema } from '../utils/cars.schema';
import { car_status } from '../utils';

interface BaseFormCarsPropType {
   form: UseFormReturn<CarsSchema>;
   isLoading: boolean;
   onSubmitForm: SubmitHandler<CarsSchema>;
   isUpdate?: boolean;
}
const BaseFormCars = ({ form, onSubmitForm, isLoading, isUpdate }: BaseFormCarsPropType) => {
   const { handleSubmit, control } = form;
   const { data: customers } = useQuery(['getAllCustomers'], async () => {
      try {
         const res = await customerService.get();
         return res?.data?.data as Array<Record<string, string | number>>;
      } catch (error) {
         return [];
      }
   });

   return (
      <Box component="form" onSubmit={handleSubmit(onSubmitForm)}>
         <Grid container spacing={2}>
            <Grid item md={6}>
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

            <Grid item xs={12} md={6}>
               <Box height="96.5px">
                  <ControllerLabel title="Tên xe" required />
                  <ControllerTextField name="name" control={control} />
               </Box>
            </Grid>
            <Grid item xs={12} md={6}>
               <Box height="96.5px">
                  <ControllerLabel title="Thương hiệu xe" required />
                  <ControllerTextField name="brand_car" control={control} />
               </Box>
            </Grid>
            <Grid item xs={12} md={6}>
               <Box height="96.5px">
                  <ControllerLabel title="Biển số xe" required />
                  <ControllerTextField name="license_plate" control={control} />
               </Box>
            </Grid>
            <Grid item xs={12} md={6}>
               <Box height="96.5px">
                  <ControllerLabel title="Năm sản xuất" required />
                  <ControllerTextField name="production_year" control={control} />
               </Box>
            </Grid>
            <Grid item xs={12} md={6}>
               <Box height="96.5px">
                  <ControllerLabel title="Màu sắc xe" required />
                  <ControllerTextField name="car_color" control={control} />
               </Box>
            </Grid>
            <Grid item xs={12} md={6}>
               <Box height="96.5px">
                  <ControllerLabel title="Kiểu dáng xe" required />
                  <ControllerTextField name="car_type" control={control} />
               </Box>
            </Grid>
            <Grid item md={6}>
               <ControllerLabel title="Trạng thái" />
               <ControllerSelect
                  options={car_status}
                  valuePath="key"
                  titlePath="title"
                  name="status"
                  control={control as unknown as Control<FieldValues>}
               />
            </Grid>
            <Grid item xs={12}>
               <LoadingButton type="submit" variant="contained" loading={isLoading}>
                  {isUpdate ? 'Cập nhật' : 'Thêm mới'}
               </LoadingButton>
            </Grid>
         </Grid>
      </Box>
   );
};

export default BaseFormCars;
