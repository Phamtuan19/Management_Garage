/* eslint-disable import/order */

import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';
import { Box, Grid, Typography } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { DistributorSchema } from '../utils/distributor.schema';
import FormDistributor from './FormDistributor';
import ControllerAutoComplate from '@Core/Component/Input/ControllerAutoComplate';
import { useQuery } from '@tanstack/react-query';
import materialsCatalogService from '@App/services/materialsCatalog.service';

interface BaseFormPersonnelPropType {
   form: UseFormReturn<DistributorSchema>;
}

const BaseFormDistributor = ({ form }: BaseFormPersonnelPropType) => {
   // const { id: distributorId } = useParams();
   const { control } = form;

   const { data: materialsCatalogs } = useQuery(['getAllFieldMaterialsCatalog'], async () => {
      const res = await materialsCatalogService.getAll();
      return res.data;
   });

   return (
      <Box component="form">
         <Grid container spacing={2}>
            <Grid item xs={12}>
               <Typography component="h4" sx={{ fontWeight: 600 }}>
                  Thông tin nhà phân phối:
               </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
               <Box height="80px">
                  <ControllerLabel title="Tên nhà phân phối" required />
                  <ControllerTextField name="name" control={control} />
               </Box>
            </Grid>
            <Grid item xs={12} md={6}>
               <Box height="80px">
                  <ControllerLabel title="Danh mục vật tư" required />
                  {/* <ControllerTextField name="name" control={control} /> */}
                  <ControllerAutoComplate
                     multiple
                     options={(materialsCatalogs as never) ?? []}
                     valuePath="_id"
                     titlePath="name"
                     name="materials_catalog_id"
                     control={control}
                  />
               </Box>
            </Grid>
            <Grid item xs={12} md={6}>
               <Box height="80px">
                  <ControllerLabel title="Email" required />
                  <ControllerTextField name="email" control={control} />
               </Box>
            </Grid>
            <Grid item xs={12} md={6}>
               <Box height="80px">
                  <ControllerLabel title="Số điện thoại" required />
                  <ControllerTextField name="phone" control={control} />
               </Box>
            </Grid>

            <Grid item xs={12} pt={12}>
               <Typography component="h4" sx={{ fontWeight: 600 }}>
                  Thông tin thanh toán:
               </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
               <Box height="80px">
                  <ControllerLabel title="Số tài khoản ngân hàng" />
                  <ControllerTextField name="bank_account_number" control={control} />
               </Box>
            </Grid>
            <Grid item xs={12} md={6}>
               <Box height="80px">
                  <ControllerLabel title="Tên ngân hàng" />
                  <ControllerTextField name="bank_name" control={control} />
               </Box>
            </Grid>
            <Grid item xs={12} md={6}>
               <Box height="80px">
                  <ControllerLabel title="Tên chi nhánh" />
                  <ControllerTextField name="bank_branch" control={control} />
               </Box>
            </Grid>
            <Grid item xs={12} md={6}>
               <Box height="80px">
                  <ControllerLabel title="Tên chủ tài khoản" />
                  <ControllerTextField name="account_holder_name" control={control} />
               </Box>
            </Grid>

            <Grid item xs={12}>
               <Typography component="h4" sx={{ fontWeight: 600 }}>
                  Địa chỉ:
               </Typography>
            </Grid>
            <FormDistributor form={form} />
            <Grid item xs={12} md={6}>
               <Box height="80px">
                  <ControllerLabel title="Địa chỉ cụ thể" />
                  <ControllerTextField name="address.specific" control={control} />
               </Box>
            </Grid>
         </Grid>
      </Box>
   );
};

export default BaseFormDistributor;
