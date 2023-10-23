import React, { useState } from 'react';
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
import { successMessage } from '@Core/Helper/message';
import useLocalStorage from '@App/hooks/useLocalStorage';

function FormLogin() {
   const { setLocalStorage } = useLocalStorage();
   const { authLogin } = useAuth();
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const { handleSubmit, setError, setValue, reset, control } = useForm<FormLoginProps>({
      resolver: yupResolver(ValidationFormLogin),
      defaultValues: {
         email: '',
         password: '',
      },
   });

   const handleSubmitForm: SubmitHandler<FormLoginProps> = async (data: FormLoginProps) => {
      setIsLoading(true);
      try {
         const res = await loginService.login(data);
         console.log(res.data.token);
         localStorage.setItem(import.meta.env.VITE_AUTH_TOKEN, res.data.token);
         authLogin(res.data.data);
         const message = (res.data && res.data.message) || 'Đăng nhập thành công.';
         successMessage(message);
         reset();
      } catch (error: any) {
         setError('email', {
            type: 'error',
            message: error.response.data.message,
         });
         setValue('password', '');
      }
      setIsLoading(false);
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
            <LoadingButton fullWidth variant="contained" type="submit" startIcon={<LoginIcon />} loading={isLoading}>
               Đăng nhập
            </LoadingButton>
         </form>
      </Box>
   );
}

export default React.memo(FormLogin);
