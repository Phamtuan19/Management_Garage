/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';
import { Box, Grid, Typography } from '@mui/material';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import ControllerAutoComplate from '@Core/Component/Input/ControllerAutoComplate';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { getDistricts, getProvinces, getWards } from '../utils';
import { DistributorSchema } from '../utils/distributor.schema';

interface BaseFormPersonnelPropType {
   form: UseFormReturn<DistributorSchema>;
   isLoading: boolean;
   onSubmitForm: SubmitHandler<DistributorSchema>;
}

const BaseFormDistributor = ({ form, onSubmitForm, isLoading }: BaseFormPersonnelPropType) => {
   const { id: distributorId } = useParams();
   const { control, handleSubmit, watch, setValue } = form;

   const watchProvince = watch('province');
   const watchDistrict = watch('district');

   const { data: provinces, isLoading: isLoadingProvinces } = useQuery(['getProvinces'], async () => {
      const res = await getProvinces();
      return res.map((item: { code: string; name: string }) => ({
         value: item.code + '-' + item.name,
         title: item.name,
      }));
   });

   const { data: districts, isLoading: isLoadingDistricts } = useQuery(['getDistrict', watchProvince], async () => {
      if (watchProvince) {
         const res = await getDistricts(watchProvince.split('-')[0]);
         return res.map((item: { code: string; name: string }) => ({
            value: item.code + '-' + item.name,
            title: item.name,
         }));
      }

      setValue('district', '');
      return [];
   });

   const { data: wards, isLoading: isLoadingWard } = useQuery(['getWards', watchDistrict], async () => {
      if (watchDistrict) {
         const res = await getWards(watchDistrict.split('-')[0]);
         return res.map((item: { code: string; name: string }) => ({
            value: item.code + '-' + item.name,
            title: item.name,
         }));
      }
      setValue('ward', '');
      return [];
   });

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
                     <ControllerTextField string name="name" control={control} />
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
                     <ControllerTextField number name="phone" control={control} />
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
                     <ControllerTextField number name="bank_number" control={control} />
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
                     <ControllerAutoComplate
                        name="province"
                        valuePath="value"
                        titlePath="title"
                        loading={isLoadingProvinces}
                        options={provinces || []}
                        control={control}
                     />
                  </Box>
               </Grid>
               <Grid item xs={12} md={3}>
                  <Box height="96.5px">
                     <ControllerLabel title="Quận/huyện" required />
                     <ControllerAutoComplate
                        name="district"
                        valuePath="value"
                        titlePath="title"
                        loading={isLoadingDistricts}
                        options={districts || []}
                        control={control}
                     />
                  </Box>
               </Grid>
               <Grid item xs={12} md={3}>
                  <Box height="96.5px">
                     <ControllerLabel title="Xã/Phường" required />
                     <ControllerAutoComplate
                        name="ward"
                        valuePath="value"
                        titlePath="title"
                        loading={isLoadingWard}
                        options={wards || []}
                        control={control}
                     />
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
                     {distributorId ? 'Cập nhật' : 'Thêm mới'}
                  </LoadingButton>
               </Grid>
            </Grid>
         </form>
      </div>
   );
};

export default BaseFormDistributor;
