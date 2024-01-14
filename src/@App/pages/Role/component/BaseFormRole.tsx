/* eslint-disable @typescript-eslint/no-misused-promises */
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';
import { Box, Grid, Typography } from '@mui/material';
import { Control, FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';

import { ValidationFormCreate } from '../utils/role.schema';
import { ROLES } from '../utils';

import RoleAccordionForm from './RoleAccordionForm';

interface BaseFormRolePropType {
   form: UseFormReturn<ValidationFormCreate>;
   isLoading: boolean;
   update?: boolean;
   onSubmitForm: SubmitHandler<ValidationFormCreate>;
}

const BaseFormRole = ({ form, onSubmitForm, update = false, isLoading }: BaseFormRolePropType) => {
   const { control, handleSubmit } = form;

   return (
      <form onSubmit={handleSubmit(onSubmitForm)}>
         <Box>
            <LoadingButton type="submit" variant="contained" loading={isLoading}>
               {update ? 'thêm mới' : 'Cập nhật'}
            </LoadingButton>
         </Box>
         <Box sx={{ mt: 2, bgcolor: '#FFFF', p: 2, borderRadius: 2 }}>
            <Grid container spacing={2}>
               <Grid item md={6}>
                  <Box sx={{ minHeight: '80px' }}>
                     <ControllerLabel title="Tên vai trò" required />
                     <ControllerTextField name="name" control={control} />
                  </Box>
               </Grid>
               <Grid item md={6}>
                  <Box sx={{ minHeight: '80px' }}>
                     <ControllerLabel title="Mô tả" />
                     <ControllerTextField name="describe" control={control} />
                  </Box>
               </Grid>
            </Grid>
         </Box>
         <Box sx={{ mt: 3.5, bgcolor: '#FFFF', p: '0px 16px 16px 16px', borderRadius: 2 }}>
            <Typography
               variant="h2"
               sx={{
                  fontSize: '1rem',
                  py: '16px',
                  lineHeight: '20px',
                  fontWeight: 500,
                  borderBottom: '1px solid #E8EAEB',
               }}
            >
               Chi tiết vai trò
               <Box component="span" ml={0.5} color="red">
                  *
               </Box>
            </Typography>
            <Grid container spacing={2}>
               <Grid item md={12}>
                  <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                     {ROLES.map((role, index) => {
                        return (
                           <Box key={index} sx={{ borderBottom: '1px solid #E8EAEB' }}>
                              <RoleAccordionForm
                                 role={role}
                                 name="permission"
                                 control={control as unknown as Control<FieldValues>}
                              />
                           </Box>
                        );
                     })}
                  </Box>
               </Grid>
            </Grid>
         </Box>
      </form>
   );
};

export default BaseFormRole;
