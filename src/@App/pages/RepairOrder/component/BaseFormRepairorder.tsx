/* eslint-disable @typescript-eslint/no-misused-promises */
import { SubmitHandler, UseFormReturn, FieldValues, Control } from 'react-hook-form';
import { Box, Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import personnelService from '@App/services/personnel.service';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';
import carsService from '@App/services/cars.service';
import { LoadingButton } from '@mui/lab';
import ControllerSelect from '@Core/Component/Input/ControllerSelect';
import { car_status } from '@App/pages/Cars/utils';

import { RepairorderSchema } from '../utils/repairorderSchema';

interface BaseFormRepairOrderPropType {
   form: UseFormReturn<RepairorderSchema>;
   isLoading: boolean;
   onSubmitForm: SubmitHandler<RepairorderSchema>;
}
const BaseFormRepairOrder = ({ form, onSubmitForm, isLoading }: BaseFormRepairOrderPropType) => {
   const { control, handleSubmit } = form;
   const { data: personnel } = useQuery(['getAllPersonnel'], async () => {
      try {
         const res = await personnelService.get();
         return res.data?.data as Array<Record<string, string | number>>;
      } catch (error) {
         return [];
      }
   });
   const { data: cars } = useQuery(['getAllCars'], async () => {
      try {
         const res = await carsService.get();
         return res?.data.data as Array<Record<string, string | number>>;
      } catch (error) {
         return [];
      }
   });

   return (
      <form onSubmit={handleSubmit(onSubmitForm)}>
         <Box>
            <LoadingButton type="submit" variant="contained" loading={isLoading}>
               Thêm mới
            </LoadingButton>
            <Box sx={{ mt: 2, bgcolor: '#FFF', p: 2, borderRadius: 2 }}>
               <Grid container spacing={2}>
                  <Grid item md={6}>
                     <Box sx={{ minHeight: '80px' }}>
                        <ControllerLabel title="Mã phiếu sửa chữa" required />
                        <ControllerTextField name="code" control={control} />
                     </Box>
                  </Grid>
                  <Grid item md={6}>
                     <ControllerLabel title="Nhân viên tạo xe" required />
                     <ControllerSelect
                        options={personnel || []}
                        valuePath="_id"
                        titlePath="full_name"
                        defaultValue=""
                        name="personnel_id"
                        control={control as unknown as Control<FieldValues>}
                     />
                  </Grid>
                  <Grid item md={6}>
                     <ControllerLabel title="Xe" required />
                     <ControllerSelect
                        options={cars || []}
                        valuePath="_id"
                        titlePath="name"
                        defaultValue=""
                        name="car_id"
                        control={control as unknown as Control<FieldValues>}
                     />
                  </Grid>
                  <Grid item md={6}>
                     <Box sx={{ minHeight: '80px' }}>
                        <ControllerLabel title="Kilometer" required />
                        <ControllerTextField name="kilometer" control={control} />
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
                  <Grid item md={6}>
                     <Box sx={{ minHeight: '80px' }}>
                        <ControllerLabel title="Mô tả" required />
                        <ControllerTextField name="describe" control={control} />
                     </Box>
                  </Grid>
               </Grid>
            </Box>
         </Box>
      </form>
   );
};
export default BaseFormRepairOrder;
