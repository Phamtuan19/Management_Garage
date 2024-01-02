/* eslint-disable @typescript-eslint/no-misused-promises */
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { ValidationFormCreate } from '../utils/personnel.schema';
import { FormControl, Grid, TextField } from '@mui/material';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';
import ControllerSelect from '@Core/Component/Input/ControllerSelect';
import { LoadingButton } from '@mui/lab';
import ControllerRadioGroup from '@Core/Component/Input/ControllerRadioGroup';

interface BaseFormPersonnelPropType {
   form: UseFormReturn<ValidationFormCreate>;
   isLoading: boolean;
   onSubmitForm: SubmitHandler<ValidationFormCreate>;
}

const BaseFormPersonnel = ({ form, onSubmitForm, isLoading }: BaseFormPersonnelPropType) => {
   const { control, handleSubmit } = form;
   return (
      <form onSubmit={handleSubmit(onSubmitForm)}>
         <Grid container spacing={2}>
            <Grid item md={3}>
               <ControllerLabel title="Full Name" required />
               <ControllerTextField name="fullname" control={control} />
            </Grid>
            <Grid item md={3}>
               <ControllerLabel title="Email" />
               <ControllerTextField name="email" control={control} />
            </Grid>
            <Grid item md={3}>
               <ControllerLabel title="Password" />
               <ControllerTextField name="password" control={control} />
            </Grid>
            <Grid item xs={3}>
               <TextField
                  fullWidth
                  type="file"
                  // label="Chọn tệp tin"
                  name="avatar"
                  variant="outlined"
                  inputProps={{ accept: '.pdf, .doc, .docx' }}
                  // inputRef={control.register}
               />
            </Grid>
            <Grid item md={3}>
               <ControllerLabel title="Birthday" />
               <ControllerTextField name="birthday" control={control} />
            </Grid>
            <Grid item md={3}>
               <ControllerLabel title="Address" />
               <ControllerTextField name="address" control={control} />
            </Grid>
            <Grid item md={3}>
               <ControllerLabel title="Phone" />
               <ControllerTextField name="phone" control={control} />
            </Grid>
            <Grid item md={3}>
               <ControllerLabel title="CMND" />
               <ControllerTextField name="cmnd" control={control} />
            </Grid>
            <Grid item md={3}>
               <ControllerLabel title="Bộ phận" />
               <ControllerSelect
                  options={[
                     { id: 1, lable: 'Bộ phận sửa chữa' },
                     { id: 2, lable: 'Bộ phận Kho' },
                  ]}
                  valuePath="id"
                  titlePath="lable"
                  defaultValue=""
                  name="role_id"
                  control={control}
               />
            </Grid>
            <Grid item md={3}>
               <ControllerLabel title="Start_day" />
               <ControllerTextField name="start_day" control={control} />
            </Grid>
            <Grid item md={3}>
               <ControllerLabel title="End_day" />
               <ControllerTextField name="end_day" control={control} />
            </Grid>
            <Grid item md={3}>
               <ControllerLabel title="Bank number" />
               <ControllerTextField name="bank_number" control={control} />
            </Grid>
            <Grid item md={3}>
               <ControllerLabel title="Bank name" />
               <ControllerTextField name="bank_name" control={control} />
            </Grid>
            <Grid item md={3}>
               <ControllerLabel title="Bank account name" />
               <ControllerTextField name="bank_account_name" control={control} />
            </Grid>

            <Grid item md={3}>
               <FormControl>
                  <ControllerLabel title="Giới tính" />
                  <ControllerRadioGroup
                     sx={{ display: 'flex', alignItems: 'center' }}
                     name="gender"
                     options={[
                        { id: 'nam', title: 'Nam' },
                        { id: 'nu', title: 'Nữ' },
                     ]}
                     valuePath="id"
                     titlePath="title"
                     control={control}
                  />
               </FormControl>
            </Grid>
            <Grid item md={3}>
               <ControllerLabel title="Trạng thái" />
               <ControllerRadioGroup
                  name="status"
                  sx={{ display: 'flex', alignItems: 'center' }}
                  options={[
                     { id: 'present', title: 'Có mặt' },
                     { id: 'absent', title: 'Vắng mặt' },
                  ]}
                  valuePath="id"
                  titlePath="title"
                  control={control}
               />
            </Grid>

            <Grid item xs={12}>
               <LoadingButton type="submit" variant="contained" loading={isLoading}>
                  Thêm
               </LoadingButton>
            </Grid>
         </Grid>
      </form>
   );
};

export default BaseFormPersonnel;
