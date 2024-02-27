/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useParams } from 'react-router-dom';
import ROUTE_PATH from '@App/configs/router-path';
import { useQuery } from '@tanstack/react-query';
import theme from '@Core/Theme';
import { Box, Typography, Stack, Grid } from '@mui/material';
import Divider from '@mui/material/Divider';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import { format } from 'date-fns';
import suppliesInvoiceService from '@App/services/supplies-invoice';
import { TableContainer, Table, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import TableHead from '@mui/material/TableHead';
// import TabSuppliesInvoicesDetails from './component/TabSuppliesIvoices';

const breadcrumbs = [
   {
      title: 'Nhập hàng',
      link: ROUTE_PATH.SUPPLIES_INVOICES,
   },
];
const SuppliesInvoicesDetails = () => {
   const { id: suppliesinvoicesId } = useParams();

   const { data: suppliesinvoices } = useQuery(['getSuppliesInvoices', suppliesinvoicesId], async () => {
      const suppliesInvoicesRes = await suppliesInvoiceService.find(suppliesinvoicesId as string);
      return suppliesInvoicesRes.data;
   });

   const formDate = (dateString: string | number | Date) => {
      return dateString ? format(new Date(dateString), 'MM-dd-yyyy') : '';
   };

   const suppliesInvoicesDetails = [
      { label: 'Mã hóa đơn', value: suppliesinvoices?.code },
      { label: 'Người tạo phiếu', value: suppliesinvoices?.personnel.full_name },
      { label: 'Mô tả', value: suppliesinvoices?.describe },
      { label: 'Tổng tiền', value: suppliesinvoices?.transactions.total_price },
      { label: 'HT thanh toán', value: suppliesinvoices?.transactions.payment_type },
      { label: 'Tiền mặt', value: suppliesinvoices?.transactions.transfer_money },
      { label: 'Chuyển khoản', value: suppliesinvoices?.transactions.cash_money },
      { label: 'Ngày tạo', value: formDate(suppliesinvoices?.createdAt) },
   ];

   const DetailssuppliesInvoices = [
      { label: 'Mã vật tư', value: 'code' },
      { label: 'Tên vật tư', value: 'name_detail' },
      { label: 'Giá vốn', value: 'cost_price' },
      { label: 'Giá bán', value: 'selling_price' },
      { label: 'SL nhập', value: 'quantity_received' },
      { label: 'SL bán', value: 'quantity_sold' },
      { label: 'Đơn vị tính', value: 'unit' },
   ];
   return (
      <Box>
         <BaseBreadcrumbs
            breadcrumbs={breadcrumbs}
            arialabel="Chi tiết phiếu nhập hàng"
            sx={({ base }) => ({ bgcolor: base.background.default, border: 'none', p: 0 })}
         >
            {suppliesinvoices && (
               <Stack>
                  <Box sx={{ mt: 3, bgcolor: '#FFFF', p: '0px 16px 16px 16px', borderRadius: 2, position: 'relative' }}>
                     <Box>
                        <Box sx={{ mt: 4, p: 4, borderRadius: 2, position: 'relative' }}>
                           <Box sx={{ mb: 2, minHeight: '50px', display: 'flex', gap: 25 }}>
                              <Typography
                                 sx={{ fontWeight: '900', fontSize: '1.5rem', color: theme.palette.grey[800] }}
                              >
                                 Thông tin phiếu nhập hàng
                              </Typography>
                           </Box>

                           {suppliesInvoicesDetails.map((detail: { label: string; value: string }, index: number) => {
                              return (
                                 <Grid item key={index} xs={12}>
                                    <DetailsItem label={detail.label} value={detail.value} />
                                 </Grid>
                              );
                           })}
                        </Box>
                        <Box sx={{ mt: 4, p: 4, borderRadius: 2, position: 'relative' }}>
                           <Box sx={{ mb: 2, minHeight: '50px', display: 'flex', gap: 25 }}>
                              <Typography
                                 sx={{ fontWeight: '900', fontSize: '1.5rem', color: theme.palette.grey[800] }}
                              >
                                 Thông tin chi tiết phiếu nhập hàng
                              </Typography>
                           </Box>
                           <TableContainer component={Paper}>
                              <Table sx={{ minWidth: 650 }}>
                                 <TableHead>
                                    <TableRow>
                                       {DetailssuppliesInvoices.map(
                                          (detail: { label: string; value: string }, index: number) => (
                                             <TableCell key={index} align="center" sx={{ p: 1 }}>
                                                {detail.label}
                                             </TableCell>
                                          ),
                                       )}
                                    </TableRow>
                                 </TableHead>
                                 <TableBody>
                                    {suppliesinvoices?.details.map((detailObject: any, rowIndex: number) => (
                                       <TableRow
                                          key={rowIndex}
                                          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                       >
                                          {DetailssuppliesInvoices.map(
                                             (detail: { label: string; value: string }, colIndex: number) => (
                                                <TableCell key={colIndex} align="center" sx={{ p: 1 }}>
                                                   {detailObject[detail.value]}
                                                </TableCell>
                                             ),
                                          )}
                                       </TableRow>
                                    ))}
                                 </TableBody>
                              </Table>
                           </TableContainer>
                        </Box>
                     </Box>
                  </Box>
               </Stack>
            )}
         </BaseBreadcrumbs>
      </Box>
   );
};
const DetailsItem = ({ label, value }: { label: string; value: string }) => (
   <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
      <Grid item xs={3}>
         <Typography sx={{ p: 1, fontWeight: '700', fontSize: '1rem', color: theme.palette.grey[800] }}>
            {label}
         </Typography>
      </Grid>
      <Grid item xs={9}>
         <Typography sx={{ p: 1, flexGrow: 1, fontSize: '1rem', height: '40px' }}>{value}</Typography>
         <Divider variant="inset" sx={{ m: 0 }} />
      </Grid>
   </Grid>
);

export default SuppliesInvoicesDetails;
