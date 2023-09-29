import { Box } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import LoginIcon from '@mui/icons-material/Login';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import ControlLabel from '@Core/Component/Input/ControlLabel';
import ControlTextField from '@Core/Component/Input/ControlTextField';
import React from 'react';

const ValidationFormLogin = yup.object({
   email: yup.string().required(),
   password: yup.string().required().min(6),
});

type FormLoginProps = yup.InferType<typeof ValidationFormLogin>;

function FormLogin() {
   const { handleSubmit, control } = useForm<FormLoginProps>({
      resolver: yupResolver(ValidationFormLogin),
      defaultValues: {
         email: '',
         password: '',
      },
   });

   const onSubmitForm = (data: FormLoginProps) => {
      console.log(data);
   };

   return (
      <Box width="100%">
         <form onSubmit={handleSubmit(onSubmitForm)}>
            <Box mb={1}>
               <ControlLabel title="Email" />
               <ControlTextField name="email" control={control} />
            </Box>
            <Box mb={2}>
               <ControlLabel title="Mật khẩu" />
               <ControlTextField name="password" control={control} />
            </Box>
            <LoadingButton fullWidth variant="contained" type="submit" startIcon={<LoginIcon />}>
               Đăng nhập
            </LoadingButton>
         </form>
      </Box>
   );
}
export default React.memo(FormLogin);
