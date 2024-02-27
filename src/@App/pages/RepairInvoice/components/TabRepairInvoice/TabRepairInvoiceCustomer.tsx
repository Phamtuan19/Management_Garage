/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/naming-convention */
import { UseFormReturn } from 'react-hook-form';
import { Box, Button, Grid } from '@mui/material';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import ControllerAutoComplate from '@Core/Component/Input/ControllerAutoComplate';
import AddIcon from '@mui/icons-material/Add';
import { useQuery } from '@tanstack/react-query';
import carsService, { DataGetAllFieldCart } from '@App/services/cars.service';
import customerService, { ICustomer } from '@App/services/customer.service';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';
import { useEffect } from 'react';

import { RepairInvoiceSchema } from '../../utils/repair-invoice';

interface TabRepairInvoicePropType {
   form: UseFormReturn<RepairInvoiceSchema>;
   // isLoading: boolean;
   // onSubmitForm: SubmitHandler<RepairInvoiceSchema>;
}

const TabRepairInvoiceCustomer = ({ form }: TabRepairInvoicePropType) => {
   const { control, watch, setValue } = form;

   const customer_id: string = watch('customer.customer_id');
   const car_id: string = watch('car.car_id');

   const { data: customers } = useQuery(['getAllFieldCustomers'], async () => {
      const res = await customerService.fieldAll();
      return res.data;
   });

   const { data: cars } = useQuery(['getAllFieldCars', customer_id], async () => {
      if (customer_id !== '') {
         const res = await carsService.fieldAll({ customer_id });
         return res.data;
      }

      return [];
   });

   useEffect(() => {
      if (customer_id === '') {
         setValue('customer.phone', '');
         setValue('customer.email', '');
      }

      if (car_id === '') {
         setValue('car.car_color', '');
         setValue('car.car_type', '');
         setValue('car.brand_car', '');
         setValue('car.license_plate', '');
      }
   }, [customer_id, car_id]);

   return (
      <Grid container spacing={2}>
         <Grid item md={5} xs={12} sx={{ minHeight: '100px' }}>
            <ControllerLabel title="Khách hàng" required />
            <Box display="flex" gap="0px 12px">
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
         <Grid item md={3} xs={12} sx={{ minHeight: '100px' }}>
            <ControllerLabel title="Số điện thoại" />
            <ControllerTextField disabled placeholder="Số điện thoại" name="customer.phone" control={control} />
         </Grid>
         <Grid item md={4} xs={12} sx={{ minHeight: '100px' }}>
            <ControllerLabel title="Email" />
            <ControllerTextField disabled placeholder="Địa chỉ email" name="customer.email" control={control} />
         </Grid>
         <Grid item md={5} xs={12} sx={{ minHeight: '100px' }}>
            <ControllerLabel title="Xe" required />
            <Box display="flex" gap={1}>
               <Box flex={1}>
                  <ControllerAutoComplate
                     options={(cars as never) || []}
                     valuePath="_id"
                     titlePath="name"
                     name="car.car_id"
                     placeholder="Chọn xe cần sữa chữa"
                     control={control}
                     disabled={!customer_id}
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
         <Grid item md={3} xs={12} sx={{ minHeight: '100px' }}>
            <ControllerLabel title="Số Km" required />
            <ControllerTextField placeholder="Số ki-lo-met của xe" number name="car.kilometer" control={control} />
         </Grid>
         <Grid item md={4} xs={12} sx={{ minHeight: '100px' }}>
            <ControllerLabel title="Biển số xe" />
            <ControllerTextField disabled placeholder="Biển số xe" name="car.license_plate" control={control} />
         </Grid>
         <Grid item md={4} xs={12} sx={{ minHeight: '100px' }}>
            <ControllerLabel title="Hãng xe" />
            <ControllerTextField disabled placeholder="Hãng xe" name="car.brand_car" control={control} />
         </Grid>
         <Grid item md={4} xs={12} sx={{ minHeight: '100px' }}>
            <ControllerLabel title="Loại xe" />
            <ControllerTextField disabled placeholder="Loại xe" name="car.car_type" control={control} />
         </Grid>
         <Grid item md={4} xs={12} sx={{ minHeight: '100px' }}>
            <ControllerLabel title="Màu sắc" />
            <ControllerTextField disabled placeholder="Màu sắc" name="car.car_color" control={control} />
         </Grid>
      </Grid>
   );
};

export default TabRepairInvoiceCustomer;
