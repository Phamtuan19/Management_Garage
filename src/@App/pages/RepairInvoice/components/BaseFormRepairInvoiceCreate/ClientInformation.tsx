import { UseFormReturn } from 'react-hook-form';
import { Box, Button, Grid } from '@mui/material';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import ControllerAutoComplate from '@Core/Component/Input/ControllerAutoComplate';
import { useQuery } from '@tanstack/react-query';
import customerService, { ICustomer } from '@App/services/customer.service';
import AddIcon from '@mui/icons-material/Add';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';

import { RepairInvoiceSchema } from '../../utils/repair-invoice-create';

interface ClientInformationProps {
   form: UseFormReturn<RepairInvoiceSchema>;
}

const ClientInformation = ({ form }: ClientInformationProps) => {
   const { setValue, control } = form;

   const { data: customers } = useQuery(['getAllFieldCustomers'], async () => {
      const res = await customerService.fieldAll();
      return res.data;
   });

   return (
      <Grid container spacing={1}>
         <Grid item xs={5.5}>
            <Grid container spacing={0.3}>
               <Grid item xs={2.5} display="flex">
                  <ControllerLabel title="Khách hàng:" required />
               </Grid>
               <Grid item xs={9.5} display="flex" gap={0.5}>
                  <Box flex={1}>
                     <ControllerAutoComplate
                        options={(customers as never) || []}
                        valuePath="_id"
                        titlePath="name"
                        name="customer.customer_id"
                        placeholder="Chọn khách hàng"
                        control={control}
                        onChange={(e: ICustomer) => {
                           setValue('customer.phone', e.phone);
                           setValue('customer.email', e.email);
                        }}
                     />
                  </Box>
                  <Button sx={{ minWidth: 'auto', px: '12px', maxHeight: '37.6px' }}>
                     <AddIcon />
                  </Button>
               </Grid>
            </Grid>
         </Grid>
         <Grid item xs={3} sx={{ minHeight: '55px' }}>
            <Grid container spacing={0.3}>
               <Grid item xs={5} display="flex">
                  <ControllerLabel title="Số điện thoại:" />
               </Grid>
               <Grid item xs={7}>
                  <ControllerTextField disabled placeholder="Số điện thoại" name="customer.phone" control={control} />
               </Grid>
            </Grid>
         </Grid>
         <Grid item xs={3.5} sx={{ minHeight: '55px' }}>
            <Grid container spacing={0.3}>
               <Grid item xs={3} display="flex">
                  <ControllerLabel title="Email:" />
               </Grid>
               <Grid item xs={9}>
                  <ControllerTextField disabled placeholder="Địa chỉ email" name="customer.email" control={control} />
               </Grid>
            </Grid>
         </Grid>
      </Grid>
   );
};

export default ClientInformation;
