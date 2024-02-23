/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Box, Typography, Button, Avatar } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useAuth } from '@App/redux/slices/auth.slice';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import ROUTE_PATH from '@App/configs/router-path';
import { useQuery } from '@tanstack/react-query';
import roleService from '@App/services/role.service';
import { useNavigate } from 'react-router-dom';
import RateReviewRoundedIcon from '@mui/icons-material/RateReviewRounded';

const breadcrumbs = [
   {
      title: 'Người dùng',
      link: ROUTE_PATH.USER_PROFILE,
   },
];
const Profile = () => {
   const navigate = useNavigate();
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
   return (
      <BaseBreadcrumbs
         breadcrumbs={breadcrumbs}
         arialabel="Thông tin tài khoản"
         sx={({ base }) => ({ bgcolor: base.background.default, border: 'none', p: 0 })}
      >
         <Grid
            container
            spacing={2}
            sx={{ mt: 3, bgcolor: '#FFFF', p: '0px 16px 16px 16px', borderRadius: 2, position: 'relative' }}
         >
            <Grid
               xs={2}
               md={4}
               sx={{ mt: 3, bgcolor: '#FFFF', p: '0px 16px 16px 16px', borderRadius: 2, position: 'relative' }}
            >
               <Box
                  width="100%"
                  textAlign={'center'}
                  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
               >
                  <Avatar
                     src={user.avatar_url}
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
                     variant="contained"
                     onClick={() => navigate(ROUTE_PATH.USER_PROFILE + '/' + userId + '/update')}
                     endIcon={<RateReviewRoundedIcon />}
                     color="primary"
                     sx={{ width: 200 }}
                  >
                     Edit your profile
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
                  <Typography variant="body1" gutterBottom>
                     Địa chỉ: {user?.address?.province?.name || ''}, {user?.address?.district?.name || ''},
                     {user?.address?.wards?.name || ''}, {user?.address?.specific || ''}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                     CCCD: {user.cccd_number}
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                     Ngày nhận việc: {user.hire_date}
                  </Typography>

                  <Typography variant="body1" paragraph></Typography>
               </Box>
            </Grid>
            <Grid
               xs={2}
               md={4}
               sx={{ mt: 3, bgcolor: '#FFFF', p: '0px 16px 16px 16px', borderRadius: 2, position: 'relative' }}
            >
               <Typography variant="body1" gutterBottom>
                  <strong>Chi tiết quyền</strong>
               </Typography>
            </Grid>
         </Grid>
      </BaseBreadcrumbs>
   );
};

export default Profile;
