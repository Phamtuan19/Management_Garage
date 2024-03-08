/* eslint-disable @typescript-eslint/naming-convention */
import { ResponseGetSuppliesInvoice, SuppliesInvoiceDetails } from '@App/services/supplies-invoice';
import TableCore, { columnHelper } from '@Core/Component/Table';
import formatDateTime from '@Core/Helper/formatDateTime';
import formatPrice from '@Core/Helper/formatPrice';
import { Box, Chip } from '@mui/material';
import React, { useMemo } from 'react';

const DetailTable = ({ suppliesinvoices }: { suppliesinvoices: ResponseGetSuppliesInvoice | undefined }) => {
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
               <Box sx={{ maxWidth: '250px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{info.getValue()}</Box>
            ),
         }),
         columnHelper.accessor('name_detail', {
            header: () => <Box>Tên vật tư theo NPP</Box>,
            cell: (info) => (
               <Box sx={{ maxWidth: '250px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{info.getValue()}</Box>
            ),
         }),
         columnHelper.accessor('distributor.name', {
            header: () => <Box>Nhà phân phối</Box>,
            cell: (info) => (
               <Box sx={{ maxWidth: '250px', textOverflow: 'ellipsis', overflow: 'hidden' }}>{info.getValue()}</Box>
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
         columnHelper.accessor('supplies_detail.unit', {
            header: () => <Box sx={{ textAlign: 'center' }}>DV Tính</Box>,
            cell: (info) => (
               <Box sx={{ textAlign: 'center' }}>
                  <Chip label={info.getValue()} color="default" />
               </Box>
            ),
         }),
         columnHelper.accessor('quantity_received', {
            header: () => <Box sx={{ textAlign: 'center' }}>SL nhập</Box>,
            cell: (info) => <Box sx={{ textAlign: 'center' }}>{info.getValue()}</Box>,
         }),
         columnHelper.accessor('cost_price', {
            header: () => <Box sx={{ textAlign: 'center' }}>Giá nhập</Box>,
            cell: (info) => <Box sx={{}}>{formatPrice(info.getValue())}</Box>,
         }),
         columnHelper.accessor('selling_price', {
            header: () => <Box sx={{ textAlign: 'center' }}>Giá bán</Box>,
            cell: (info) => <Box sx={{ textAlign: 'center' }}>{formatPrice(info.getValue())}</Box>,
         }),
         columnHelper.accessor('discount', {
            header: () => <Box sx={{ textAlign: 'center' }}>Giảm giá</Box>,
            cell: (info) => <Box sx={{ textAlign: 'center' }}>{info.getValue()}%</Box>,
         }),
         columnHelper.accessor('quantity_sold', {
            header: () => <Box sx={{ textAlign: 'center' }}>SL bán</Box>,
            cell: (info) => (
               <Box sx={{ textAlign: 'center' }}>
                  <Chip label={info.getValue()} color="info" />
               </Box>
            ),
         }),
         columnHelper.accessor('createdAt', {
            header: () => <Box sx={{ textAlign: 'center' }}>Ngày tạo</Box>,
            cell: (info) => <Box sx={{}}>{formatDateTime(info.getValue())}</Box>,
         }),
      ];
   }, []);

   return <TableCore height={450} columns={columns} data={suppliesinvoices?.details ?? []} isPagination={false} />;
};

export default React.memo(DetailTable);
