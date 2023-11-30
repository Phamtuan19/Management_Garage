import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { PermissionSchemaType } from '../utils/permission.schema';
import { Grid } from '@mui/material';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';
import { useParams } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { ACTION_MODULE } from '../utils';
import ControllerChexBoxGroup from '@Core/Component/Input/ControllerChexBoxGroup';

interface BaseFormModulePermissionPropsType {
   form: UseFormReturn<PermissionSchemaType>;
   onSubmit: SubmitHandler<PermissionSchemaType>;
}

const BaseFormModulePermission = ({ form, onSubmit }: BaseFormModulePermissionPropsType) => {
   const { id } = useParams();

   const { handleSubmit, control } = form;

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <Grid container spacing={2}>
            <Grid item xs={6}>
               <ControllerLabel title="Tên hiển thị" required />
               <ControllerTextField name="title" control={control} />
            </Grid>
            <Grid item xs={6}>
               <ControllerLabel title="Tên module" required />
               <ControllerTextField name="name" control={control} disabled={Boolean(id)} />
            </Grid>
            <Grid item xs={12}>
               <ControllerLabel title="Mô tả" required />
               <ControllerTextField name="description" control={control} disabled={Boolean(id)} />
            </Grid>
            <Grid item xs={4}>
               <ControllerLabel title="Action" required />
               <ControllerChexBoxGroup
                  options={ACTION_MODULE}
                  titlePath="title"
                  valuePath="value"
                  name="action"
                  control={control}
                  sx={{ flexDirection: 'column' }}
               />
            </Grid>
            <Grid item xs={12}>
               <LoadingButton type="submit" variant="contained">
                  {id ? 'Cập nhật' : 'Thêm mới'}
               </LoadingButton>
            </Grid>
         </Grid>
      </form>
   );
};

export default BaseFormModulePermission;
