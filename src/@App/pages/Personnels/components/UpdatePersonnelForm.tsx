import { UseFormReturn } from 'react-hook-form';
import { Box, Grid } from '@mui/material';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';
import ControllerAutoComplate from '@Core/Component/Input/ControllerAutoComplate';
import { useQuery } from '@tanstack/react-query';
import roleService from '@App/services/role.service';

import { ValidationFormCreate } from '../utils/personnel.schema';
interface UpdatePersonnelForm {
   form: UseFormReturn<ValidationFormCreate>;
}

const UpdatePersonnelForm = ({ form }: UpdatePersonnelForm) => {
   const { control } = form;

   const { data: roles } = useQuery(['getAllRole'], async () => {
      const res = await roleService.fieldAll();
      return res.data;
   });

   return (
      <Box component="form" sx={{ pb: 3, pt: 1 }}>
         <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
               <Box height="65px">
                  <ControllerLabel title="Họ và tên" required />
                  <ControllerTextField name="full_name" control={control} placeholder="Họ và tên" />
               </Box>
            </Grid>
            <Grid item xs={12} md={6}>
               <Box height="65px">
                  <ControllerLabel title="Chức vụ" required />
                  <ControllerAutoComplate
                     options={roles ?? []}
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
                  <ControllerLabel title="Ngày sinh " required />
                  <ControllerTextField name="birth_day" control={control} placeholder="Ngày sinh" />
               </Box>
            </Grid>
            <Grid item xs={12} md={6}>
               <Box height="65px">
                  <ControllerLabel title="CCCD " required />
                  <ControllerTextField name="cccd_number" control={control} placeholder="Căn cước công dân" />
               </Box>
            </Grid>
         </Grid>
      </Box>
   );
};
export default UpdatePersonnelForm;
