import LazyLoadingImage from '@App/component/customs/LazyLoadingImage';
import { Box, Button, Divider, Paper, Stack, Typography, styled } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';

import { Link } from 'react-router-dom';
import FormLogin from './component/FormLogin';
import routePath from '@App/configs/routerPath';

const SOCIALS = [
   {
      img: GoogleIcon,
      title: 'Log in with Google',
   },
   {
      img: GitHubIcon,
      title: 'Log in with Github',
   },
];

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
                  {SOCIALS.map((item, index) => {
                     const Comp = item.img;
                     return (
                        <Button
                           key={index}
                           variant="outlined"
                           sx={{
                              position: 'relative',
                              justifyContent: 'center',
                              padding: '10px',
                              borderRadius: 10,
                              borderColor: '#dce0e3',
                           }}
                           startIcon={<Comp />}
                        >
                           <Typography component="span" color="#35414c" fontSize={16} fontWeight={500}>
                              {item.title}
                           </Typography>
                        </Button>
                     );
                  })}

                  <Divider sx={{ my: 1, opacity: 0.5, fontWeight: 'medium' }}>Hoặc</Divider>

                  <FormLogin />

                  <Typography component="p" textAlign="center">
                     Bạn không có tài khoản? Hãy{' '}
                     <Box
                        component={Link}
                        to={'/' + routePath.account.path + '/' + routePath.account.register}
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
