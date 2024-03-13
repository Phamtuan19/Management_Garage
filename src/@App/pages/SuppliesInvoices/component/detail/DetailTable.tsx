/* eslint-disable @typescript-eslint/naming-convention */
import { ResponseGetSuppliesInvoice, SuppliesInvoiceDetails } from '@App/services/supplies-invoice';
import TableCore, { columnHelper } from '@Core/Component/Table';
import formatPrice from '@Core/Helper/formatPrice';
import { Box, ButtonBase, Chip, Drawer, Grid, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Row } from '@tanstack/react-table';

const DetailTable = ({ suppliesinvoices }: { suppliesinvoices: ResponseGetSuppliesInvoice | undefined }) => {
   const [open, setOpen] = useState<boolean>(false);
   const [suppliesInvoiceItem, setSuppliesInvoiceItem] = useState<SuppliesInvoiceDetails | null>(null);

   const drawerItem = useMemo(() => {
      return suppliesInvoiceItem
         ? [
              {
                 title: 'Mã vật tư',
                 value: `#${suppliesInvoiceItem.supplies_detail.code}`,
                 border: true,
              },
              {
                 title: 'Tên vật chính',
                 value: suppliesInvoiceItem.supplies_detail.name_supplies,
                 border: true,
              },
              {
                 title: 'Tên vật tư theo NPP',
                 value: suppliesInvoiceItem.supplies_detail.name_detail,
                 border: true,
              },
              {
                 title: 'Tên Nhà phân phối',
                 value: suppliesInvoiceItem.distributor.name,
                 border: true,
              },
              {
                 title: 'Đơn vị tính',
                 value: suppliesInvoiceItem.supplies_detail.unit,
                 border: true,
              },
              {
                 title: 'Trạng thái đơn hàng',
                 value: (
                    <Box>
                       <Chip
                          label={
                             suppliesInvoiceItem.quantity_received - suppliesInvoiceItem.quantity_sold === 0
                                ? 'hết hàng'
                                : 'Còn hàng'
                          }
                          color={
                             suppliesInvoiceItem.quantity_received - suppliesInvoiceItem.quantity_sold === 0
                                ? 'error'
                                : 'info'
                          }
                       />
                    </Box>
                 ),
                 border: false,
              },
              {
                 title: 'Tồn kho',
                 value:
                    suppliesInvoiceItem.quantity_received -
                    suppliesInvoiceItem.quantity_sold +
                    ` ${suppliesInvoiceItem.supplies_detail.unit}`,
                 border: true,
              },
              {
                 title: 'Số lượng nhập',
                 value: suppliesInvoiceItem.quantity_received + ' ' + suppliesInvoiceItem.supplies_detail.unit,
                 border: true,
              },
              {
                 title: 'Giá nhập',
                 value: formatPrice(suppliesInvoiceItem.cost_price),
                 border: true,
              },
              {
                 title: 'Giá bán',
                 value: formatPrice(suppliesInvoiceItem.selling_price),
                 border: true,
              },
              {
                 title: 'Giảm giá',
                 value: suppliesInvoiceItem.discount + '%',
                 border: true,
              },
              {
                 title: 'Số lượng đã bán',
                 value: suppliesInvoiceItem.quantity_sold,
                 border: true,
              },
           ]
         : [];
   }, [suppliesInvoiceItem]);

   const columns = useMemo(() => {
      return [
         columnHelper.accessor((_, index) => index + 1, {
            id: 'STT',
            header: () => <Box sx={{ textAlign: 'center' }}>STT</Box>,
            cell: (info) => <Box sx={{ textAlign: 'center' }}>{info.getValue()}</Box>,
         }),
         columnHelper.accessor('supplies_detail.code', {
            header: () => <Box sx={{ textAlign: 'center' }}>Mã Vt</Box>,
            cell: (info) => <Box sx={{ textAlign: 'center' }}>#{info.getValue()}</Box>,
         }),
         columnHelper.accessor('supplies_detail.name_supplies', {
            header: () => <Box>Tên vật tư chính</Box>,
            cell: (info) => (
               <Box sx={{ maxWidth: '350px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{info.getValue()}</Box>
            ),
         }),
         columnHelper.accessor('name_detail', {
            header: () => <Box>Tên vật tư theo NPP</Box>,
            cell: (info) => (
               <Box sx={{ maxWidth: '350px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{info.getValue()}</Box>
            ),
         }),
         columnHelper.accessor('distributor.name', {
            header: () => <Box>Nhà phân phối</Box>,
            cell: (info) => (
               <Box sx={{ maxWidth: '350px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{info.getValue()}</Box>
            ),
         }),
         columnHelper.accessor('status_quantity_sold', {
            header: () => <Box sx={{ textAlign: 'center' }}>Trạng thái</Box>,
            cell: ({ row }) => {
               const suppliesInvoiceDetails = row.original as SuppliesInvoiceDetails;

               return (
                  <Box sx={{ textAlign: 'center' }}>
                     <Chip
                        label={
                           suppliesInvoiceDetails.quantity_received - suppliesInvoiceDetails.quantity_sold === 0
                              ? 'hết hàng'
                              : 'Còn hàng'
                        }
                        color="info"
                     />
                  </Box>
               );
            },
         }),
      ];
   }, []);

   return (
      <>
         <TableCore
            onClickRow={(row: Row<SuppliesInvoiceDetails>) => {
               setOpen(true);
               setSuppliesInvoiceItem(row.original);
            }}
            height={450}
            columns={columns}
            data={suppliesinvoices?.details ?? []}
            isPagination={false}
         />
         <Drawer open={open} anchor="right">
            {suppliesInvoiceItem && (
               <Box sx={{ minWidth: 600 }}>
                  <Box
                     sx={({ palette, base }) => ({
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        borderBottom: '1px solid #DADADA',
                        p: '12px 24px 6px 24px',
                        color: base.text.white,
                        backgroundColor: palette.primary.main,
                     })}
                  >
                     <Typography>
                        Thông tin - {suppliesInvoiceItem.supplies_detail.name_detail} (#{suppliesinvoices?.code})
                     </Typography>
                     <Box>
                        <ButtonBase onClick={() => setOpen(false)}>
                           <CloseIcon />
                        </ButtonBase>
                     </Box>
                  </Box>
                  <Box sx={{ px: '12px', py: '12px' }}>
                     {drawerItem.map((item, index) => {
                        return (
                           <Grid container key={index}>
                              <Grid item xs={4} paddingBottom={2}>
                                 <Typography
                                    sx={({ palette }) => ({
                                       fontSize: '1rem',
                                       lineHeight: '2.2rem',
                                       color: palette.grey[800],
                                    })}
                                 >
                                    {item.title}
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
                                       minHeight: '40px',
                                    }}
                                 >
                                    {item.value}
                                 </Typography>
                                 {item.border && <Box sx={{ borderBottom: '1px solid #DADADA' }}></Box>}
                              </Grid>
                           </Grid>
                        );
                     })}
                  </Box>
               </Box>
            )}
         </Drawer>
      </>
   );
};

export default React.memo(DetailTable);
