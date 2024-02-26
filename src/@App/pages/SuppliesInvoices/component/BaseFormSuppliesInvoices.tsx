/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect } from 'react';
import { useAuth } from '@App/redux/slices/auth.slice';
import personnelService from '@App/services/personnel.service';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import { Box, Button, Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { UseFormReturn } from 'react-hook-form';
import PageContent from '@App/component/customs/PageContent';
import ControllerAutoComplate from '@Core/Component/Input/ControllerAutoComplate';
import { useParams } from 'react-router-dom';

import { SuppliesInvoicesSchema } from '../utils/suppliesInvoices.schema';

import SuppliesInvoicesTable from './SuppliesInvoicesTable';
import SuppliesInvoiceInfo from './SuppliesInvoiceInfo';

interface BaseFormSuppliesInvoicesPropType {
   form: UseFormReturn<SuppliesInvoicesSchema>;
   handleSubmitSuppliesInvoice: (data: SuppliesInvoicesSchema) => void;
}

const BaseFormSuppliesInvoices = ({ form, handleSubmitSuppliesInvoice }: BaseFormSuppliesInvoicesPropType) => {
   const { id: suppliesInvoiceId } = useParams();
   const { control, handleSubmit } = form;
   const { user } = useAuth();

   // tinh tổng tiền
   const total_price =
      form.watch('details') && form.watch('details').length > 0
         ? form.watch('details').reduce((current, item) => {
              return current + Number(item.cost_price) * Number(item.quantity_received);
           }, 0)
         : 0;

   const { data: personnels } = useQuery(['getAllPersonnels'], async () => {
      if (!suppliesInvoiceId && user?._id) {
         form.setValue('personnel_id', user._id);
      }
      const res = await personnelService.fieldAll();
      return res.data as { _id: string; full_name: string }[];
   });

   useEffect(() => {
      form.setValue('transaction.total_price', total_price);
   }, [total_price]);

   return (
      <>
         <Box component="form">
            <Grid container spacing={2}>
               <Grid item xs={12} md={9}>
                  <PageContent sx={{ mt: 0 }}>
                     <SuppliesInvoicesTable form={form} />
                  </PageContent>
               </Grid>
               <Grid item xs={12} md={3} height="100% !important">
                  <PageContent sx={{ mt: 0 }}>
                     <Grid container spacing={2}>
                        <Grid item xs={12}>
                           <Box height="">
                              <ControllerLabel title="Nhân viên tạo phiếu" required />
                              <ControllerAutoComplate
                                 options={personnels || []}
                                 valuePath="_id"
                                 titlePath="full_name"
                                 name="personnel_id"
                                 control={control}
                                 disabled={Boolean(suppliesInvoiceId)}
                              />
                           </Box>
                        </Grid>
                        <Grid item xs={12}>
                           <SuppliesInvoiceInfo form={form} />
                        </Grid>
                        <Grid item xs={12}>
                           <Button
                              type="submit"
                              disabled={form.watch('details')?.length === 0}
                              fullWidth
                              onClick={handleSubmit(handleSubmitSuppliesInvoice)}
                           >
                              Lưu hóa đơn
                           </Button>
                        </Grid>
                     </Grid>
                  </PageContent>
               </Grid>
            </Grid>
         </Box>
      </>
   );
};

export default BaseFormSuppliesInvoices;
