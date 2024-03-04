import Switch from '@App/component/customs/Switch';
import { RepairOrderSupplies } from '@App/services/repairorder.service';
import TableCore, { columnHelper } from '@Core/Component/Table';
import handlePrice from '@Core/Helper/handlePrice';
import { Box, Chip } from '@mui/material';
import React from 'react';

const RepairOrderDetails = ({ supplies }: { supplies: RepairOrderSupplies[] }) => {
   const columns = [
      columnHelper.accessor('', {
         id: 'stt',
         header: () => <Box sx={{ textAlign: 'center' }}>STT</Box>,
         cell: ({ row }) => <Box sx={{ textAlign: 'center', p: 1 }}>{row.index + 1}</Box>,
      }),
      columnHelper.accessor('supplies_detail_code', {
         header: () => <Box sx={{ textAlign: 'center' }}>Mã VT</Box>,
         cell: ({ row }) => {
            const supplies = row.original as RepairOrderSupplies;
            return <Box sx={{ textAlign: 'center' }}>#{supplies.supplies_detail.code}</Box>;
         },
      }),
      columnHelper.accessor('supplies_detail_name', {
         header: () => <Box>Tên VT</Box>,
         cell: ({ row }) => {
            const supplies = row.original as RepairOrderSupplies;
            return (
               <Box sx={{ textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '250px' }}>
                  {supplies.supplies_detail.name_detail}
               </Box>
            );
         },
      }),
      columnHelper.accessor('distributor_name', {
         header: () => <Box>Nhà phân phối</Box>,
         cell: (info) => {
            return (
               <Box sx={{ textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '250px' }}>{info.getValue()}</Box>
            );
         },
      }),
      columnHelper.accessor('supplies_invoices_code', {
         header: () => <Box sx={{ textAlign: 'center' }}>Mã lô</Box>,
         cell: ({ row }) => {
            const supplies = row.original as RepairOrderSupplies;
            return <Box sx={{ textAlign: 'center' }}>#{supplies.supplies_invoices_code}</Box>;
         },
      }),
      columnHelper.accessor('selling_price', {
         header: () => <Box sx={{ textAlign: 'center' }}>Giá</Box>,
         cell: ({ row }) => {
            const supplies = row.original as RepairOrderSupplies;
            return <Box sx={{ textAlign: 'center' }}>{handlePrice(supplies.price)}</Box>;
         },
      }),
      // columnHelper.accessor('discount', {
      //    header: () => <Box sx={{ textAlign: 'center' }}>Giảm giá</Box>,
      //    cell: (info) => <Box sx={{ textAlign: 'center' }}>{handlePrice(form.watch(`suppliesInvoice.${row.index}`))}</Box>,
      // }),
      columnHelper.accessor('quantity', {
         header: () => <Box sx={{ textAlign: 'center' }}>Số lượng</Box>,
         cell: ({ row }) => {
            const supplies = row.original as RepairOrderSupplies;
            return (
               <Box sx={{ textAlign: 'center' }}>
                  <Chip label={supplies.quantity} color="info" />
               </Box>
            );
         },
      }),
      columnHelper.accessor('total_price', {
         header: () => <Box sx={{ textAlign: 'center' }}>Tổng</Box>,
         cell: ({ row }) => {
            const supplies = row.original as RepairOrderSupplies;
            const total =
               Number(supplies.supplies_detail_selling_price) -
               (Number(supplies.quantity) *
                  Number(supplies.supplies_detail_selling_price) *
                  Number(supplies.discount)) /
                  100;
            return <Box sx={{ textAlign: 'center' }}>{handlePrice(total)}</Box>;
         },
      }),
      columnHelper.accessor('quantity', {
         header: () => <Box sx={{ textAlign: 'center' }}>SL kho đã xuất</Box>,
         cell: ({ row }) => {
            const supplies = row.original as RepairOrderSupplies;
            return (
               <Box sx={{ textAlign: 'center' }}>
                  <Chip label={supplies.export_quantity} color="success" />
               </Box>
            );
         },
      }),
      columnHelper.accessor('quantity', {
         header: () => <Box sx={{ textAlign: 'center' }}>SL thiếu</Box>,
         cell: ({ row }) => {
            const supplies = row.original as RepairOrderSupplies;
            return (
               <Box sx={{ textAlign: 'center' }}>
                  <Chip label={supplies.quantity - supplies.export_quantity} color="error" />
               </Box>
            );
         },
      }),
      columnHelper.accessor('total_price', {
         header: () => <Box sx={{ textAlign: 'center' }}>Xuất kho</Box>,
         cell: ({ row }) => {
            const supplies = row.original as RepairOrderSupplies;
            return (
               <Box sx={{ textAlign: 'center' }}>
                  <Switch sx={{ m: 1 }} checked={supplies.quantity - supplies.export_quantity === 0} />
               </Box>
            );
         },
      }),
   ];

   return <TableCore height={320} columns={columns} data={supplies} isPagination={false} />;
};

export default React.memo(RepairOrderDetails);
