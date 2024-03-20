/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/naming-convention */
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import PageContent from '@App/component/customs/PageContent';
import ROUTE_PATH from '@App/configs/router-path';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import ControllerRadioGroup from '@Core/Component/Input/ControllerRadioGroup';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingButton } from '@mui/lab';
import { Box, FormControl, Grid } from '@mui/material';
import { Control, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useAuth } from '@App/redux/slices/auth.slice';
import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import authService from '@App/services/auth.service';
import { errorMessage, successMessage } from '@Core/Helper/message';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import ControllerDate from '@Core/Component/Input/ControllerDate';

import { ProfileUpdateType, profileUpdateSchema } from './utils/profile-update';

const breadcrumbs = [
   {
      title: 'Thông tin tài khoản',
      link: ROUTE_PATH.USER_PROFILE,
   },
];

const ProfileUpdate = () => {
   const navigate = useNavigate();
   const { user } = useAuth();

   const { control, reset, handleSubmit } = useForm<ProfileUpdateType>({
      resolver: yupResolver(profileUpdateSchema),
      defaultValues: profileUpdateSchema.getDefault(),
   });

   const { mutate: handleUpdate, isLoading } = useMutation({
      mutationFn: async (data: ProfileUpdateType) => {
         return await authService.update(data, user?._id);
      },
      onSuccess: () => {
         successMessage('Cập nhật thành công');
         return navigate(ROUTE_PATH.USER_PROFILE);
      },
      onError: (err: AxiosError) => {
         return errorMessage(err);
      },
   });

   useEffect(() => {
      if (user) {
         reset({
            email: user.email,
            full_name: user.full_name,
            gender: user.gender,
            phone: user.phone,
         });
      }
   }, [user]);

   const handleSubmitForm: SubmitHandler<ProfileUpdateType> = (data) => handleUpdate(data);

   return (
      <BaseBreadcrumbs breadcrumbs={breadcrumbs} arialabel="Chỉnh sửa">
         <LoadingButton variant="contained" onClick={handleSubmit(handleSubmitForm)} loading={isLoading}>
            Lưu
         </LoadingButton>
         <PageContent>
            <Grid container spacing={4}>
               <Grid item xs={12} md={4}>
                  <Box height="65px">
                     <ControllerLabel title="Họ và tên" required />
                     <ControllerTextField name="full_name" control={control} placeholder="Họ và tên" />
                  </Box>
               </Grid>
               <Grid item xs={12} md={4}>
                  <Box height="65px">
                     <ControllerLabel title="Email" required />
                     <ControllerTextField name="email" control={control} placeholder="Email" />
                  </Box>
               </Grid>
               <Grid item xs={12} md={4}>
                  <Box height="65px">
                     <ControllerLabel title="Số điện thoại" required />
                     <ControllerTextField name="phone" number control={control} placeholder="Số điện thoại" />
                  </Box>
               </Grid>
               <Grid item xs={12} md={4}>
                  <Box height="65px">
                     <ControllerLabel title="Ngày sinh " required />
                     {/* <ControllerTextField name="birth_day" control={control} placeholder="Ngày sinh" /> */}
                     <ControllerDate name="birth_day" control={control} />
                  </Box>
               </Grid>
               <Grid item xs={12} md={4}>
                  <Box height="65px">
                     <ControllerLabel title="CCCD " required />
                     <ControllerTextField name="cccd_number" number control={control} />
                  </Box>
               </Grid>
               <Grid item md={3}>
                  <FormControl>
                     <ControllerLabel title="Giới tính" />
                     <ControllerRadioGroup
                        sx={{ display: 'flex', alignItems: 'center' }}
                        name="gender"
                        options={[
                           { id: 'Nam', title: 'Nam' },
                           { id: 'Nữ', title: 'Nữ' },
                        ]}
                        valuePath="id"
                        titlePath="title"
                        control={control as unknown as Control<FieldValues>}
                        defaultValue="gender"
                     />
                  </FormControl>
               </Grid>
               <Grid item xs={12} md={3} minHeight="80px">
                  <Box height="65px">
                     <ControllerLabel title="Số tài khoản" required />
                     <ControllerTextField name="bank_account_number" number control={control} />
                  </Box>
               </Grid>
               <Grid item xs={12} md={3} minHeight="120px">
                  <Box height="65px">
                     <ControllerLabel title="Tên ngân hàng" required />
                     <ControllerTextField name="bank_name" control={control} />
                  </Box>
               </Grid>
               <Grid item xs={12} md={3} minHeight="120px">
                  <Box height="65px">
                     <ControllerLabel title="Chi nhánh" required />
                     <ControllerTextField name="bank_branch" control={control} />
                  </Box>
               </Grid>
               <Grid item xs={12} md={3} minHeight="120px">
                  <Box height="65px">
                     <ControllerLabel title="Tên Chủ Tài khoản" required />
                     <ControllerTextField name="account_holder_name" control={control} />
                  </Box>
               </Grid>
            </Grid>
         </PageContent>
      </BaseBreadcrumbs>
   );
};

export default ProfileUpdate;
