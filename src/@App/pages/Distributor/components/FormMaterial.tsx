import ControllerAutoComplate from '@Core/Component/Input/ControllerAutoComplate';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import { Box, Grid } from '@mui/material';
import React from 'react';
import { Control } from 'react-hook-form';
import { DistributorSchema } from '../utils/distributor.schema';

const FormMaterial = ({
   control,
   isLoadingMaterialsCatalog,
}: {
   control: Control<DistributorSchema>;
   isLoadingMaterialsCatalog: boolean;
}) => {
   return (
      <>
         <Grid item xs={12} md={3}>
            <Box height="96.5px">
               <ControllerLabel title="Xã/Phường" required />
               <ControllerAutoComplate
                  name="ward"
                  valuePath="value"
                  titlePath="title"
                  loading={isLoadingMaterialsCatalog}
                  options={[]}
                  control={control}
               />
            </Box>
         </Grid>
         <Grid item xs={12} md={3}>
            <Box height="96.5px">
               <ControllerLabel title="Xã/Phường" required />
               <ControllerAutoComplate
                  name="ward"
                  valuePath="value"
                  titlePath="title"
                  loading={isLoadingMaterialsCatalog}
                  options={[]}
                  control={control}
               />
            </Box>
         </Grid>
      </>
   );
};

export default FormMaterial;
