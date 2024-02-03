/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useAuth } from '@App/redux/slices/auth.slice';
import personnelService from '@App/services/personnel.service';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import { Box, Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Control, FieldValues, UseFormReturn } from 'react-hook-form';
import PageContent from '@App/component/customs/PageContent';
import ControllerAutoComplate from '@Core/Component/Input/ControllerAutoComplate';

import { SuppliesInvoicesSchema } from '../utils/suppliesInvoices.schema';

interface BaseFormSuppliesInvoicesPropType {
   form: UseFormReturn<SuppliesInvoicesSchema>;
}

const BaseFormSuppliesInvoices = ({ form }: BaseFormSuppliesInvoicesPropType) => {
   const { control } = form;

   const { user } = useAuth();

   // const { data: distributors } = useQuery(['getAllDistributor'], async () => {
   //    const res = await distributorService.get({ limit: 10000 });
   //    return res.data;
   // });

   const { data: personnels } = useQuery(['getAllPersonnels'], async () => {
      const res = await personnelService.fieldAll();
      return res.data as { _id: string; full_name: string }[];
   });

   useEffect(() => {
      form.setValue('personnel_id', user?._id || '');
   }, [user?._id]);

   return (
      <>
         <Box component="form">
            <Grid container spacing={2}>
               <Grid item xs={12} md={9}>
                  <PageContent sx={{ mt: 0 }}>{/* <SuppliesInvoicesTable form={form} /> */}</PageContent>
               </Grid>
               <Grid item xs={12} md={3} height="100% !important">
                  <PageContent sx={{ mt: 0 }}>
                     <Grid container spacing={2}>
                        <Grid item xs={12}>
                           <Box height="75px">
                              <ControllerLabel title="Nhân viên tạo phiếu" required />
                              <ControllerAutoComplate
                                 multiple
                                 options={personnels || []}
                                 valuePath="_id"
                                 titlePath="full_name"
                                 name="personnel_id"
                                 control={control as unknown as Control<FieldValues>}
                              />
                           </Box>
                        </Grid>
                        {/* <Grid item xs={12}>
                           <Box height="75px">
                              <ControllerLabel title="Trạng thái" required />
                              <TextField fullWidth value="" disabled />
                           </Box>
                        </Grid> */}
                     </Grid>
                  </PageContent>
               </Grid>
            </Grid>
         </Box>
      </>
   );
};

export default BaseFormSuppliesInvoices;
