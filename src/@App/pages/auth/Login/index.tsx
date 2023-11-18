import { Box, Paper, Stack, Typography, styled } from '@mui/material';

import { Link } from 'react-router-dom';
import FormLogin from './component/FormLogin';
import ROUTE_PATH from '@App/configs/router-path';

function Login() {
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
            <Typography variant="h4" fontWeight={600}>
               Welcome back
            </Typography>
            <Box component="p">Enter your Untitled account details</Box>
            <Box width={300}>
               <Stack width="100%" gap={2}>
                  <FormLogin />
                  <Typography component="p" textAlign="center">
                     Bạn không có tài khoản? Hãy{' '}
                     <Box
                        component={Link}
                        to={'/' + ROUTE_PATH.REGISTER}
                        sx={{
                           color: '#5624d0',
                           textDecoration: 'none',
                           '&:hover': {
                              textDecoration: 'revert',
                           },
                        }}
                     >
                        đăng ký
                     </Box>
                  </Typography>
               </Stack>
            </Box>
         </WrapperBoxFormLogin>
      </Stack>
   );
}

const WrapperBoxFormLogin = styled(Paper)(({ theme }) => ({
   width: 'max-content',
   minWidth: 400,
   padding: '36px 24px',
   display: 'flex',
   alignItems: 'center',
   flexDirection: 'column',
   backgroundColor: theme.base.background.white,
   borderRadius: 10,
}));

export default Login;
