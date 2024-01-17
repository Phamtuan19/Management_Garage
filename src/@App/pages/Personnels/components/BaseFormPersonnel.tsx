/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Control, FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { Box, FormControl, Grid, Stack } from '@mui/material';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';
import ControllerSelect from '@Core/Component/Input/ControllerSelect';
import { LoadingButton } from '@mui/lab';
import ControllerRadioGroup from '@Core/Component/Input/ControllerRadioGroup';
import ControllerTextFieldPassword from '@Core/Component/Input/ControllerTextFieldPassword';

import { ValidationFormCreate } from '../utils/personnel.schema';
import { GENDERS, POSITION } from '../utils/contants';

interface BaseFormPersonnelPropType {
   form: UseFormReturn<ValidationFormCreate>;
   isLoading: boolean;
   onSubmitForm: SubmitHandler<ValidationFormCreate>;
}

const BaseFormPersonnel = ({ form, onSubmitForm, isLoading }: BaseFormPersonnelPropType) => {
   const { control, handleSubmit, watch } = form;
   return (
      <form onSubmit={handleSubmit(onSubmitForm)}>
         <Stack position="relative" pb={6}>
            <Grid container spacing={12} px={5} pt={3}>
               <Grid item xs={6} md={5} display="flex" flexDirection="column" rowGap={2}>
                  <Grid item>
                     <ControllerLabel title="Account Name" required />
                     <ControllerTextField name="account_name" control={control} placeholder="Tên tài khoản?" />
                  </Grid>
                  <Grid item>
                     <ControllerLabel title="Full Name" required />
                     <ControllerTextField name="full_name" control={control} placeholder="Họ và tên?" />
                  </Grid>
                  <Grid item>
                     <ControllerLabel title="Password" required />
                     <ControllerTextFieldPassword name="password" control={control} placeholder='Mật khẩu?'/>
                  </Grid>
                  <Grid item>
                     <ControllerLabel title="Email" required />
                     <ControllerTextField name="email" control={control} placeholder="Email?" />
                  </Grid>
                  <Grid item>
                     <ControllerLabel title="Phone" required />
                     <ControllerTextField name="phone" control={control} placeholder="Số điện thoại?" />
                  </Grid>
               </Grid>

               <Grid item xs={6} md={5} display="flex" flexDirection="column" rowGap={2}>
                  <Grid item>
                     <FormControl>
                        <ControllerLabel title="Giới tính" required />
                        <ControllerRadioGroup
                           sx={{ display: 'flex' }}
                           name="gender"
                           options={GENDERS}
                           valuePath="id"
                           titlePath="title"
                           control={control as unknown as Control<FieldValues>}
                        />
                     </FormControl>
                  </Grid>
                  <Grid item md={12} sx={{ flexBasis: { md: '0' } }}>
                     <ControllerLabel title="Chức vụ" required />
                     <ControllerSelect
                        options={POSITION}
                        valuePath="id"
                        titlePath="lable"
                        name="role_id"
                        control={control as unknown as Control<FieldValues>}
                     />
                  </Grid>

                  <Grid item>
                     <ControllerLabel title="Link URL avatar" required />
                     <ControllerTextField name="avatar" control={control} placeholder="Link địa chỉ hình ảnh?" />
                  </Grid>
                  <Grid>
                     <Box
                        sx={{
                           display: 'flex',
                           justifyContent: 'center',
                           alignItems: 'center',
                           p: '8px',
                           width: '160px',
                           height: '150px',
                           border: 'solid 1px #ccc',
                        }}
                     >
                        <img
                           width="100%"
                           height="100%"
                           src={
                              watch('avatar') ||
                              'https://tse3.mm.bing.net/th?id=OIP.3IsXMskZyheEWqtE3Dr7JwHaGe&pid=Api&P=0&h=220'
                           }
                           alt="ảnh avatar"
                        />
                     </Box>
                  </Grid>
               </Grid>
            </Grid>
            <Box sx={{ position: 'absolute', top: 18, right: 30 }}>
               <LoadingButton type="submit" variant="contained" loading={isLoading}>
                  Thêm Mới
               </LoadingButton>
            </Box>
         </Stack>
      </form>
   );
};
export default BaseFormPersonnel;
