import ControlLabel from '@Core/Component/Input/ControlLabel';
import ControlTextField from '@Core/Component/Input/ControlTextField';
import { LoadingButton } from '@mui/lab';
import { Grid, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';

import TextFleidPassword from '@Core/Component/Input/ControlTextFieldPassword';
import { FormRegisterProps, validationFormRegister } from '../utils';
import { yupResolver } from '@hookform/resolvers/yup';
import authService from '@App/services/auth.service';
import setErrorMessageHookForm from '@App/helpers/setErrorMessageHookForm';
import { useState } from 'react';

function FormRegister() {
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const { handleSubmit, setError, setValue, reset, control } = useForm<FormRegisterProps>({
      resolver: yupResolver(validationFormRegister),
      defaultValues: {
         lastName: '',
         firstName: '',
         email: '',
         password: '',
      },
   });

   const onSubmitForm = async (data: FormRegisterProps) => {
      setIsLoading(true);
      try {
         await authService.register(data);
         // const message = res.data && res.data.message ? res.data.message : '';
         // setToastMessage({ message: message, status: 'success' });
         reset();
      } catch (error: any) {
         setErrorMessageHookForm(setError, error.response.data.message);
         setValue('password', '');
      }
      setIsLoading(false);
   };

   return (
      <Stack width="100%" maxWidth={400} gap={2}>
         <form onSubmit={handleSubmit(onSubmitForm)} style={{ width: '100%' }}>
            <Grid container spacing={1}>
               <Grid item xs={6}>
                  <ControlLabel title="Họ" />
                  <ControlTextField name="lastName" control={control} />
               </Grid>
               <Grid item xs={6}>
                  <ControlLabel title="Tên" />
                  <ControlTextField name="firstName" control={control} />
               </Grid>
               <Grid item xs={12}>
                  <ControlLabel title="Email" />
                  <ControlTextField name="email" control={control} />
               </Grid>
               <Grid item xs={12}>
                  <ControlLabel title="Mật khẩu" />
                  <TextFleidPassword name="password" control={control} />
               </Grid>
               <Grid item xs={12} sx={{ mt: 2 }}>
                  <LoadingButton type="submit" fullWidth variant="contained" loading={isLoading}>
                     Đăng ký
                  </LoadingButton>
               </Grid>
            </Grid>
         </form>
      </Stack>
   );
}

export default FormRegister;
