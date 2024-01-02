import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';
import { Box, Grid } from '@mui/material';
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { MaterialsCatalogSchema } from '../utils/MaterialsCatalog.schema';
import { LoadingButton } from '@mui/lab';
import ControllerTextarea from '@Core/Component/Input/ControllerTextarea';

interface BaseFormPersonnelPropType {
   form: UseFormReturn<MaterialsCatalogSchema>;
   isLoading: boolean;
   onSubmitForm: SubmitHandler<MaterialsCatalogSchema>;
}

const BaseFormMaterialsCatalog = ({ form, isLoading, onSubmitForm }: BaseFormPersonnelPropType) => {
   const { control } = form;

   return (
      <Box component="form">
         <Grid container spacing={2}>
            <Grid item xs={12}>
               <Box height="96.5px">
                  <ControllerLabel title="Tên nhà phân phối" required />
                  <ControllerTextField name="name" control={control} />
               </Box>
            </Grid>
            <Grid item xs={12}>
               <Box height="96.5px">
                  <ControllerLabel title="Mô tả" required />
                  <ControllerTextarea name="description" control={control} />
               </Box>
            </Grid>
            <Grid item xs={12}>
               <LoadingButton type="submit" variant="contained" loading={isLoading}>
                  Thêm mới
               </LoadingButton>
            </Grid>
         </Grid>
      </Box>
   );
};

export default BaseFormMaterialsCatalog;
