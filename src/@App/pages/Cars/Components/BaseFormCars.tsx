
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { SubmitHandler, UseFormReturn, FieldValues, Control } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { Box, Grid, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';
import ControllerSelect from '@Core/Component/Input/ControllerSelect';
import customerService, { ICustomer } from '@App/services/custome.service';
import { CarsSchema } from '../utils/cars.schema';

interface BaseFormCarsPropType {
   form: UseFormReturn<CarsSchema>;
   isLoading: boolean;
   onSubmitForm: SubmitHandler<CarsSchema>;
   isUpdate?: boolean;
}
const BaseFormCars = ({ form, onSubmitForm, isLoading, isUpdate }: BaseFormCarsPropType) => {
   const { handleSubmit, control } = form;
   const { data: allCustome } = useQuery(['getAllCustome'], async () => {
      try {
         const res = await customerService.get();
         if (!res.data.data) {
            return [];
         }
         return res.data.data.map((item: ICustomer) => ({
            value: item._id,
            title: item.name,
         }));
      } catch (error) {
         return [];
      }
   });
  
   return (
      <form onSubmit={handleSubmit(onSubmitForm)}>
         <Grid container spacing={2}>
            <Grid item xs={12}>
               <Typography component="h4" sx={{ fontWeight: 600, fontSize: 20 }}>
                  Thông tin tiếp nhận xe:
               </Typography>
            </Grid>
            <Grid item md={3}>
               <ControllerLabel title="Khách hàng" />
               {
                  <ControllerSelect
                     options={allCustome || []}
                     valuePath="value"
                     titlePath="title"
                     defaultValue=""
                     name="customer_id"
                     control={control as unknown as Control<FieldValues>}
                  />
               }
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
                     { id: 'CHECK', label: 'CHECK' },
                     { id: 'ORDER_SPARE_PARTS', label: 'ORDER_SPARE_PARTS' },
                     { id: 'REPAIR', label: 'REPAIR' },
                     { id: 'COMPLETE', label: 'COMPLETE' },
                     { id: 'CAR_DELIVERY', label: 'CAR_DELIVERY' },
                     { id: 'WAIT_FOR_PAYMENT', label: 'WAIT_FOR_PAYMENT' },
                     { id: 'EMPTY', label: 'EMPTY' },
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
                  {isUpdate ? 'Cập nhật' : 'Thêm mới'}
               </LoadingButton>
            </Grid>
         </Grid>
      </form>
   );
};

export default BaseFormCars;