import { ResponseGetSuppliesInvoice } from '@App/services/supplies-invoice';
import formatDateTime from '@Core/Helper/formatDateTime';
import formatPrice from '@Core/Helper/formatPrice';
import { Box, Chip, Grid, Typography } from '@mui/material';
import React from 'react';

const DetailInformation = ({ suppliesinvoices }: { suppliesinvoices: ResponseGetSuppliesInvoice | undefined }) => {
   const suppliesInvoicesDetails = [
      { label: 'Mã hóa đơn:', value: '#' + suppliesinvoices?.code, border: true },
      { label: 'Người tạo phiếu:', value: suppliesinvoices?.personnel.full_name, border: true },
      { label: 'Tổng tiền:', value: formatPrice(suppliesinvoices?.transactions.total_price ?? 0), border: true },
      { label: 'Tiền mặt:', value: formatPrice(suppliesinvoices?.transactions.transfer_money ?? 0), border: true },
      { label: 'Chuyển khoản:', value: formatPrice(suppliesinvoices?.transactions.cash_money ?? 0), border: true },
      {
         label: 'Hình thứ thanh toán:',
         value: <Chip label={suppliesinvoices?.transactions.payment_type} color="info" />,
         border: false,
      },
      { label: 'Mô tả', value: suppliesinvoices?.describe, border: true },
      { label: 'Ngày tạo:', value: formatDateTime(suppliesinvoices?.createdAt ?? ''), border: true },
   ];

   return (
      <Grid container spacing={2}>
         {suppliesInvoicesDetails?.map((detail, index) => (
            <Grid container spacing={1} key={index}>
               <Grid item xs={2} paddingBottom={2}>
                  <Typography
                     sx={({ palette }) => ({
                        fontSize: '1rem',
                        lineHeight: '2.2rem',
                        color: palette.grey[800],
                     })}
                  >
                     {detail.label}
                  </Typography>
               </Grid>
               <Grid item xs={10}>
                  <Typography
                     sx={{
                        p: 1,
                        pb: 0,
                        fontWeight: '500',
                        flexGrow: 1,
                        fontSize: '1rem',
                        lineHeight: '2rem',
                        height: '40px',
                     }}
                  >
                     {detail.value}
                  </Typography>
                  {detail.border && <Box sx={{ borderBottom: '1px solid #DADADA' }}></Box>}
               </Grid>
            </Grid>
         ))}
      </Grid>
   );
};

export default React.memo(DetailInformation);
