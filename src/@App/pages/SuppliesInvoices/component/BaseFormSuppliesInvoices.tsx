/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect, useMemo } from 'react';
import { Box, Button } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import PageContent from '@App/component/customs/PageContent';
import { ResponseGetSuppliesInvoice } from '@App/services/supplies-invoice';
import { STATUS_PAYMENT } from '@App/configs/status-config';

import { SuppliesInvoicesSchema } from '../utils/suppliesInvoices.schema';

import SuppliesInvoicesTable from './SuppliesInvoicesTable';

interface BaseFormSuppliesInvoicesPropType {
   form: UseFormReturn<SuppliesInvoicesSchema>;
   handleSubmitSuppliesInvoice: (data: SuppliesInvoicesSchema) => void;
   suppliesInvoice?: ResponseGetSuppliesInvoice | undefined;
}

const BaseFormSuppliesInvoices = ({
   form,
   suppliesInvoice,
   handleSubmitSuppliesInvoice,
}: BaseFormSuppliesInvoicesPropType) => {
   const { handleSubmit } = form;

   const isCheckStatusPayment = useMemo(() => {
      const isCheck = suppliesInvoice?.transactions?.status === STATUS_PAYMENT.PAID.key;

      return isCheck;
   }, [suppliesInvoice?.transactions?.status]);

   // tinh tổng tiền
   const total_price =
      form.watch('details') && form.watch('details').length > 0
         ? form.watch('details').reduce((current, item) => {
              return current + Number(item.cost_price) * Number(item.quantity_received);
           }, 0)
         : 0;

   useEffect(() => {
      form.setValue('transaction.total_price', total_price);
   }, [total_price]);

   return (
      <>
         <Button disabled={form.watch('details')?.length === 0} onClick={handleSubmit(handleSubmitSuppliesInvoice)}>
            Lưu
         </Button>
         <PageContent>
            <Box component="form">
               <SuppliesInvoicesTable isCheckStatusPayment={isCheckStatusPayment} form={form} />
               {/* <Grid item xs={12} md={3} height="100% !important">
                  <PageContent sx={{ mt: 0 }}>
                     <Grid container spacing={2}>
                        <Grid item xs={12}>
                           <SuppliesInvoiceInfo
                              suppliesInvoice={suppliesInvoice}
                              isCheckStatusPayment={isCheckStatusPayment}
                              form={form}
                           />
                        </Grid>
                        {!isCheckStatusPayment && (
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
                        )}
                     </Grid>
                  </PageContent>
               </Grid> */}
            </Box>
         </PageContent>
      </>
   );
};

export default React.memo(BaseFormSuppliesInvoices);
