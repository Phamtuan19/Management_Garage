/* eslint-disable @typescript-eslint/naming-convention */
import { Box, Typography, Button, Avatar, Stack, Grid } from '@mui/material';
import { useAuth } from '@App/redux/slices/auth.slice';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import ROUTE_PATH from '@App/configs/router-path';
import { useQuery } from '@tanstack/react-query';
import roleService, { RoleResponseData } from '@App/services/role.service';
import { useNavigate } from 'react-router-dom';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import React, { useMemo, useState } from 'react';
import theme from '@Core/Theme';
import PageContent from '@App/component/customs/PageContent';
import formatDateTime from '@Core/Helper/formatDateTime';
import personnelService, { IPersonnel } from '@App/services/personnel.service';

import RoleAccordionDetail from '../Role/component/RoleAccordionDetail';
import { ROLES, RolePropsTypeConfig } from '../Role/utils';

import ResetPassword from './ResetPassword';

const Profile = () => {
   const navigate = useNavigate();
   const [open, setOpen] = useState<boolean>(false);

   const { user } = useAuth();
   // const userId = user?._id;

   const { data: personnel } = useQuery(['getPersonnelDetails', user?._id], async () => {
      const personnelRes = await personnelService.find(user?._id as string);
      return personnelRes.data[0] as IPersonnel;
   });

   const { data: roleDetail } = useQuery<RoleResponseData, Error>(['getDetailRole'], async () => {
      const res = await roleService.find(user?.role_id as string);
      return res.data as RoleResponseData;
   });
   const dataInfoUser = useMemo(() => {
      return [
         {
            title: 'Mã nhân viên:',
            value: personnel?.code,
         },
         {
            title: 'Giới tính:',
            value: personnel?.gender,
         },
         {
            title: 'Giới tính:',
            value: personnel?.full_name,
         },
         {
            title: 'Ngày sinh:',
            value: personnel?.birth_day && formatDateTime(personnel?.birth_day),
         },
         {
            title: 'Số điện thoại:',
            value: personnel?.phone,
         },
         {
            title: 'CCCD:',
            value: personnel?.cccd_number,
         },
         {
            title: 'Email:',
            value: personnel?.email,
         },
         {
            title: 'Số tài khoản:',
            value: personnel?.bank_account_number,
         },
         {
            title: 'Chức vụ:',
            value: personnel?.role_id.name,
         },
         {
            title: 'Tên ngân hàng:',
            value: personnel?.bank_name,
         },
      ];
   }, [personnel]);

   return (
      <BaseBreadcrumbs arialabel="Thông tin tài khoản">
         <Box display="flex" gap={1.5}>
            <Button
               variant="contained"
               onClick={() => navigate(ROUTE_PATH.USER_PROFILE + '/update')}
               color="primary"
               startIcon={<RateReviewRoundedIcon />}
            >
               Sửa thông tin
            </Button>
            <Button
               onClick={() => {
                  setOpen(true);
               }}
               endIcon={<SettingsOutlinedIcon />}
            >
               Đổi mật khẩu
            </Button>
         </Box>
         <PageContent>
            <Grid container spacing={4}>
               <Grid item xs={3}>
                  <Stack alignItems="center">
                     <Avatar
                        src={user?.avatar_url}
                        alt="User Avatar"
                        sx={{ width: 200, height: 200, marginBottom: 2 }}
                     />
                     <Typography variant="h6" gutterBottom>
                        Xin chào, {user?.account_name}!
                     </Typography>
                  </Stack>
               </Grid>
               <Grid item xs={9}>
                  <Typography variant="h6" gutterBottom>
                     Thông tin cá nhân
                  </Typography>
                  <Grid container spacing={1} columnSpacing={4}>
                     {dataInfoUser.map((info, index) => (
                        <Grid item xs={6} key={index}>
                           <Grid container spacing={1}>
                              <Grid item xs={4} sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                 <Typography
                                    sx={{ fontSize: '1rem', lineHeight: '2.2rem', color: theme.palette.grey[800] }}
                                 >
                                    {info.title}
                                 </Typography>
                              </Grid>
                              <Grid item xs={8}>
                                 <Typography
                                    sx={{
                                       p: 1,
                                       pb: 0,
                                       fontWeight: '500',
                                       flexGrow: 1,
                                       fontSize: '1rem',
                                       lineHeight: '2rem',
                                       minHeight: '40px',
                                    }}
                                 >
                                    {info.value}
                                 </Typography>
                                 <Box sx={{ borderBottom: '1px solid #DADADA' }}></Box>
                              </Grid>
                           </Grid>
                        </Grid>
                     ))}
                  </Grid>
               </Grid>
            </Grid>
         </PageContent>
         {roleDetail && (
            <PageContent>
               <Grid container spacing={2}>
                  <Grid item md={12}>
                     <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        {ROLES.map((role: RolePropsTypeConfig, index: number) => {
                           return (
                              <React.Fragment key={index}>
                                 <RoleAccordionDetail roleDetail={roleDetail} role={role} />
                                 <Box sx={{ mx: 0.5, borderBottom: '1px solid #E8EAEB' }}></Box>
                              </React.Fragment>
                           );
                        })}
                     </Box>
                  </Grid>
               </Grid>
            </PageContent>
         )}

         <ResetPassword
            open={open}
            handleClose={() => {
               setOpen(false);
            }}
         />
      </BaseBreadcrumbs>
   );
};

export default Profile;
