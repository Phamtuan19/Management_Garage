import { UseFormReturn } from 'react-hook-form';
import { Box, Grid } from '@mui/material';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';
import ControllerTextFieldPassword from '@Core/Component/Input/ControllerTextFieldPassword';
import ControllerAutoComplate from '@Core/Component/Input/ControllerAutoComplate';
import { useQuery } from '@tanstack/react-query';
import roleService from '@App/services/role.service';

import { ValidationFormCreate } from '../utils/personnel.schema';
import { positions } from '../utils';
interface BaseFormPersonnelPropType {
   form: UseFormReturn<ValidationFormCreate>;
}

const BaseFormPersonnel = ({ form }: BaseFormPersonnelPropType) => {
   const { control } = form;

   const { data: roles } = useQuery(['getAllRole'], async () => {
      const res = await roleService.fieldAll();
      return res.data;
   });

   return (
      <Box component="form" sx={{ pb: 3, pt: 1 }}>
         <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
               <Box height="65px">
                  <ControllerLabel title="Họ và tên" required />
                  <ControllerTextField name="full_name" control={control} placeholder="Họ và tên" />
               </Box>
            </Grid>
            <Grid item xs={12} md={4}>
               <Box height="65px">
                  <ControllerLabel title="Vị trí" required />
                  <ControllerAutoComplate
                     options={positions}
                     valuePath="key"
                     titlePath="label"
                     name="position"
                     control={control}
                  />
               </Box>
            </Grid>
            <Grid item xs={12} md={4}>
               <Box height="65px">
                  <ControllerLabel title="Vai trò" required />
                  <ControllerAutoComplate
                     options={(roles as never) ?? []}
                     valuePath="_id"
                     titlePath="name"
                     name="role_id"
                     control={control}
                  />
               </Box>
            </Grid>
            <Grid item xs={12} md={6}>
               <Box height="65px">
                  <ControllerLabel title="Email" required />
                  <ControllerTextField name="email" control={control} placeholder="Email" />
               </Box>
            </Grid>
            <Grid item xs={12} md={6}>
               <Box height="65px">
                  <ControllerLabel title="Số điện thoại" required />
                  <ControllerTextField name="phone" control={control} placeholder="Số điện thoại" />
               </Box>
            </Grid>
            <Grid item xs={12} md={6}>
               <Box height="65px">
                  <ControllerLabel title="Tài khoản đăng nhập" required />
                  <ControllerTextField name="account_name" control={control} placeholder="Tài khoản đăn nhập" />
               </Box>
            </Grid>
            <Grid item xs={12} md={6}>
               <Box height="65px">
                  <ControllerLabel title="Mật khẩu" required />
                  <ControllerTextFieldPassword name="password" control={control} placeholder="Mật khẩu" />
               </Box>
            </Grid>
         </Grid>
      </Box>
   );
};
export default BaseFormPersonnel;
