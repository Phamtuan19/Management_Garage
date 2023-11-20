import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ValidationFormCreate, validationFormCreate } from '../utils/personnel.schema';
import { FormControl, Grid } from '@mui/material';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';
import ControllerSelect from '@Core/Component/Input/ControllerSelect';
import { LoadingButton } from '@mui/lab';
import ControllerRadioGroup from '@Core/Component/Input/ControllerRadioGroup';

const BaseFormPersonnel = () => {
   const {
      handleSubmit,
      control,
      formState: { errors },
   } = useForm<ValidationFormCreate>({
      resolver: yupResolver(validationFormCreate),
      defaultValues: validationFormCreate.getDefault(),
   });

   const onSubmitForm: SubmitHandler<ValidationFormCreate> = (data) => {
      console.log(data);
   };

   console.log(errors);

   return (
      <form onSubmit={handleSubmit(onSubmitForm)}>
         <Grid container spacing={2}>
            <Grid item md={3}>
               <ControllerLabel title="Tên" required />
               <ControllerTextField name="name" control={control} />
            </Grid>
            <Grid item md={3}>
               <ControllerLabel title="Email" />
               <ControllerTextField name="email" control={control} />
            </Grid>
            <Grid item md={3}>
               <ControllerLabel title="Địa chỉ" />
               <ControllerTextField name="address" control={control} />
            </Grid>
            <Grid item md={3}>
               <ControllerLabel title="SĐT" />
               <ControllerTextField name="sdt" control={control} />
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
                  name="role"
                  control={control}
               />
            </Grid>
            <Grid item md={3}>
               <FormControl>
                  <ControllerLabel title="Giới tính" />
                  <ControllerRadioGroup
                     sx={{ display: 'flex', alignItems: 'center' }}
                     name="gender"
                     options={[
                        { id: 'nam', title: 'nam' },
                        { id: 'nu', title: 'nữ' },
                     ]}
                     valuePath="id"
                     titlePath="title"
                     control={control as any}
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
               <LoadingButton type="submit">Thêm</LoadingButton>
            </Grid>
         </Grid>
      </form>
   );
};

export default BaseFormPersonnel;
