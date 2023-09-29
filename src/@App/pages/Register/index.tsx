import { Box, Divider, Paper, Stack, Typography, styled } from '@mui/material';
import FormRegister from './component/FormRegister';
import { Link } from 'react-router-dom';
import routePath from '@App/configs/routerPath';

function Register() {
   return (
      <Stack
         sx={{
            bgcolor: 'rgba(0,0,0,.04)',
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
         }}
      >
         <WrapperBoxFormLogin elevation={1}>
            <Typography variant="h5" fontWeight={600}>
               Đăng ký và bắt đầu học
            </Typography>
            <FormRegister />
            <Typography component="p" textAlign="center">
               Bạn đã có tài khoản? Hãy{' '}
               <Box
                  component={Link}
                  to={'/' + routePath.account.path + '/' + routePath.account.login}
                  sx={{
                     color: '#5624d0',
                     textDecoration: 'none',
                     '&:hover': {
                        textDecoration: 'revert',
                     },
                  }}
               >
                  đăng nhập
               </Box>
            </Typography>
         </WrapperBoxFormLogin>
      </Stack>
   );
}

const WrapperBoxFormLogin = styled(Paper)(({ theme }) => ({
   width: 'max-content',
   minWidth: 400,
   padding: '36px 24px',
   display: 'flex',
   gap: 24,
   alignItems: 'center',
   flexDirection: 'column',
   backgroundColor: theme.base.background.white,
   borderRadius: 10,
}));

export default Register;
