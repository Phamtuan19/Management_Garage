/* eslint-disable @typescript-eslint/no-misused-promises */
import { Control, FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { Box, FormControl, Grid } from '@mui/material';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';
import ControllerAutoComplate from '@Core/Component/Input/ControllerAutoComplate';
import { useQuery } from '@tanstack/react-query';
import roleService from '@App/services/role.service';
import ControllerRadioGroup from '@Core/Component/Input/ControllerRadioGroup';
import { LoadingButton } from '@mui/lab';

import { ValidationFormCreate } from '../utils/personnel.schema';
interface UpdatePersonnelForm {
   form: UseFormReturn<ValidationFormCreate>;
   isLoading: boolean;
   onSubmitForm: SubmitHandler<ValidationFormCreate>;
}
const UpdatePersonnelForm = ({ form, isLoading, onSubmitForm }: UpdatePersonnelForm) => {
   const { handleSubmit, control } = form;
   const { data: roles } = useQuery(['getAllRole'], async () => {
      const res = await roleService.fieldAll();
      return res.data;
   });
   return (
      <Box component="form" sx={{ pb: 3, pt: 1 }} onSubmit={handleSubmit(onSubmitForm)}>
         <LoadingButton type="submit" variant="contained" loading={isLoading}>
            Cập nhật
         </LoadingButton>
         <Box sx={{ mt: 2, bgcolor: '#FFFF', p: 2, borderRadius: 2 }}>
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
               <Grid item md={3}>
                  <FormControl>
                     <ControllerLabel title="Giới tính" />
                     <ControllerRadioGroup
                        sx={{ display: 'flex', alignItems: 'center' }}
                        name="gender"
                        options={[
                           { id: 'Nam', title: 'Nam' },
                           { id: 'Nữ', title: 'Nữ' },
                        ]}
                        valuePath="id"
                        titlePath="title"
                        control={control as unknown as Control<FieldValues>}
                        defaultValue="gender"
                     />
                  </FormControl>
               </Grid>
               <Grid item xs={12} md={6}>
                  <Box height="65px">
                     <ControllerLabel title="CCCD " required />
                     <ControllerTextField name="cccd_number" control={control} placeholder="Căn cước công dân" />
                  </Box>
               </Grid>
            </Grid>
         </Box>
      </Box>
   );
};
export default UpdatePersonnelForm;
