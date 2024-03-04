/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable import/order */

import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';
import { Box, Grid, Typography } from '@mui/material';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
// import { useParams } from 'react-router-dom';
import { DistributorSchema } from '../utils/distributor.schema';
import FormDistributor from './FormDistributor';

interface BaseFormPersonnelPropType {
   form: UseFormReturn<DistributorSchema>;
   isLoading: boolean;
   onSubmitForm: SubmitHandler<DistributorSchema>;
   isUpdate?: boolean;
}

const BaseFormDistributor = ({ form, onSubmitForm, isLoading, isUpdate }: BaseFormPersonnelPropType) => {
   // const { id: distributorId } = useParams();
   const { control, handleSubmit } = form;
   return (
      <div>
         <form onSubmit={handleSubmit(onSubmitForm)}>
            <Box>
               <LoadingButton type="submit" variant="contained" loading={isLoading}>
                  {isUpdate ? 'Cập nhật' : 'Thêm mới'}
               </LoadingButton>
            </Box>
            <Box sx={{ mt: 2, bgcolor: '#FFFF', p: 2, borderRadius: 2 }}>
               <Grid container spacing={2}>
                  <Grid item xs={12}>
                     <Typography component="h4" sx={{ fontWeight: 600 }}>
                        Thông tin nhà phân phối:
                     </Typography>
                  </Grid>
                  <Grid item xs={12} md={4}>
                     <Box height="80px">
                        <ControllerLabel title="Tên nhà phân phối" required />
                        <ControllerTextField name="name" control={control} />
                     </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                     <Box height="80px">
                        <ControllerLabel title="Email" required />
                        <ControllerTextField name="email" control={control} />
                     </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                     <Box height="80px">
                        <ControllerLabel title="Số điện thoại" required />
                        <ControllerTextField name="phone" control={control} />
                     </Box>
                  </Grid>

                  <Grid item xs={12} pt={12}>
                     <Typography component="h4" sx={{ fontWeight: 600 }}>
                        Thông tin thanh toán:
                     </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <Box height="80px">
                        <ControllerLabel title="Số tài khoản ngân hàng" />
                        <ControllerTextField name="bank_account_number" control={control} />
                     </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <Box height="80px">
                        <ControllerLabel title="Tên ngân hàng" />
                        <ControllerTextField name="bank_name" control={control} />
                     </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <Box height="80px">
                        <ControllerLabel title="Tên chi nhánh" />
                        <ControllerTextField name="bank_branch" control={control} />
                     </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                     <Box height="80px">
                        <ControllerLabel title="Tên chủ tài khoản" />
                        <ControllerTextField name="account_holder_name" control={control} />
                     </Box>
                  </Grid>

                  <Grid item xs={12}>
                     <Typography component="h4" sx={{ fontWeight: 600 }}>
                        Địa chỉ:
                     </Typography>
                  </Grid>
                  <FormDistributor form={form} />
                  <Grid item xs={12} md={6}>
                     <Box height="80px">
                        <ControllerLabel title="Địa chỉ cụ thể" />
                        <ControllerTextField name="address.specific" control={control} />
                     </Box>
                  </Grid>
               </Grid>
            </Box>
         </form>
      </div>
   );
};

export default BaseFormDistributor;
