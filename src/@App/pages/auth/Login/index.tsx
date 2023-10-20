import svg from '@App/assets/svg';
import LazyLoadingImage from '@App/component/customs/LazyLoadingImage';
import { Box, Button, Divider, Paper, Stack, Typography, styled } from '@mui/material';
import { redirect } from 'react-router-dom';

import { Link } from 'react-router-dom';
import FormLogin from './component/FormLogin';
import routePath from '@App/configs/routerPath';
import loginService from '@App/services/auth.service';

const SOCIALS = [
   {
      img: svg.google,
      title: 'Log in with Google',
      href: '/api/account/google/login',
   },
   {
      img: svg.facebook,
      title: 'Log in with Facebook',
      href: '',
   },
];

function Login() {
   const handleApiLoginGoogle = async () => {
      const rest = await loginService.loginGoogle();
      console.log(rest.data.url);
      return redirect(rest.data.url);
   };

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
                  {SOCIALS.map((item, index) => (
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
                        startIcon={
                           <Box position="absolute" top="50%" left="30px" style={{ transform: 'translateY(-41%)' }}>
                              <LazyLoadingImage w="18px" h="18px" src={item.img} alt="" />
                           </Box>
                        }
                        onClick={handleApiLoginGoogle}
                     >
                        <Typography component="span" color="#35414c" fontSize={16} fontWeight={500}>
                           {item.title}
                        </Typography>
                     </Button>
                  ))}

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
