/* eslint-disable @typescript-eslint/no-misused-promises */
import { LoadingButton } from '@mui/lab';
import { Box, Grid } from '@mui/material';
import { Control, FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import ControllerTextarea from '@Core/Component/Input/ControllerTextarea';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';

import { MaterialsCatalogSchema } from '../utils/materialsCatalog.schema';

interface BaseFormPersonnelPropType {
   form: UseFormReturn<MaterialsCatalogSchema>;
   isLoading: boolean;
   onSubmitForm: SubmitHandler<MaterialsCatalogSchema>;
}


const BaseFormSupplies = ({ form, isLoading, onSubmitForm }: BaseFormPersonnelPropType) => {
   const { handleSubmit, control } = form;

   return (
      <Box component="form" onSubmit={handleSubmit(onSubmitForm)}>
         <Grid container spacing={2}>
            <Grid item xs={12}>
               <Box height="96.5px">
                  <ControllerLabel title="Tên sản phẩm" required />
                  <ControllerTextField name="name" control={control} />
               </Box>
            </Grid>
            <Grid item xs={12}>
               <Box>
                  <ControllerLabel title="Mô tả" required />
                  <ControllerTextarea name="description" control={control as unknown as Control<FieldValues>} />
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

export default BaseFormSupplies;
