import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';
import { Box, Grid, Typography } from '@mui/material';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { DistributorSchema } from '../utils/distributor.schema';
import { LoadingButton } from '@mui/lab';

interface BaseFormPersonnelPropType {
   form: UseFormReturn<DistributorSchema>;
   isLoading: boolean;
   onSubmitForm: SubmitHandler<DistributorSchema>;
}

const BaseFormDistributor = ({ form, onSubmitForm, isLoading }: BaseFormPersonnelPropType) => {
   const { control, handleSubmit } = form;

   return (
      <div>
         <form onSubmit={handleSubmit(onSubmitForm)}>
            <Grid container spacing={2}>
               <Grid item xs={12}>
                  <Typography component="h4" sx={{ fontWeight: 600 }}>
                     Thông tin nhà phân phối:
                  </Typography>
               </Grid>
               <Grid item xs={12} md={3}>
                  <Box height="96.5px">
                     <ControllerLabel title="Tên nhà phân phối" required />
                     <ControllerTextField isString name="name" control={control} />
                  </Box>
               </Grid>
               <Grid item xs={12} md={3}>
                  <Box height="96.5px">
                     <ControllerLabel title="Email" required />
                     <ControllerTextField name="email" control={control} />
                  </Box>
               </Grid>
               <Grid item xs={12} md={3}>
                  <Box height="96.5px">
                     <ControllerLabel title="Số điện thoại" required />
                     <ControllerTextField isNumber name="phone" control={control} />
                  </Box>
               </Grid>
               <Grid item xs={12} md={3}></Grid>

               <Grid item xs={12}>
                  <Typography component="h4" sx={{ fontWeight: 600 }}>
                     Thông tin thanh toán:
                  </Typography>
               </Grid>
               <Grid item xs={12} md={3}>
                  <Box height="96.5px">
                     <ControllerLabel title="Số tài khoản ngân hàng" required />
                     <ControllerTextField isNumber name="bank_number" control={control} />
                  </Box>
               </Grid>
               <Grid item xs={12} md={3}>
                  <Box height="96.5px">
                     <ControllerLabel title="Tên ngân hàng" required />
                     <ControllerTextField name="bank_name" control={control} />
                  </Box>
               </Grid>
               <Grid item xs={12} md={3}>
                  <Box height="96.5px">
                     <ControllerLabel title="Tên chi nhánh" required />
                     <ControllerTextField name="bank_branch" control={control} />
                  </Box>
               </Grid>
               <Grid item xs={12} md={3}>
                  <Box height="96.5px">
                     <ControllerLabel title="Tên chủ tài khoản" required />
                     <ControllerTextField name="bank_account_name" control={control} />
                  </Box>
               </Grid>

               <Grid item xs={12}>
                  <Typography component="h4" sx={{ fontWeight: 600 }}>
                     Địa chỉ:
                  </Typography>
               </Grid>
               <Grid item xs={12} md={3}>
                  <Box height="96.5px">
                     <ControllerLabel title="Tỉnh/Thành phố" required />
                     <ControllerTextField name="province" control={control} />
                  </Box>
               </Grid>
               <Grid item xs={12} md={3}>
                  <Box height="96.5px">
                     <ControllerLabel title="Quận/huyện" required />
                     <ControllerTextField name="district" control={control} />
                  </Box>
               </Grid>
               <Grid item xs={12} md={3}>
                  <Box height="96.5px">
                     <ControllerLabel title="Xã/Phường" required />
                     <ControllerTextField name="ward" control={control} />
                  </Box>
               </Grid>
               <Grid item xs={12} md={3}>
                  <Box height="96.5px">
                     <ControllerLabel title="Địa chỉ cụ thể" required />
                     <ControllerTextField name="address" control={control} />
                  </Box>
               </Grid>
               <Grid item>
                  <LoadingButton type="submit" variant="contained" loading={isLoading}>
                     Thêm mới
                  </LoadingButton>
               </Grid>
            </Grid>
         </form>
      </div>
   );
};

export default BaseFormDistributor;
