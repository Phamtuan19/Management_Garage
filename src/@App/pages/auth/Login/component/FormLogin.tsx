import React from 'react';
import { Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import LoginIcon from '@mui/icons-material/Login';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import ControlLabel from '@Core/Component/Input/ControlLabel';
import ControlTextField from '@Core/Component/Input/ControlTextField';
import { useAuth } from '@App/redux/slices/auth.slice';
import TextFleidPassword from '@Core/Component/Input/ControlTextFieldPassword';
import { FormLoginProps, ValidationFormLogin } from '../utils/yup.validate';
import loginService from '@App/services/auth.service';

function FormLogin() {
   const { authLogin } = useAuth();

   const { handleSubmit, setError, control } = useForm<FormLoginProps>({
      resolver: yupResolver(ValidationFormLogin),
      defaultValues: {
         email: '',
         password: '',
      },
   });

   const handleSubmitForm: SubmitHandler<FormLoginProps> = async (data: FormLoginProps) => {
      try {
         const res = await loginService.login(data);
         console.log(res);
      } catch (error: any) {
         const message = error?.response.data.message;
         Object.keys(message).forEach((key) => {
            setError(key as 'email' | 'password', { type: 'password', message: message[key] });
         });
      }
   };

   return (
      <Box width="100%">
         <form onSubmit={handleSubmit(handleSubmitForm)}>
            <Box mb={1}>
               <ControlLabel title="Email" sx={{ width: '500px' }} />
               <ControlTextField name="email" control={control} />
            </Box>
            <Box mb={2}>
               <ControlLabel title="Mật khẩu" />
               <TextFleidPassword name="password" control={control} />
            </Box>
            <LoadingButton fullWidth variant="contained" type="submit" startIcon={<LoginIcon />}>
               Đăng nhập
            </LoadingButton>
         </form>
      </Box>
   );
}

export default React.memo(FormLogin);
