import ControlLabel from '@Core/Component/Input/ControlLabel';
import ControlTextField from '@Core/Component/Input/ControlTextField';
import { LoadingButton } from '@mui/lab';
import { Grid, Stack } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import TextFleidPassword from '@Core/Component/Input/ControlTextFieldPassword';


const schemaValidator = yup.object({
   lastName: yup.string().required('Họ không được để trống'),
   firstName: yup.string().required('Tên không được để trống'),
   email: yup.string().required('Email không được để trống'),
   password: yup.string().required('Mật khẩu không được để trống'),
});

type FormRegisterProps = yup.InferType<typeof schemaValidator>;

function FormRegister() {
   const { handleSubmit, control } = useForm<FormRegisterProps>({
      resolver: yupResolver(schemaValidator),
      defaultValues: {
         lastName: '',
         firstName: '',
         email: '',
         password: '',
      },
   });

   const onSubmitForm = async (data: FormRegisterProps) => {
      console.log(data);
   };

   return (
      <Stack width="100%" maxWidth={300} gap={2}>
         <form onSubmit={handleSubmit(onSubmitForm)}>
            <Grid container spacing={2}>
               <Grid item xs={12}>
                  <ControlLabel title="Họ" />
                  <ControlTextField name="lastName" control={control} />
               </Grid>
               <Grid item xs={12}>
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
                  <LoadingButton type="submit" fullWidth variant="contained" loading={false}>
                     Đăng ký
                  </LoadingButton>
               </Grid>
            </Grid>
         </form>
      </Stack>
   );
}

export default FormRegister;
