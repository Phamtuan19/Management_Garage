import { useNavigate, useParams } from 'react-router-dom';
import ROUTE_PATH from '@App/configs/router-path';
import { useQuery } from '@tanstack/react-query';
import { Box, Button, Chip, Grid, Typography } from '@mui/material';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import suppliesInvoiceService, { ResponseGetSuppliesInvoice } from '@App/services/supplies-invoice';
import PageContent from '@App/component/customs/PageContent';
import MODULE_PAGE from '@App/configs/module-page';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import formatPrice from '@Core/Helper/formatPrice';
import { STATUS_PAYMENT } from '@App/configs/status-config';

import DetailTable from './component/detail/DetailTable';

const breadcrumbs = [
   {
      title: 'Hóa Đơn Nhập',
      link: ROUTE_PATH.SUPPLIES_INVOICES,
   },
];
const SuppliesInvoicesDetails = () => {
   const { id: suppliesinvoicesId } = useParams();
   const navigate = useNavigate();

   const { data: suppliesinvoices } = useQuery(['getSuppliesInvoices', suppliesinvoicesId], async () => {
      const suppliesInvoicesRes = await suppliesInvoiceService.find(suppliesinvoicesId as string);
      return suppliesInvoicesRes.data as ResponseGetSuppliesInvoice;
   });

   const suppliesInvoicesDetails = [
      { label: 'Người tạo phiếu:', value: suppliesinvoices?.personnel.full_name, border: true },
      { label: 'Tổng tiền:', value: formatPrice(suppliesinvoices?.transactions.total_price ?? 0), border: true },
      {
         label: 'Hình thứ thanh toán:',
         value: (
            <Chip
               label={STATUS_PAYMENT[suppliesinvoices?.transactions.status ?? 'UNPAID'].title}
               color={STATUS_PAYMENT[suppliesinvoices?.transactions.status ?? 'UNPAID'].color}
            />
         ),
         border: false,
      },
      { label: 'Chuyển khoản:', value: formatPrice(suppliesinvoices?.transactions.cash_money ?? 0), border: true },
      { label: 'Mô tả', value: suppliesinvoices?.describe, border: true },
      { label: 'Tiền mặt:', value: formatPrice(suppliesinvoices?.transactions.transfer_money ?? 0), border: true },
   ];

   return (
      <BaseBreadcrumbs breadcrumbs={breadcrumbs} arialabel={'#' + suppliesinvoices?.code}>
         <Box display="flex" gap="12px">
            <PermissionAccessRoute module={MODULE_PAGE.SUPPLIES_INVOICES} action="CREATE">
               <Button variant="contained" onClick={() => navigate(ROUTE_PATH.SUPPLIES_INVOICES + ROUTE_PATH.CREATE)}>
                  Tạo mới
               </Button>
            </PermissionAccessRoute>
            {suppliesinvoices?.transactions.status !== STATUS_PAYMENT.PAID.key && (
               <PermissionAccessRoute module={MODULE_PAGE.SUPPLIES_INVOICES} action="UPDATE">
                  <Button
                     variant="contained"
                     onClick={() => navigate(ROUTE_PATH.SUPPLIES_INVOICES + '/' + suppliesinvoicesId + '/update')}
                     color="secondary"
                  >
                     Chỉnh sửa
                  </Button>
               </PermissionAccessRoute>
            )}
         </Box>

         <PageContent>
            <Grid container columnSpacing={8}>
               {suppliesInvoicesDetails?.map((detail, index) => (
                  <Grid item xs={6}>
                     <Grid container key={index}>
                        <Grid item xs={4} paddingBottom={2}>
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
                        <Grid item xs={8}>
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
                  </Grid>
               ))}
            </Grid>
            <DetailTable suppliesinvoices={suppliesinvoices} />
         </PageContent>
      </BaseBreadcrumbs>
   );
};

export default SuppliesInvoicesDetails;
