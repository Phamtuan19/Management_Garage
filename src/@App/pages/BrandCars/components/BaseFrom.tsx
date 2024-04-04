import PageContent from '@App/component/customs/PageContent';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';
import { Grid } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';

import { BrandCarSchema } from '../utils/brand-car.schema';

const BaseFrom = ({ form }: { form: UseFormReturn<BrandCarSchema> }) => {
   const { control } = form;

   return (
      <PageContent>
         <Grid container spacing={2} component="form">
            <Grid item xs={12}>
               <ControllerLabel title="Tên thương hiệu" />
               <ControllerTextField name="name" control={control} />
            </Grid>
         </Grid>
      </PageContent>
   );
};

export default BaseFrom;
