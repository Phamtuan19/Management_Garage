import { Box, Button, Paper, Stack, Typography, styled } from '@mui/material';
import FormRegister from './component/FormRegister';
import { Link } from 'react-router-dom';
import routePath from '@App/configs/routerPath';
import svg from '@App/assets/svg';
import LazyLoadingImage from '@App/component/customs/LazyLoadingImage';
import authService from '@App/services/auth.service';

const SOCIALS = [
   {
      id: 1,
      img: svg.google,
      title: 'Google',
   },
   {
      id: 2,
      img: svg.facebook,
      title: 'Facebook',
   },
];

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
         <WrapperBoxFormLogin elevation={2}>
            <Typography variant="h4" fontSize={32} mb={2} fontWeight={600}>
               Register and start studying
            </Typography>
            <FormRegister />
            <Stack width="100%" gap={2} direction="row" margin="12px 0">
               {SOCIALS.map((item, index) => (
                  <Button
                     key={index}
                     component={Link}
                     to=""
                     variant="outlined"
                     sx={{
                        width: '100%',
                        position: 'relative',
                        justifyContent: 'center',
                        padding: '10px 24px',
                        borderRadius: 10,
                        borderColor: '#dce0e3',
                     }}
                     startIcon={<LazyLoadingImage w="18px" h="18px" src={item.img} alt="" />}
                  >
                     {item.title}
                  </Button>
               ))}
            </Stack>
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
   padding: '32px 48px 24px 48px ',
   display: 'flex',
   gap: 12,
   alignItems: 'center',
   flexDirection: 'column',
   backgroundColor: theme.base.background.white,
   borderRadius: 10,
}));

export default Register;
