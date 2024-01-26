/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable import/order */

import { SubmitHandler, UseFormReturn, FieldValues, Control } from 'react-hook-form';
import { CarsSchema } from '../utils/cars.schema';
import { Box, Grid, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';
import ControllerSelect from '@Core/Component/Input/ControllerSelect';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface BaseFormCarsPropType {
   form: UseFormReturn<CarsSchema>;
   isLoading: boolean;
   onSubmitForm: SubmitHandler<CarsSchema>;
}
const BaseFormCars = ({ form, onSubmitForm, isLoading }: BaseFormCarsPropType) => {
   const { handleSubmit, control } = form;
   return (
      <form onSubmit={handleSubmit(onSubmitForm)}>
         <Grid container spacing={2}>
            <Grid item xs={12}>
               <Typography component="h4" sx={{ fontWeight: 600 }}>
                  Thông tin xe:
               </Typography>
            </Grid>
            <Grid item xs={12} md={3}>
               <Box height="96.5px">
                  <ControllerLabel title="Tên xe" required />
                  <ControllerTextField name="name" control={control} />
               </Box>
            </Grid>
            <Grid item xs={12} md={3}>
               <Box height="96.5px">
                  <ControllerLabel title="Thương hiệu xe" required />
                  <ControllerTextField name="brand_car" control={control} />
               </Box>
            </Grid>
            <Grid item xs={12} md={3}>
               <Box height="96.5px">
                  <ControllerLabel title="Biển số xe" required />
                  <ControllerTextField name="license_plate" control={control} />
               </Box>
            </Grid>
            <Grid item xs={12} md={3}>
               <Box height="96.5px">
                  <ControllerLabel title="Năm sản xuất" required />
                  <ControllerTextField name="production_year" control={control} />
               </Box>
            </Grid>
            <Grid item xs={12} md={3}>
               <Box height="96.5px">
                  <ControllerLabel title="Màu sắc xe" required />
                  <ControllerTextField name="car_color" control={control} />
               </Box>
            </Grid>
            <Grid item xs={12} md={3}>
               <Box height="96.5px">
                  <ControllerLabel title="Kiểu dáng xe" required />
                  <ControllerTextField name="car_type" control={control} />
               </Box>
            </Grid>
            <Grid item md={3}>
               <ControllerLabel title="Trạng thái" />
               <ControllerSelect
                  options={[
                     { id: 1, label: 'CHECK' },
                     { id: 2, label: 'ORDER_SPARE_PARTS' },
                     { id: 3, label: 'REPAIR' },
                     { id: 4, label: 'COMPLETE' },
                     { id: 5, label: 'CAR_DELIVERY' },
                     { id: 6, label: 'WAIT_FOR_PAYMENT' },
                     { id: 7, label: 'EMPTY' },
                  ]}
                  valuePath="id"
                  titlePath="label"
                  defaultValue=""
                  name="status"
                  control={control as unknown as Control<FieldValues>}
               />
            </Grid>
            <Grid item xs={12}>
               <LoadingButton type="submit" variant="contained" loading={isLoading}>
                  Thêm mới
               </LoadingButton>
            </Grid>
         </Grid>
      </form>
   );
};

export default BaseFormCars;
