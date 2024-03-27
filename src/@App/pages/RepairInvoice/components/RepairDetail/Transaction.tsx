/* eslint-disable @typescript-eslint/no-unsafe-argument */
import PageContent from '@App/component/customs/PageContent';
import { STATUS_PAYMENT, StatusPayment } from '@App/configs/status-config';
import personnelService from '@App/services/personnel.service';
import transactionService from '@App/services/transaction-service';
import { ResponseReadSuppliesInvoices } from '@App/types/repair-invoice';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import formatPrice from '@Core/Helper/formatPrice';
import { Box, Chip, Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

interface TransactionProps {
   repairInvoice: ResponseReadSuppliesInvoices;
}

const Transaction = ({ repairInvoice }: TransactionProps) => {
   const { data: transaction } = useQuery(['getTransaction', repairInvoice.transactions_id], async () => {
      const res = await transactionService.find(repairInvoice.transactions_id);
      return res.data;
   });
   const { data: personnels } = useQuery(['getPersonnel', repairInvoice.transactions_id], async () => {
      const res = await personnelService.fieldAll();
      return res.data;
   });

   const renderInfo = [
      {
         title: 'Nhân viên sửa chữa:',
         value: (
            <Box display="flex" gap={1}>
               {personnels
                  ?.filter((item) => repairInvoice.repair_staff_id.includes(item._id))
                  .map((item) => <Chip label={item.full_name} />)}
            </Box>
         ),

         border: false,
         xs: 12,
      },
      {
         title: 'Tổng hóa đơn:',
         value: formatPrice(transaction?.total_price ?? 0),
         border: true,
      },
      {
         title: 'Trạng thái:',
         value: (
            <Chip
               label={
                  transaction ? STATUS_PAYMENT[transaction.status as StatusPayment].title : STATUS_PAYMENT.UNPAID.title
               }
               color={
                  transaction ? STATUS_PAYMENT[transaction.status as StatusPayment].color : STATUS_PAYMENT.UNPAID.color
               }
            />
         ),
         border: false,
      },
   ];

   return (
      <PageContent>
         <Grid container spacing={2}>
            {renderInfo.map((item, index) => {
               return (
                  <Grid item xs={item.xs ?? 4} key={index}>
                     <Grid container spacing={1}>
                        <Grid item xs={item.xs ? 2 : 4} sx={{ display: 'flex', alignItems: 'flex-end' }}>
                           <ControllerLabel title={item.title} />
                        </Grid>
                        <Grid item xs={item.xs ? 10 : 8}>
                           <Typography
                              sx={{
                                 p: 1,
                                 pb: 0,
                                 fontWeight: '500',
                                 flexGrow: 1,
                                 fontSize: '1rem',
                                 lineHeight: '1.5rem',
                              }}
                           >
                              {item.value}
                           </Typography>
                           {item.border && <Box sx={{ borderBottom: '1px solid #DADADA' }}></Box>}
                        </Grid>
                     </Grid>
                  </Grid>
               );
            })}
         </Grid>
      </PageContent>
   );
};

export default Transaction;
