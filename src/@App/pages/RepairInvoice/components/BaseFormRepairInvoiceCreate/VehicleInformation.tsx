/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/naming-convention */
import { UseFormReturn } from 'react-hook-form';
import { Box, Button, Grid, Modal } from '@mui/material';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import ControllerAutoComplate from '@Core/Component/Input/ControllerAutoComplate';
import { useQuery } from '@tanstack/react-query';
import AddIcon from '@mui/icons-material/Add';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';
import carsService, { DataGetAllFieldCart } from '@App/services/cars.service';
import { useState } from 'react';

import { RepairInvoiceSchema } from '../../utils/repair-invoice-create';

import ContentModalCar from './ContentModalCar';

interface VehicleInformationProps {
   form: UseFormReturn<RepairInvoiceSchema>;
}
const VehicleInformation = ({ form }: VehicleInformationProps) => {
   const { setValue, control, watch } = form;
   const customerId: string = watch('customer.customer_id');
   const [open, setOpen] = useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   const { data: cars, refetch } = useQuery(['getAllFieldCars', customerId], async () => {
      if (customerId !== '') {
         const res = await carsService.fieldAll({ customer_id: customerId, status: 'EMPTY' });
         return res.data;
      }

      return [];
   });

   const handleChangeCar = (e: DataGetAllFieldCart) => {
      setValue('car.car_color', e.car_color);
      setValue('car.car_type', e.car_type);
      setValue('car.brand_car', e.brand_car);
      setValue('car.license_plate', e.license_plate);
      setValue('car.car_name', e.name);
   };

   return (
      <>
         <Grid container spacing={1}>
            <Grid item xs={5.5}>
               <Grid container spacing={0.3}>
                  <Grid item xs={2.5} display="flex">
                     <ControllerLabel title="Xe:" required />
                  </Grid>
                  <Grid item xs={9.5} display="flex" gap={0.5}>
                     <Box flex={1}>
                        <ControllerAutoComplate
                           options={(cars as never) || []}
                           valuePath="_id"
                           titlePath="name"
                           name="car.car_id"
                           placeholder="Chọn xe cần sữa chữa"
                           control={control}
                           onChange={handleChangeCar}
                           renderOptionChildren={(props, e) => {
                              return (
                                 <Box sx={{ display: 'flex', gap: 1, px: 2, py: 1, cursor: 'pointer' }} {...props}>
                                    <Box>{e.name}</Box>
                                    <Box>{e.license_plate}</Box>
                                 </Box>
                              );
                           }}
                        />
                     </Box>
                     <Button
                        sx={{ minWidth: 'auto', px: '12px', maxHeight: '37.6px' }}
                        disabled={!watch('customer.customer_id')}
                        onClick={handleOpen}
                     >
                        <AddIcon />
                     </Button>
                  </Grid>
               </Grid>
            </Grid>
            <Grid item xs={3}>
               <Grid container spacing={0.3}>
                  <Grid item xs={5} display="flex">
                     <ControllerLabel title="Số Km:" required />
                  </Grid>
                  <Grid item xs={7}>
                     <ControllerTextField
                        placeholder="Số ki-lo-met của xe"
                        number
                        name="car.kilometer"
                        control={control}
                        maxLength={6}
                     />
                  </Grid>
               </Grid>
            </Grid>
            <Grid item xs={3.5}>
               <Grid container spacing={0.3}>
                  <Grid item xs={3} display="flex">
                     <ControllerLabel title="Biển số xe:" />
                  </Grid>
                  <Grid item xs={9}>
                     <ControllerTextField
                        disabled
                        placeholder="Biển số xe"
                        name="car.license_plate"
                        control={control}
                     />
                  </Grid>
               </Grid>
            </Grid>
            <Grid item xs={5.5}>
               <Grid container spacing={0.3}>
                  <Grid item xs={2.5} display="flex">
                     <ControllerLabel title="Hãng xe:" />
                  </Grid>
                  <Grid item xs={9.5}>
                     <ControllerTextField disabled placeholder="Hãng xe" name="car.brand_car" control={control} />
                  </Grid>
               </Grid>
            </Grid>
            <Grid item xs={3}>
               <Grid container spacing={0.3}>
                  <Grid item xs={5} display="flex">
                     <ControllerLabel title="Loại xe:" />
                  </Grid>
                  <Grid item xs={7}>
                     <ControllerTextField disabled placeholder="Loại xe" name="car.car_type" control={control} />{' '}
                  </Grid>
               </Grid>
            </Grid>
            <Grid item xs={3.5}>
               <Grid container spacing={0.3}>
                  <Grid item xs={3} display="flex">
                     <ControllerLabel title="Màu sắc:" />
                  </Grid>
                  <Grid item xs={9}>
                     <ControllerTextField disabled placeholder="Màu sắc" name="car.car_color" control={control} />
                  </Grid>
               </Grid>
            </Grid>
         </Grid>
         <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style}>
               <ContentModalCar
                  watchRepairInvoice={watch}
                  setValueRepairInvoice={setValue}
                  refetchCustomer={refetch}
                  handleClose={handleClose}
               />
            </Box>
         </Modal>
      </>
   );
};

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 600,
   bgcolor: 'background.paper',
   boxShadow: 24,
   borderRadius: 1.5,
   p: 1.5,
};
export default VehicleInformation;
