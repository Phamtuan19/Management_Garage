/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable import/order */

import { SubmitHandler, UseFormReturn, FieldValues, Control } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { CarsSchema } from '../utils/cars.schema';
import { Box, Grid, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';
import ControllerSelect from '@Core/Component/Input/ControllerSelect';
import customerService, { ICustomer } from '@App/services/custome.service';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface BaseFormCarsPropType {
   form: UseFormReturn<CarsSchema>;
   isLoading: boolean;
   onSubmitForm: SubmitHandler<CarsSchema>;
}
const BaseFormCars = ({ form, onSubmitForm, isLoading }: BaseFormCarsPropType) => {
   const { handleSubmit, control } = form;
   const { data: allCustome } = useQuery(['getAllCustome'], async () => {
      try {
         const res = await customerService.get();
         console.log('Dữ liệu khách hàng:', res.data);
         if (!res.data.data) {
            console.error('Lỗi: Dữ liệu khách hàng không tồn tại.');
            return [];
         }
         return res.data.data.map((item: ICustomer) => ({
            value: item._id,
            title: item.name,
         }));
      } catch (error) {
         console.error('Lỗi khi lấy dữ liệu khách hàng:', error);
         return [];
      }
   });

   return (
      <form onSubmit={handleSubmit(onSubmitForm)}>
         <Grid container spacing={2}>
            <Grid item xs={12}>
               <Typography component="h4" sx={{ fontWeight: 600 }}>
                  Danh sách khách hàng:
               </Typography>
            </Grid>
            <Grid item md={3}>
               <ControllerSelect
                  options={allCustome || []}
                  valuePath="value"
                  titlePath="title"
                  defaultValue="Click để chọn"
                  name="customer_id"
                  control={control as unknown as Control<FieldValues>}
               />
            </Grid>
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
                  Thêm mới
               </LoadingButton>
            </Grid>
         </Grid>
      </form>
   );
};

export default BaseFormCars;
