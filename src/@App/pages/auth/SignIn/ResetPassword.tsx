import { useState } from 'react';
import { Button, TextField, Typography, Box, Grid } from '@mui/material';
import { styled } from '@mui/system';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import ROUTE_PATH from '@App/configs/router-path';

import { ResetpassSchema } from './utils/customer.schema';

const breadcrumbs = [
   {
      title: 'Người dùng',
      link: ROUTE_PATH.USER_PROFILE,
   },
];

const StyledContainer = styled(Grid)({
   mt: 3,
   bgcolor: '#FFFF',
   p: '16px 16px 16px 16px',
   borderRadius: 2,
   position: 'relative',
   justifyContent: 'center',
});

const ResetPassword = () => {
   const [oldPassword, setOldPassword] = useState('');
   const [newPassword, setNewPassword] = useState('');
   const [confirmPassword, setConfirmPassword] = useState('');

   const handlePasswordChange = () => {
      ResetpassSchema.validateSync({
         oldPassword,
         newPassword,
         confirmPassword,
      });
   };

   return (
      <BaseBreadcrumbs
         breadcrumbs={breadcrumbs}
         arialabel="Thay đổi mật khẩu"
         sx={({ base }) => ({ bgcolor: base.background.default, border: 'none', p: '10px' })}
      >
         <Grid
            container
            spacing={2}
            sx={{
               mt: 3,
               bgcolor: '#FFFF',
               p: '0px 16px 16px 0px',
               borderRadius: 2,
               position: 'relative',
            }}
         >
            <StyledContainer container spacing={2}>
               <form onSubmit={handlePasswordChange}>
                  <Box
                     component="form"
                     sx={{
                        width: '500px',
                        marginTop: '20px',
                     }}
                  >
                     <Typography variant="h5" gutterBottom>
                        Thay Đổi Mật Khẩu
                     </Typography>
                     <TextField
                        label="Mật khẩu cũ"
                        type="password"
                        value={oldPassword}
                        onChange={(e) => setOldPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                     />
                     <TextField
                        label="Mật khẩu mới"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                     />
                     <TextField
                        label="Xác nhận mật khẩu"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                     />
                     <Button variant="contained" onClick={handlePasswordChange} sx={{ marginTop: '20px' }}>
                        Thay Đổi Mật Khẩu
                     </Button>
                  </Box>
               </form>
            </StyledContainer>
         </Grid>
      </BaseBreadcrumbs>
   );
};

export default ResetPassword;
