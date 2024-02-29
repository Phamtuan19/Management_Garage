/* eslint-disable @typescript-eslint/no-misused-promises */
import { LoadingButton } from '@mui/lab';
import { Box, Grid } from '@mui/material';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';

import { RepairServiceSchema } from '../utils/repairService.schema';

interface BaseFormRepairService {
   form: UseFormReturn<RepairServiceSchema>;
   isLoading: boolean;
   onSubmitForm: SubmitHandler<RepairServiceSchema>;
   isUpdate?: boolean;
}

const BaseFormRepairService = ({ form, isLoading, onSubmitForm, isUpdate }: BaseFormRepairService) => {
   const { handleSubmit, control } = form;
   return (
      <Box component="form" onSubmit={handleSubmit(onSubmitForm)}>
         <Grid container spacing={2}>
            <Grid item xs={12}>
               <Box height="96.5px">
                  <ControllerLabel title="Tên dịch vụ" required />
                  <ControllerTextField name="name" control={control} placeholder="Tên dịch vụ ?" />
               </Box>
            </Grid>
            <Grid item xs={12}>
               <Box>
                  <ControllerLabel title="Giá" required />
                  <ControllerTextField name="price" number control={control} placeholder="Giá dịch vụ ?" />
               </Box>
            </Grid>
            <Grid item xs={12}>
               <ControllerLabel title="Giảm giá" required />
               <ControllerTextField name="discount" control={control} placeholder="Giảm giá ?" />
            </Grid>
            <Grid item xs={12}>
               <ControllerLabel title="Mô tả" required />
               <ControllerTextField name="describe" control={control} placeholder="Mô tả dịch vụ ?" />
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

export default BaseFormRepairService;
