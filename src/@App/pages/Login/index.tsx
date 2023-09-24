import svg from '@App/assets/svg';
import LazyLoadingImage from '@App/component/customs/LazyLoadingImage';
import { Box, Button, Stack, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

function Login() {
   return (
      <Stack sx={{ height: '100vh', justifyContent: 'center', alignItems: 'center' }}>
         <Box sx={{ width: 'max-content', padding: '24px' }}>
            <Box>
               <Typography variant="h4" fontWeight={600}>
                  Welcome back
               </Typography>
               <Box component="p">Enter your Untitled account details</Box>
            </Box>
            <Stack>
               <Button component={NavLink} to="" sx={{ display: 'flex', gap: 3, padding: '10px 0' }}>
                  <LazyLoadingImage w="24px" h="24px" src={svg.google} alt="" />
                  <Typography component="span">Log in with Google</Typography>
               </Button>
               <NavLink to="">
                  <Typography component="span">Log in with Facebook</Typography>
               </NavLink>
            </Stack>
         </Box>
      </Stack>
   );
}

export default Login;
