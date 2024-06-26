/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-misused-promises */
import React from 'react';
import { Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import LoginIcon from '@mui/icons-material/Login';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@App/redux/slices/auth.slice';
import authService from '@App/services/auth.service';
import { successMessage } from '@Core/Helper/message';
import { useMutation } from '@tanstack/react-query';
import ControllerTextFieldPassword from '@Core/Component/Input/ControllerTextFieldPassword';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';

import { FormLoginProps, validationFormLogin } from '../utils/yup.validate';

function FormLogin() {
   const { authLogin } = useAuth();
   const { handleSubmit, setError, setValue, reset, control } = useForm<FormLoginProps>({
      resolver: yupResolver(validationFormLogin),
      defaultValues: validationFormLogin.getDefault(),
   });

   const { mutate: handleLogin, isLoading } = useMutation({
      mutationFn: async (data: FormLoginProps) => {
         const res = await authService.login(data);
         return res.data;
      },
      onSuccess: (response) => {
         localStorage.setItem(import.meta.env.VITE_AUTH_TOKEN, response.token);
         authLogin(response);
         const message = (response && response.message) || 'Đăng nhập thành công.';
         successMessage(message);
         reset();
      },
      onError: (error: any) => {
         setError('user_name', {
            type: 'error',
            message: error.response.data.message,
         });
         setValue('password', '');
      },
   });

   const handleSubmitForm: SubmitHandler<FormLoginProps> = async (data: FormLoginProps) => handleLogin(data);

   return (
      <Box width="100%">
         <form onSubmit={handleSubmit(handleSubmitForm)}>
            <Box mb={1}>
               <ControllerLabel title="Email" sx={{ width: '500px' }} />
               <ControllerTextField name="user_name" control={control} />
            </Box>
            <Box mb={2}>
               <ControllerLabel title="Mật khẩu" />
               <ControllerTextFieldPassword name="password" control={control} />
            </Box>
            <LoadingButton fullWidth variant="contained" type="submit" startIcon={<LoginIcon />} loading={isLoading}>
               Đăng nhập
            </LoadingButton>
         </form>
      </Box>
   );
}

export default React.memo(FormLogin);
