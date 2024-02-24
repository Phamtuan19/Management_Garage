/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Box, Typography, Button, Avatar, Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useAuth } from '@App/redux/slices/auth.slice';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import ROUTE_PATH from '@App/configs/router-path';
import { useQuery } from '@tanstack/react-query';
import roleService, { RoleResponseData } from '@App/services/role.service';
import { useNavigate, useParams } from 'react-router-dom';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { useState } from 'react';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import theme from '@Core/Theme';
import MODULE_PAGE from '@App/configs/module-page';

import RoleAccordionDetail from '../Role/component/RoleAccordionDetail';
import { ROLES, RolePropsTypeConfig } from '../Role/utils';

import ResetPassword from './ResetPassword';

const breadcrumbs = [
   {
      title: 'Người dùng',
      link: ROUTE_PATH.USER_PROFILE,
   },
];
const Profile = () => {
   const navigate = useNavigate();
   const [open, setOpen] = useState<boolean>(false);

   const { user } = useAuth();
   const userId = user?._id;
   const { data: userData } = useQuery(['getUser', userId], async () => {
      try {
         const roleRes = await roleService.get();
         const roleData = roleRes.data;

         const roleMatch = roleData?.data.filter((role: { _id: string | undefined }) => role._id === user?.role_id);

         return {
            ...user,
            role_id: roleMatch,
         };
      } catch (error) {
         return user;
      }
   });
   if (!user) {
      return <div>User not logged in</div>;
   }
   // const { id: roleId } = useParams();

   const { data: roleDetail } = useQuery<RoleResponseData, Error>(['getDetailRole'], async () => {
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
      const res = await roleService.find(user.role_id as string);
      return res.data as RoleResponseData;
   });

   return (
      <BaseBreadcrumbs breadcrumbs={breadcrumbs} arialabel="Thông tin tài khoản">
         <Grid
            container
            spacing={2}
            sx={{ mt: 3, bgcolor: '#FFFF', p: '0px 16px 16px 16px', borderRadius: 2, position: 'relative' }}
         >
            <Grid
               xs={2}
               md={6}
               sx={{ mt: 3, bgcolor: '#FFFF', p: '0px 16px 16px 16px', borderRadius: 2, position: 'relative' }}
            >
               <Box
                  width="100%"
                  textAlign={'center'}
                  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
               >
                  <Avatar
                     // src={user.avatar_url}
                     src={'http://toigingiuvedep.vn/wp-content/uploads/2021/05/anh-cute-dep-de-thuong-nhat.jpg'}
                     alt="User Avatar"
                     sx={{ width: 200, height: 200, marginBottom: 2, border: '1px solid gray' }}
                  />
                  <Typography variant="h6" gutterBottom>
                     Xin chào, {user.account_name}!
                  </Typography>
                  <Typography variant="body1" paragraph>
                     Họ tên: {user.full_name}
                  </Typography>
                  <Typography variant="body1" paragraph></Typography>

                  <Button
                     onClick={() => {
                        setOpen(true);
                     }}
                     endIcon={<SettingsOutlinedIcon />}
                  >
                     Đổi mật khẩu
                  </Button>
               </Box>
            </Grid>
            <Grid
               xs={2}
               md={4}
               sx={{ mt: 3, bgcolor: '#FFFF', p: '0px 16px 16px 16px', borderRadius: 2, position: 'relative' }}
            >
               <Box width="100%">
                  <Typography variant="body1" gutterBottom>
                     <strong>Thông tin cá nhân</strong>
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                     Mã nhân viên: #{user.code}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                     Chức vụ: {userData?.role_id[0]?.name || ''}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                     Giới tính: {user?.gender || ''}
                  </Typography>
                  <Typography variant="body1" paragraph>
                     Ngày sinh: {user.birth_day}
                  </Typography>
                  <Typography variant="body1" paragraph>
                     Email: {user.email}
                  </Typography>
                  <Typography variant="body1" paragraph>
                     Số điện thoại: {user.phone}
                  </Typography>
                  {/* <Typography variant="body1" gutterBottom>
                     Địa chỉ: {user?.address?.province?.name || ''}, {user?.address?.district?.name || ''},
                     {user?.address?.wards?.name || ''}, {user?.address?.specific || ''}
                  </Typography> */}
                  <Typography variant="body1" gutterBottom>
                     CCCD: {user.cccd_number}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                     Ngày nhận việc: {user.hire_date}
                  </Typography>

                  <Typography variant="body1" paragraph></Typography>
               </Box>
            </Grid>
            <Grid>
               <Button
                  variant="contained"
                  onClick={() => navigate(ROUTE_PATH.USER_PROFILE + '/' + userId + '/update')}
                  endIcon={<RateReviewRoundedIcon />}
                  color="primary"
                  sx={{ ml: '120px' }}
               ></Button>
            </Grid>
         </Grid>
         <ResetPassword
            open={open}
            handleClose={() => {
               setOpen(false);
            }}
         />
         {roleDetail && (
            <Stack>
               <Box sx={{ mt: 3.5, bgcolor: '#FFFF', p: '0px 16px 16px 16px', borderRadius: 2 }}>
                  <Typography
                     variant="h2"
                     sx={{
                        fontSize: '1rem',
                        py: '16px',
                        lineHeight: '20px',
                        fontWeight: 500,
                        borderBottom: '1px solid #E8EAEB',
                     }}
                  >
                     Chi tiết quyền
                     <Box component="span" ml={0.5} color="red">
                        *
                     </Box>
                  </Typography>
                  <Grid container spacing={2}>
                     <Grid md={12}>
                        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                           {ROLES.map((role: RolePropsTypeConfig, index: number) => {
                              return (
                                 <Box key={index} sx={{ borderBottom: '1px solid #E8EAEB' }}>
                                    <RoleAccordionDetail roleDetail={roleDetail} role={role} />
                                 </Box>
                              );
                           })}
                        </Box>
                     </Grid>
                  </Grid>
               </Box>
            </Stack>
         )}
      </BaseBreadcrumbs>
   );
};

export default Profile;
