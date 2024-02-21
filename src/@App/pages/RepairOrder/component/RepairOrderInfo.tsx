/* eslint-disable @typescript-eslint/naming-convention */
import ControllerAutoComplate from '@Core/Component/Input/ControllerAutoComplate';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import { Box, Button, Grid } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import customerService, { ICustomer } from '@App/services/customer.service';
import carsService, { DataGetAllFieldCart } from '@App/services/cars.service';
import { useQuery } from '@tanstack/react-query';
import AddIcon from '@mui/icons-material/Add';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';

import { RepairorderSchema } from '../utils/repairorderSchema';

interface RepairOrderInfoPropsType {
   form: UseFormReturn<RepairorderSchema>;
}

const RepairOrderInfo = ({ form }: RepairOrderInfoPropsType) => {
   const { control, watch, setValue } = form;

   const customerId: string = watch('customer.customer_id');

   const { data: customers } = useQuery(['getAllFieldCustomers'], async () => {
      const res = await customerService.fieldAll();
      return res.data;
   });

   const { data: cars } = useQuery(['getAllFieldCars', customerId], async () => {
      if (customerId !== '') {
         const res = await carsService.fieldAll({ customer_id: customerId });
         return res.data;
      }

      return [];
   });

   return (
      <Grid container spacing={2}>
         <Grid item md={6} xs={12} sx={{ minHeight: '60px' }}>
            <ControllerLabel title="Khách hàng" required />
            <Box display="flex" gap={1}>
               <Box flex={1}>
                  <ControllerAutoComplate
                     options={(customers as never) || []}
                     valuePath="_id"
                     titlePath="name"
                     name="customer.customer_id"
                     placeholder="Chọn khách hàng"
                     control={control}
                     onChange={(e: ICustomer) => {
                        setValue('customer.phone', e.phone);
                        setValue('customer.email', e.email);
                     }}
                  />
               </Box>
               <Button sx={{ minWidth: 'auto', px: '12px', maxHeight: '37.6px' }}>
                  <AddIcon />
               </Button>
            </Box>
         </Grid>
         <Grid item md={6} xs={12} sx={{ minHeight: '109px' }}>
            <ControllerLabel title="Số điện thoại" />
            <ControllerTextField disabled placeholder="Số điện thoại" name="customer.phone" control={control} />
         </Grid>
         <Grid item md={6} xs={12} sx={{ minHeight: '109px' }}>
            <ControllerLabel title="Email" />
            <ControllerTextField disabled placeholder="Địa chỉ email" name="customer.email" control={control} />
         </Grid>
         <Grid item md={6} xs={12}></Grid>
         <Grid item md={6} xs={12} sx={{ minHeight: '109px' }}>
            <ControllerLabel title="Xe" required />
            <Box display="flex" gap={1}>
               <Box flex={1}>
                  <ControllerAutoComplate
                     options={(cars as never) || []}
                     valuePath="_id"
                     titlePath="name"
                     name="car.car_id"
                     placeholder="Chọn xe cần sủa chữa"
                     control={control}
                     disabled={!customerId}
                     onChange={(e: DataGetAllFieldCart) => {
                        setValue('car.car_color', e.car_color);
                        setValue('car.car_type', e.car_type);
                        setValue('car.brand_car', e.brand_car);
                        setValue('car.license_plate', e.license_plate);
                     }}
                  />
               </Box>
               <Button sx={{ minWidth: 'auto', px: '12px', maxHeight: '37.6px' }}>
                  <AddIcon />
               </Button>
            </Box>
         </Grid>
         <Grid item md={6} xs={12} sx={{ minHeight: '109px' }}>
            <ControllerLabel title="Số Km" required />
            <ControllerTextField placeholder="Số ki-lo-met của xe" name="car.kilometer" control={control} />
         </Grid>
         <Grid item md={6} xs={12} sx={{ minHeight: '109px' }}>
            <ControllerLabel title="Biển số xe" />
            <ControllerTextField disabled placeholder="Biển số xe" name="car.license_plate" control={control} />
         </Grid>
         <Grid item md={6} xs={12} sx={{ minHeight: '109px' }}>
            <ControllerLabel title="Hãng xe" />
            <ControllerTextField disabled placeholder="Hãng xe" name="car.brand_car" control={control} />
         </Grid>
         <Grid item md={6} xs={12} sx={{ minHeight: '109px' }}>
            <ControllerLabel title="Loại xe" />
            <ControllerTextField disabled placeholder="Loại xe" name="car.car_type" control={control} />
         </Grid>
         <Grid item md={6} xs={12} sx={{ minHeight: '109px' }}>
            <ControllerLabel title="Màu sắc" />
            <ControllerTextField disabled placeholder="Màu sắc" name="car.car_color" control={control} />
         </Grid>
      </Grid>
   );
};

export default RepairOrderInfo;
