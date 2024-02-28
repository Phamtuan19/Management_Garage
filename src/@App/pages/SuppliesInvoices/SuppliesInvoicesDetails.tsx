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
import suppliesInvoiceService from '@App/services/supplies-invoice';
import { TableContainer, Table, TableBody, TableRow, TableCell, Paper } from '@mui/material';
import TableHead from '@mui/material/TableHead';
import PageContent from '@App/component/customs/PageContent';
import ScrollbarBase from '@App/component/customs/ScrollbarBase';
import hendleDateTime from '@Core/Helper/hendleDateTime';

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

   const suppliesInvoicesDetails = [
      { label: 'Mã hóa đơn', value: suppliesinvoices?.code },
      { label: 'Người tạo phiếu', value: suppliesinvoices?.personnel.full_name },
      { label: 'Mô tả', value: suppliesinvoices?.describe },
      { label: 'Tổng tiền', value: suppliesinvoices?.transactions.total_price },
      { label: 'HT thanh toán', value: suppliesinvoices?.transactions.payment_type },
      { label: 'Tiền mặt', value: suppliesinvoices?.transactions.transfer_money },
      { label: 'Chuyển khoản', value: suppliesinvoices?.transactions.cash_money },
      { label: 'Ngày tạo', value: hendleDateTime(suppliesinvoices?.createdAt) },
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
      <BaseBreadcrumbs breadcrumbs={breadcrumbs} arialabel="Chi tiết phiếu nhập hàng">
         <PageContent>
            {suppliesinvoices && (
               <Stack>
                  <Box sx={{ ml: '25px', mr: '25px' }}>
                     <Grid container spacing={2}>
                        <Grid item xs={12}>
                           <Typography sx={{ fontWeight: '600', fontSize: '1.5rem', color: theme.palette.grey[800] }}>
                              Thông tin phiếu nhập hàng
                           </Typography>
                        </Grid>

                        {suppliesInvoicesDetails?.map((detail, index) => (
                           <>
                              <Grid item xs={2} key={index}>
                                 <Typography sx={{ fontSize: '1rem', color: theme.palette.grey[800] }}>
                                    {detail.label}
                                 </Typography>
                              </Grid>
                              <Grid item xs={10}>
                                 <Typography
                                    sx={{ fontSize: '1rem', lineHeight: '32px', height: '32px', fontWeight: '500' }}
                                 >
                                    {detail.value}
                                 </Typography>
                                 <Divider variant="inset" sx={{ ml: 0 }} />
                              </Grid>
                           </>
                        ))}
                     </Grid>
                     <Grid container spacing={2} mt={3}>
                        <Grid item xs={12}>
                           <Typography sx={{ fontWeight: '600', fontSize: '1.5rem', color: theme.palette.grey[800] }}>
                              Thông tin chi tiết phiếu nhập hàng
                           </Typography>
                        </Grid>
                        <TableContainer component={Paper}>
                           <ScrollbarBase>
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
                           </ScrollbarBase>
                        </TableContainer>
                     </Grid>
                  </Box>
               </Stack>
            )}
         </PageContent>
      </BaseBreadcrumbs>
   );
};

export default SuppliesInvoicesDetails;
