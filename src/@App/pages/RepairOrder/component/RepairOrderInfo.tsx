/* eslint-disable @typescript-eslint/naming-convention */
import ControllerAutoComplate from '@Core/Component/Input/ControllerAutoComplate';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import { Box, Button, Grid, Typography } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import customerService from '@App/services/customer.service';
import carsService from '@App/services/cars.service';
import { useQuery } from '@tanstack/react-query';
import AddIcon from '@mui/icons-material/Add';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';

import { RepairorderSchema } from '../utils/repairorderSchema';

import RepairOrderService from './RepairOrderService';

interface RepairOrderInfoPropsType {
   form: UseFormReturn<RepairorderSchema>;
}

const RepairOrderInfo = ({ form }: RepairOrderInfoPropsType) => {
   const { control, watch } = form;

   const customerId: string = watch('customer_id');

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
         <Grid item xs={12}>
            <Typography
               variant="h2"
               sx={{
                  fontSize: '1rem',
                  py: '16px',
                  lineHeight: '20px',
                  fontWeight: 500,
                  borderBottom: '1px solid #E8EAEB',
               }}
            >
               Thông tin khách hàng
            </Typography>
         </Grid>
         <Grid item md={6} xs={12}>
            <ControllerLabel title="Khách hàng" required />
            <Box display="flex" gap={1}>
               <Box flex={1}>
                  <ControllerAutoComplate
                     options={customers || []}
                     valuePath="_id"
                     titlePath="name"
                     name="customer_id"
                     placeholder="Chọn khách hàng"
                     control={control}
                  />
               </Box>
               <Button sx={{ minWidth: 'auto', px: '12px' }}>
                  <AddIcon />
               </Button>
            </Box>
         </Grid>
         <Grid item md={6} xs={12}>
            <ControllerLabel title="Số điện thoại" />
            <ControllerTextField disabled placeholder="Số điện thoại" name="customer_phone" control={control} />
         </Grid>
         <Grid item md={6} xs={12}>
            <ControllerLabel title="Email" />
            <ControllerTextField disabled placeholder="Địa chỉ email" name="customer_phone" control={control} />
         </Grid>
         <Grid item md={6} xs={12}></Grid>
         <Grid item md={6} xs={12}>
            <ControllerLabel title="Xe" required />
            <Box display="flex" gap={1}>
               <Box flex={1}>
                  <ControllerAutoComplate
                     options={cars || []}
                     valuePath="_id"
                     titlePath="name"
                     name="car_id"
                     placeholder="Chọn xe cần sủa chữa"
                     control={control}
                     disabled={!customerId}
                  />
               </Box>
               <Button sx={{ minWidth: 'auto', px: '12px' }}>
                  <AddIcon />
               </Button>
            </Box>
         </Grid>
         <Grid item md={6} xs={12}>
            <ControllerLabel title="Biển số xe" required />
            <ControllerTextField disabled placeholder="Biển số xe" name="customer_phone" control={control} />
         </Grid>
         <Grid item md={4} xs={12}>
            <ControllerLabel title="Hãng xe" required />
            <ControllerTextField disabled placeholder="Hãng xe" name="customer_phone" control={control} />
         </Grid>
         <Grid item md={4} xs={12}>
            <ControllerLabel title="Loại xe" required />
            <ControllerTextField disabled placeholder="Loại xe" name="customer_phone" control={control} />
         </Grid>
         <Grid item md={4} xs={12}>
            <ControllerLabel title="Màu sắc" required />
            <ControllerTextField disabled placeholder="Màu sắc" name="customer_phone" control={control} />
         </Grid>
         <Grid item xs={12}>
            <RepairOrderService form={form} />
         </Grid>
      </Grid>
   );
};

export default RepairOrderInfo;
