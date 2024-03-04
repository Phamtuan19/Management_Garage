import { Box, Grid } from '@mui/material';
import { Control, FieldValues, UseFormReturn } from 'react-hook-form';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import ControllerTextarea from '@Core/Component/Input/ControllerTextarea';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';

import { MaterialsCatalogSchema } from '../utils/materialsCatalogSchema';

interface BaseFormPersonnelPropType {
   form: UseFormReturn<MaterialsCatalogSchema>;
}

const BaseFormMaterialCatalog = ({ form }: BaseFormPersonnelPropType) => {
   const { control } = form;

   return (
      <Box component="form">
         <Grid container spacing={2}>
            <Grid item xs={12}>
               <Box height="92px">
                  <ControllerLabel title="Tên danh mục" required />
                  <ControllerTextField name="name" control={control} />
               </Box>
            </Grid>
            <Grid item xs={12}>
               <Box>
                  <ControllerLabel title="Mô tả" required />
                  <ControllerTextarea name="describe" control={control as unknown as Control<FieldValues>} />
               </Box>
            </Grid>
         </Grid>
      </Box>
   );
};

export default BaseFormMaterialCatalog;
