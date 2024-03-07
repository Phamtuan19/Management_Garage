/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import TableCore, { columnHelper } from '@Core/Component/Table';
import formatDateTime from '@Core/Helper/formatDateTime';
import formatPrice from '@Core/Helper/formatPrice';
import { Box, ButtonBase, Chip, Modal, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { SuppliesFindOne } from '@App/services/supplies.service';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import MODULE_PAGE from '@App/configs/module-page';
import { CoreTableActionViewDetail } from '@Core/Component/Table/components/CoreTableAction';
import { useMutation } from '@tanstack/react-query';
import suppliesInvoiceDetailService from '@App/services/supplies-invoice-detail';

interface DetailTableSuppliesProps {
   supplies: SuppliesFindOne | undefined;
}

const DetailTableSupplies = ({ supplies }: DetailTableSuppliesProps) => {
   const [open, setOpen] = useState<boolean>(false);

   const {
      data: suppliesInvoiceDetails,
      mutate: getSuppliesInvoiceDetail,
      isLoading: isSuppliesInvoiceDetailsLoading,
   } = useMutation({
      mutationFn: async (id: string) => {
         const res = await suppliesInvoiceDetailService.getByDistributor(id);
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
         columnHelper.accessor('name_detail', {
            header: () => <Box>Tên biến thể</Box>,
            cell: (info) => <Box>{info.getValue()}</Box>,
         }),

         columnHelper.accessor('distributor_name', {
            header: 'Nhà cung cấp',
         }),
         columnHelper.accessor('imported_price', {
            header: () => <Box>Giá nhập dự kiến</Box>,
            cell: (info) => <Box sx={{ display: 'flex', alignItems: 'center' }}>{formatPrice(info.getValue())}</Box>,
         }),
         columnHelper.accessor('isInStock', {
            header: () => <Box textAlign="center">Trạng thái</Box>,
            cell: (info) => {
               return (
                  <Box display="flex" justifyContent="center">
                     <Chip
                        label={info.getValue() ? 'Còn hàng' : 'Hết hàng'}
                        color={!info.getValue() ? 'error' : 'success'}
                     />
                  </Box>
               );
            },
         }),
         columnHelper.accessor('createdAt', {
            header: () => <Box textAlign="center">Mô tả</Box>,
            cell: (info) => {
               return (
                  <Box display="flex" justifyContent="center">
                     {formatDateTime(info.getValue())}
                  </Box>
               );
            },
         }),
         columnHelper.accessor('Thao tác', {
            header: () => <Box textAlign="center">Mô tả</Box>,
            cell: ({ row }) => {
               const data = row.original as any;

               return (
                  <PermissionAccessRoute module={MODULE_PAGE.SUPPLIES} action="VIEW_ONE">
                     <CoreTableActionViewDetail
                        callback={() => {
                           setOpen(true);
                           return getSuppliesInvoiceDetail(data._id as string);
                        }}
                     />
                  </PermissionAccessRoute>
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
            header: () => <Box sx={{ textAlign: 'center' }}>SL nhập</Box>,
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
         <TableCore height={370} columns={columns} data={supplies?.details ?? []} isPagination={false} />
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
