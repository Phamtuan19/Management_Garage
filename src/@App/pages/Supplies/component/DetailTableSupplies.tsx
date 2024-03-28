/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import TableCore, { columnHelper } from '@Core/Component/Table';
import formatDateTime from '@Core/Helper/formatDateTime';
import formatPrice from '@Core/Helper/formatPrice';
import { Box, ButtonBase, Chip, Drawer, Grid, Modal, Typography } from '@mui/material';
import React, { useMemo, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { SuppliesFindOne } from '@App/services/supplies.service';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import MODULE_PAGE from '@App/configs/module-page';
import { CoreTableActionHistory } from '@Core/Component/Table/components/CoreTableAction';
import { useMutation } from '@tanstack/react-query';
import suppliesInvoiceDetailService from '@App/services/supplies-invoice-detail';

interface DetailTableSuppliesProps {
   supplies: SuppliesFindOne | undefined;
}

interface SuppliesItem {
   _id: string;
   code: string;
   supplies_id: string;
   distributor_id: string;
   name_detail: string;
   imported_price: number;
   selling_price: number;
   isInStock: true;
   describe: string;
   distributor_name: string;
   createdAt: string;
   updatedAt: string;
   car: Array<string>;
   total_quantity_sold: number;
}

const DetailTableSupplies = ({ supplies }: DetailTableSuppliesProps) => {
   const [open, setOpen] = useState<boolean>(false);
   const [openDrawer, setOpenDrawer] = useState<boolean>(false);
   const [suppliesItem, setSuppliesItem] = useState<SuppliesItem | null>(null);

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

   const drawerSupplieDetailItem = useMemo(() => {
      return suppliesItem
         ? [
              {
                 title: 'Mã vật tư chi tiết',
                 value: '#' + suppliesItem?.code,
                 border: true,
              },
              {
                 title: 'Tên vật tư',
                 value: suppliesItem?.name_detail,
                 border: true,
              },
              {
                 title: 'Nhà cung cấp',
                 value: suppliesItem?.distributor_name,
                 border: true,
              },
              {
                 title: 'Giá nhập dự kiến',
                 value: formatPrice(suppliesItem?.imported_price ?? 0),
                 border: true,
              },
              {
                 title: 'Số lượng tồn kho',
                 value: suppliesItem?.total_quantity_sold,
                 border: true,
              },
              {
                 title: 'Trạng thái',
                 value: (
                    <Chip
                       label={suppliesItem?.isInStock ? 'Còn hàng' : 'Hết hàng'}
                       color={suppliesItem?.isInStock ? 'success' : 'error'}
                    />
                 ),
                 border: false,
              },
              {
                 title: 'Loại xe sử dụng',
                 value: (
                    <Box display="flex" alignItems="center" flexWrap="wrap" gap={1}>
                       {suppliesItem?.car.map((item) => {
                          return <Chip label={item} color="default" />;
                       })}
                    </Box>
                 ),
                 border: false,
              },
              {
                 title: 'Ngày tạo',
                 value: suppliesItem ? formatDateTime(suppliesItem.createdAt) : '',
                 border: true,
              },
           ]
         : [];
   }, [suppliesItem]);

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
            cell: (info) => (
               <Box sx={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis' }}>{info.getValue()}</Box>
            ),
         }),

         columnHelper.accessor('distributor_name', {
            header: 'Nhà cung cấp',
            cell: (info) => (
               <Box sx={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis' }}>{info.getValue()}</Box>
            ),
         }),
         columnHelper.accessor('total_quantity_sold', {
            header: () => <Box textAlign="center">Số lượng tồn</Box>,
            cell: (info) => (
               <Box textAlign="center">
                  <Chip label={info.getValue()} color="info" />
               </Box>
            ),
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
            header: () => <Box textAlign="center">Ngày tạo</Box>,
            cell: (info) => {
               return (
                  <Box display="flex" justifyContent="center">
                     {formatDateTime(info.getValue())}
                  </Box>
               );
            },
         }),
         columnHelper.accessor('action', {
            header: () => <Box textAlign="center">Mô tả</Box>,
            cell: ({ row }) => {
               const data = row.original as any;

               return (
                  <PermissionAccessRoute module={MODULE_PAGE.SUPPLIES} action="VIEW_ONE">
                     <CoreTableActionHistory
                        title="Lịch sử nhập hàng"
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
            cell: (info) => (
               <Box sx={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis' }}>{info.getValue()}</Box>
            ),
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
            header: () => <Box sx={{ textAlign: 'center' }}>SL nhập</Box>,
            cell: (info) => <Box sx={{ textAlign: 'center' }}>{info.getValue()}</Box>,
         }),
         columnHelper.accessor('quantity_sold', {
            header: () => <Box sx={{ textAlign: 'center' }}>SL tồn</Box>,
            cell: ({ row }) => {
               const supplies = row.original as any;
               return <Box sx={{ textAlign: 'center' }}>{supplies.quantity_sold}</Box>;
            },
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
            height={370}
            onClickRow={(row) => {
               const data = row.original as SuppliesItem;
               getSuppliesInvoiceDetail(data._id);
               setOpenDrawer(true);
               setSuppliesItem(data);
            }}
            columns={columns}
            data={supplies?.details ?? []}
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
         <Drawer open={openDrawer} anchor="right">
            {suppliesItem && (
               <Box sx={{ minWidth: 600, maxWidth: 700 }}>
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
                     <Typography>Thông tin vật tư chi tiết</Typography>
                     <Box>
                        <ButtonBase onClick={() => setOpenDrawer(false)}>
                           <CloseIcon />
                        </ButtonBase>
                     </Box>
                  </Box>
                  <Box sx={{ px: '12px', py: '12px' }}>
                     {drawerSupplieDetailItem.map((item, index) => {
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
