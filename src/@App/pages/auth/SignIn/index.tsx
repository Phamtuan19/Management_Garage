import { Box, Paper, Stack, Typography, styled } from '@mui/material';
import FormLogin from './component/FormLogin';

function SignIn() {
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
            <Typography variant="h4" fontWeight={600} mb={2}>
               Welcome back
            </Typography>
            <Box width={300}>
               <Stack width="100%" gap={2}>
                  <FormLogin />
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

export default SignIn;
