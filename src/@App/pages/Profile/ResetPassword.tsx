/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button, Typography, Box, Grid, Modal } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ControllerTextFieldPassword from '@Core/Component/Input/ControllerTextFieldPassword';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import { LoadingButton } from '@mui/lab';
import { useMutation } from '@tanstack/react-query';
import personnelService from '@App/services/personnel.service';
import { useAuth } from '@App/redux/slices/auth.slice';
import { errorMessage, successMessage } from '@Core/Helper/message';
import setErrorMessageHookForm from '@App/helpers/setErrorMessageHookForm';
import { HandleErrorApi } from '@Core/Api/axios-config';
import { AxiosError } from 'axios';

import { ResetPasswordType, resetPasswordSchema } from './utils/reset-password';
interface ResetPasswordPropsType {
   open: boolean;
   handleClose: () => void;
}
const ResetPassword = ({ open, handleClose }: ResetPasswordPropsType) => {
   const { user } = useAuth();
   const { handleSubmit, control, setError } = useForm<ResetPasswordType>({
      resolver: yupResolver(resetPasswordSchema),
      defaultValues: resetPasswordSchema.getDefault(),
   });
   const { mutate: handleUpdate, isLoading } = useMutation({
      mutationFn: async (data: ResetPasswordType) => {
         return await personnelService.changePassword(user?._id as string, {
            new_password: data.new_password,
            old_password: data.old_password,
         });
      },
      onSuccess: () => {
         successMessage('Cập nhật thành công');
         handleClose();
      },
      onError: (err: AxiosError) => {
         const dataError = err.response?.data as HandleErrorApi;
         setErrorMessageHookForm(setError, dataError.data);
         return errorMessage(err);
      },
   });
   const handlePasswordChange: SubmitHandler<ResetPasswordType> = (data) => handleUpdate(data);
   return (
      <Modal open={open}>
         <Box sx={style}>
            <Grid container spacing={2}>
               <Grid item xs={12}>
                  <Typography variant="h5">Thay đổi mật khẩu</Typography>
               </Grid>
               <Grid item xs={12}>
                  <Box sx={{ minHeight: '95px' }}>
                     <ControllerLabel required>Mật khẩu cũ</ControllerLabel>
                     <ControllerTextFieldPassword
                        name="old_password"
                        placeholder="Nhập vào mật khẩu cũ"
                        control={control}
                     />
                  </Box>
               </Grid>
               <Grid item xs={12}>
                  <Box sx={{ minHeight: '95px' }}>
                     <ControllerLabel required>Mật mới</ControllerLabel>
                     <ControllerTextFieldPassword
                        name="new_password"
                        placeholder="Nhập vào mật khẩu cũ"
                        control={control}
                     />
                  </Box>
               </Grid>
               <Grid item xs={12}>
                  <Box sx={{ minHeight: '95px' }}>
                     <ControllerLabel required>Nhập lại mật khẩu mới</ControllerLabel>
                     <ControllerTextFieldPassword
                        name="confirmPassword"
                        placeholder="Nhập vào mật khẩu cũ"
                        control={control}
                     />
                  </Box>
               </Grid>
            </Grid>
            <Grid item xs={12} mt="24px">
               <Box display="flex" justifyContent="flex-end" alignItems="center" gap="12px">
                  <Button onClick={handleClose} color="error">
                     Hủy
                  </Button>
                  <LoadingButton
                     type="submit"
                     variant="contained"
                     loading={isLoading}
                     onClick={handleSubmit(handlePasswordChange)}
                  >
                     Lưu
                  </LoadingButton>
               </Box>
            </Grid>
         </Box>
      </Modal>
   );
};
const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 500,
   bgcolor: 'background.paper',
   boxShadow: 24,
   borderRadius: '6px',
   p: 4,
};
export default ResetPassword;
