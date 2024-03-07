/* eslint-disable @typescript-eslint/no-misused-promises */
import { LoadingButton } from '@mui/lab';
import { Box, Grid } from '@mui/material';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';

import { CustomerSchema } from '../utils/customer.schema';

interface BaseFormPersonnelPropType {
   form: UseFormReturn<CustomerSchema>;
   isLoading: boolean;
   onSubmitForm: SubmitHandler<CustomerSchema>;
   isUpdate?: boolean;
}
const BaseFormCustomer = ({ form, isLoading, onSubmitForm, isUpdate }: BaseFormPersonnelPropType) => {
   const { handleSubmit, control } = form;
   return (
      <Box component="form" onSubmit={handleSubmit(onSubmitForm)}>
         <Box>
            <LoadingButton type="submit" variant="contained" loading={isLoading}>
               {isUpdate ? 'Cập nhật' : 'Thêm mới'}
            </LoadingButton>
         </Box>
         <Box sx={{ mt: 2, bgcolor: '#FFFF', p: 2, borderRadius: 2 }}>
            <Grid container spacing={2}>
               <Grid item xs={12}>
                  <Box height="96.5px">
                     <ControllerLabel title="Tên khách hàng" required />
                     <ControllerTextField name="name" control={control} placeholder="Tên khách hàng ?" />
                  </Box>
               </Grid>
               <Grid item xs={12}>
                  <Box>
                     <ControllerLabel title="Số điện thoại" required />
                     <ControllerTextField name="phone" control={control} placeholder="Số điện thoại ?" />
                  </Box>
               </Grid>
               <Grid item xs={12}>
                  <ControllerLabel title="Email" required />
                  <ControllerTextField name="email" control={control} placeholder="Email?" />
               </Grid>
            </Grid>
         </Box>
      </Box>
   );
};

export default BaseFormCustomer;
