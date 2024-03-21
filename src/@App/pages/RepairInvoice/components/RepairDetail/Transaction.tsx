/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/naming-convention */
import PageContent from '@App/component/customs/PageContent';
import { STATUS_PAYMENT, StatusPayment } from '@App/configs/status-config';
import transactionService from '@App/services/transaction-service';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import formatPrice from '@Core/Helper/formatPrice';
import { Box, Chip, Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';

interface TransactionProps {
   transaction_id: string;
}

const Transaction = ({ transaction_id }: TransactionProps) => {
   const { data: transaction } = useQuery(['getTransaction', transaction_id], async () => {
      const res = await transactionService.find(transaction_id);
      return res.data;
   });

   const renderInfo = [
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
                  <Grid item xs={4} key={index}>
                     <Grid container spacing={1}>
                        <Grid item xs={4} sx={{ display: 'flex', alignItems: 'flex-end' }}>
                           <ControllerLabel title={item.title} />
                        </Grid>
                        <Grid item xs={8}>
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
