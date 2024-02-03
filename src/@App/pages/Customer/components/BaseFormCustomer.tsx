/* eslint-disable @typescript-eslint/no-misused-promises */
import { LoadingButton } from '@mui/lab';
import { Box, FormControl, Grid } from '@mui/material';
import { Control, FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import ControllerRadioGroup from '@Core/Component/Input/ControllerRadioGroup';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';

import { CustomerSchema } from '../utils/customer.schema';

interface BaseFormPersonnelPropType {
   form: UseFormReturn<CustomerSchema>;
   isLoading: boolean;
   onSubmitForm: SubmitHandler<CustomerSchema>;
   isUpdate?: boolean;
}

const BaseFormCustomer = ({ form, isLoading, onSubmitForm, isUpdate }: BaseFormPersonnelPropType) => {
   const { handleSubmit, control } = form;

   return (
      <Box component="form" onSubmit={handleSubmit(onSubmitForm)}>
         <Grid container spacing={2}>
            <Grid item xs={12}>
               <Box height="96.5px">
                  <ControllerLabel title="Tên khách hàng" required />
                  <ControllerTextField name="name" control={control} placeholder="Tên khách hàng ?" />
               </Box>
            </Grid>
            <Grid item xs={12}>
               <Box>
                  <ControllerLabel title="Số điện thoại" required />
                  <ControllerTextField name="phone" control={control} placeholder="Số điện thoại ?" />
               </Box>
            </Grid>
            <Grid item xs={12}>
               <ControllerLabel title="Email" required />
               <ControllerTextField name="email" control={control} placeholder="Email?" />
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
                     defaultValue="male"
                  />
               </FormControl>
            </Grid>
            <Grid item xs={12}>
               <LoadingButton type="submit" variant="contained" loading={isLoading}>
                  {isUpdate ? 'Cập nhật' : 'Thêm mới'}
               </LoadingButton>
            </Grid>
         </Grid>
      </Box>
   );
};

export default BaseFormCustomer;
