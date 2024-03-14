/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/naming-convention */
import distributorService, { DistributorSuppliesInvoice } from '@App/services/distributor.service';
import TableCore, { columnHelper } from '@Core/Component/Table';
import { CoreTableActionViewDetail } from '@Core/Component/Table/components/CoreTableAction';
import formatDateTime from '@Core/Helper/formatDateTime';
import formatPrice from '@Core/Helper/formatPrice';
import { Box, ButtonBase, Chip, Modal, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import suppliesInvoiceDetailService from '@App/services/supplies-invoice-detail';

const DetailTableSupplies = () => {
   const { id: distributorId } = useParams();

   const [open, setOpen] = useState<boolean>(false);

   const { data: suppliesDetail, isLoading: isSuppliesDetailLoading } = useQuery(
      ['getDistributorsSuppliesInvoice', distributorId],
      async () => {
         const res = await distributorService.getDistributorsSuppliesInvoice(distributorId as string);
         return res.data;
      },
   );

   const {
      data: suppliesInvoiceDetails,
      mutate: getSuppliesInvoiceDetail,
      isLoading: isSuppliesInvoiceDetailsLoading,
   } = useMutation({
      mutationFn: async (id: string) => {
         const res = await suppliesInvoiceDetailService.getBySupplieDetailId(id);
         return res.data;
      },
   });

   const columns = useMemo(() => {
      return [
         columnHelper.accessor((_, index) => index + 1, {
            id: 'STT',
            header: () => <Box sx={{ textAlign: 'center' }}>STT</Box>,
            cell: (info) => <Box sx={{ textAlign: 'center' }}>{info.getValue()}</Box>,
         }),
         columnHelper.accessor('code', {
            header: () => <Box sx={{ textAlign: 'center' }}>Mã</Box>,
            cell: (info) => <Box sx={{ textAlign: 'center' }}>#{info.getValue()}</Box>,
         }),
         columnHelper.accessor('supplies.name', {
            header: 'Tên vật tư chính',
            cell: (info) => <Box>{info.getValue()}</Box>,
         }),
         columnHelper.accessor('name_detail', {
            header: 'Tên vật tư theo NPP',
            cell: (info) => <Box>{info.getValue()}</Box>,
         }),
         columnHelper.accessor('supplies.unit', {
            header: () => <Box sx={{ textAlign: 'center' }}>Dvt</Box>,
            cell: (info) => (
               <Box sx={{ textAlign: 'center' }}>
                  <Chip label={info.getValue()} color="info" />
               </Box>
            ),
         }),
         columnHelper.accessor('imported_price', {
            header: 'Giá nhập DK',
            cell: (info) => <Box textAlign="center">{formatPrice(info.getValue())}</Box>,
         }),
         columnHelper.accessor('selling_price', {
            header: 'Giá bán DK',
            cell: (info) => <Box textAlign="center">{formatPrice(info.getValue())}</Box>,
         }),
         columnHelper.accessor('quantity_received', {
            header: 'SL đã nhập',
            cell: (info) => (
               <Box textAlign="center">
                  <Chip label={info.getValue()} color="default" />
               </Box>
            ),
         }),
         columnHelper.accessor('quantity_sold', {
            header: 'SL đã bán',
            cell: (info) => (
               <Box textAlign="center">
                  <Chip label={info.getValue()} color="success" />
               </Box>
            ),
         }),
         columnHelper.accessor('stock', {
            header: 'SL đã bán',
            cell: ({ row }) => {
               const data = row.original as any;

               return (
                  <Box textAlign="center">
                     <Chip label={data.quantity_received - data.quantity_sold} color="default" />
                  </Box>
               );
            },
         }),
         columnHelper.accessor('isInStock', {
            header: 'Trạng thái',
            cell: (info) => (
               <Box>
                  <Chip label={info.getValue() ? 'Còn hàng' : 'Hết hàng'} color={info.getValue() ? 'info' : 'error'} />
               </Box>
            ),
         }),
         columnHelper.accessor('createdAt', {
            header: 'Ngày tạo',
            cell: (info) => <Box>{formatDateTime(info.getValue())}</Box>,
         }),
         columnHelper.accessor('action', {
            header: 'Thao tác',
            cell: ({ row }) => {
               const data = row.original as DistributorSuppliesInvoice;

               return (
                  <Box display="flex" justifyContent="center">
                     <CoreTableActionViewDetail
                        callback={() => {
                           setOpen(true);
                           getSuppliesInvoiceDetail(data._id);
                        }}
                     />
                  </Box>
               );
            },
         }),
      ];
   }, []);

   const columnsSuppliesInvoice = useMemo(() => {
      return [
         columnHelper.accessor((_, index) => index + 1, {
            id: 'STT',
            header: () => <Box sx={{ textAlign: 'center' }}>STT</Box>,
            cell: (info) => <Box sx={{ textAlign: 'center', py: 1 }}>{info.getValue()}</Box>,
         }),
         columnHelper.accessor('supplies_invoice_id.code', {
            header: () => <Box sx={{ textAlign: 'center' }}>Mã HĐ</Box>,
            cell: (info) => <Box sx={{ textAlign: 'center' }}>#{info.getValue()}</Box>,
         }),
         columnHelper.accessor('supplies_detail_id.name_detail', {
            header: 'Tên vật tư theo NPP',
            cell: (info) => <Box>{info.getValue()}</Box>,
         }),
         columnHelper.accessor('supplies_detail_id.isInStock', {
            header: () => <Box sx={{ textAlign: 'center' }}>Trạng thái</Box>,
            cell: (info) => (
               <Box sx={{ textAlign: 'center' }}>
                  <Chip
                     label={info.getValue() ? 'Còn hàng' : 'Hết hàng'}
                     color={info.getValue() ? 'success' : 'error'}
                  />
               </Box>
            ),
         }),
         columnHelper.accessor('quantity_received', {
            header: () => <Box>SL nhập</Box>,
            cell: (info) => <Box sx={{ textAlign: 'center' }}>{info.getValue()}</Box>,
         }),
         columnHelper.accessor('quantity_sold', {
            header: () => <Box>SL bán</Box>,
            cell: (info) => <Box sx={{ textAlign: 'center' }}>{info.getValue()}</Box>,
         }),
         columnHelper.accessor('cost_price', {
            header: 'Giá nhập',
            cell: (info) => <Box>{formatPrice(info.getValue())}</Box>,
         }),
         columnHelper.accessor('selling_price', {
            header: 'Giá bán',
            cell: (info) => <Box>{formatPrice(info.getValue())}</Box>,
         }),
         columnHelper.accessor('discount', {
            header: () => <Box sx={{ textAlign: 'center' }}>Giảm giá</Box>,
            cell: (info) => <Box sx={{ textAlign: 'center' }}>{info.getValue()}%</Box>,
         }),
         columnHelper.accessor('createdAt', {
            header: 'Ngày tạo',
            cell: (info) => <Box>{formatDateTime(info.getValue())}</Box>,
         }),
      ];
   }, []);

   return (
      <>
         <TableCore
            columns={columns}
            data={suppliesDetail ?? []}
            isLoading={isSuppliesDetailLoading}
            isPagination={false}
         />
         <Modal open={open} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
            <Box sx={style}>
               <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                     Lịch sử nhập hàng
                  </Typography>
                  <ButtonBase
                     onClick={() => {
                        setOpen(false);
                     }}
                  >
                     <CloseIcon />
                  </ButtonBase>
               </Box>
               <TableCore
                  height={410}
                  isLoading={isSuppliesInvoiceDetailsLoading}
                  columns={columnsSuppliesInvoice}
                  data={suppliesInvoiceDetails ?? []}
                  isPagination={false}
               />
            </Box>
         </Modal>
      </>
   );
};

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 1200,
   bgcolor: 'background.paper',
   borderRadius: '6px',
   boxShadow: 24,
   p: '12px',
};

export default React.memo(DetailTableSupplies);
