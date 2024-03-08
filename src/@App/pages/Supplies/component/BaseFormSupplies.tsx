/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Grid } from '@mui/material';
import { Control, FieldValues, UseFormReturn } from 'react-hook-form';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import ControllerTextarea from '@Core/Component/Input/ControllerTextarea';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';
import { useQuery } from '@tanstack/react-query';
import materialsCatalogService from '@App/services/materialsCatalog.service';
import { HandleErrorApi } from '@Core/Api/axios-config';
import { errorMessage } from '@Core/Helper/message';
import ControllerAutoComplate from '@Core/Component/Input/ControllerAutoComplate';

import { SuppliesSchema } from '../utils/supplies.schema';

import FormSuppliesDetails from './FormSuppliesDetails';

interface BaseFormSuppliesPropType {
   form: UseFormReturn<SuppliesSchema>;
}

const BaseFormSupplies = ({ form }: BaseFormSuppliesPropType) => {
   const { control } = form;

   const { data: materialsCatalogs } = useQuery(['getMaterialsCatalogs'], async () => {
      try {
         const res = await materialsCatalogService.getAll();
         return res.data;
      } catch (err: any) {
         const dataError = err.response.data as HandleErrorApi;
         return errorMessage(dataError?.message as unknown as string);
      }
   });
   return (
      <Box component="form">
         <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
               <Box height="75px">
                  <ControllerLabel title="Tên vật tư" required />
                  <ControllerTextField name="name" control={control} />
               </Box>
            </Grid>
            <Grid item xs={12} md={6}>
               <Box height="75px">
                  <ControllerLabel title="Danh mục vật tư" required />
                  <ControllerAutoComplate
                     options={materialsCatalogs || []}
                     valuePath="_id"
                     titlePath="name"
                     name="materials_catalog_id"
                     control={control}
                  />
               </Box>
            </Grid>
            <Grid item xs={12} md={6}>
               <Box height="75px">
                  <ControllerLabel title="Đơn vị tính" required />
                  <ControllerTextField name="unit" control={control} />
               </Box>
            </Grid>
            <Grid item xs={12} md={6}></Grid>
            <Grid item xs={12}>
               <Box minHeight="80px">
                  <ControllerLabel title="Mô tả vật tư" />
                  <ControllerTextarea name="describe" control={control as unknown as Control<FieldValues>} />
               </Box>
            </Grid>

            <FormSuppliesDetails form={form} />
         </Grid>
      </Box>
   );
};

export default BaseFormSupplies;
