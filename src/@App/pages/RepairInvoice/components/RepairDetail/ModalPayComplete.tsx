/* eslint-disable @typescript-eslint/naming-convention */
import {
   Box,
   Button,
   Modal,
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableRow,
   Typography,
   styled,
   tableCellClasses,
} from '@mui/material';
import React from 'react';
import { ResponseFindOneRepairInvoice } from '@App/types/repair-invoice';
import ScrollbarBase from '@App/component/customs/ScrollbarBase';
import { LoadingButton } from '@mui/lab';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, useMutation } from '@tanstack/react-query';
import repairInvoiceService from '@App/services/repair-invoice';
import { STATUS_REPAIR } from '@App/configs/status-config';
import { useParams } from 'react-router-dom';
import { AxiosResponseData } from '@Core/Api/axios-config';
import { errorMessage, successMessage } from '@Core/Helper/message';
import { AxiosError } from 'axios';
import { useConfirm } from '@Core/Component/Comfirm/CoreComfirm';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import formatPrice from '@Core/Helper/formatPrice';

import RowTablePay from './RowTablePay';

interface ModalPayProps {
   open: boolean;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
   repairInvoice: ResponseFindOneRepairInvoice | undefined;
   refetchRepairInvoice: <TPageData>(
      options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
   ) => Promise<QueryObserverResult<ResponseFindOneRepairInvoice, unknown>>;
}

const ModalPayComplete = ({ open, setOpen, repairInvoice, refetchRepairInvoice }: ModalPayProps) => {
   const { id: repairInvoicId } = useParams();
   const coreConfirm = useConfirm();

   const data = [
      ...(repairInvoice?.repairInvoiceService.map((item) => ({
         name: item.service_name,
         unit: 'Lần',
         sl: 1,
         price: item.price ?? 0,
         discount: item.discount,
         total_price: item.price - (item.price * item.discount) / 100,
      })) ?? []),

      ...(repairInvoice?.repairInvoiceSupplies.map((item) => {
         const maxPrice =
            item.options.length > 0 ? Math.max(...item.options.map((v) => v.selling_price)) : item.max_price;
         const minPrice =
            item.options.length > 0 ? Math.min(...item.options.map((v) => v.selling_price)) : item.min_price;

         const price = maxPrice === minPrice ? maxPrice : `${minPrice} - ${maxPrice}`;

         const total = item.options.reduce(
            (total, v) => (total += (v.selling_price - (v.selling_price * v.discount) / 100) * v.export_quantity),
            0,
         );

         return {
            name: item.supplies_detail_name,
            unit: item.unit,
            sl: 1,
            price: price,
            discount: item.discount ?? 0,
            options: item.options,
            total_price: total,
         };
      }) ?? []),
   ];

   const { mutate: handleUpdateRepairInvoiceStatus } = useMutation({
      mutationFn: async () => {
         const total_price = data.reduce((total, item) => (total += item.total_price), 0);

         return await repairInvoiceService.update(
            { status: STATUS_REPAIR.complete.key, total_price: total_price },
            repairInvoicId,
            'patch',
         );
      },
      onSuccess: async (data: AxiosResponseData) => {
         await refetchRepairInvoice();
         setOpen(false);
         successMessage(data.message);
         return data;
      },
      onError: (err: AxiosError) => {
         return errorMessage(err);
      },
   });

   const handleClick = () => {
      return coreConfirm({
         icon: <ErrorOutlineIcon sx={{ fontSize: '56px' }} color="warning" />,
         title: 'Cảnh báo',
         confirmOk: 'Xác nhận',
         content: 'Xác nhận thanh toán phiếu sửa chữa.',
         callbackOK: () => {
            handleUpdateRepairInvoiceStatus();
         },
         isIcon: true,
      });
   };

   return (
      <div>
         <Modal open={open}>
            <Box sx={style}>
               <Box display="flex" justifyContent="space-between" borderBottom="1px solid #DADADA">
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                     Hóa đơn thanh toán
                  </Typography>
               </Box>
               <Box sx={{ mt: 2 }}>
                  <ScrollbarBase sx={{ height: 530, border: '1px solid rgba(224, 224, 224, 1)', borderRadius: '6px' }}>
                     <Table sx={{ maxHeight: 530 }} aria-label="caption table">
                        <TableHead>
                           <TableRow>
                              <ExtendTableCell width={50}></ExtendTableCell>
                              <ExtendTableCell>Vật tư & Dịch vụ</ExtendTableCell>
                              <ExtendTableCell width={70} align="center">
                                 DVT
                              </ExtendTableCell>
                              <ExtendTableCell align="center" width={50}>
                                 SL
                              </ExtendTableCell>
                              <ExtendTableCell width={140}>Đơn giá</ExtendTableCell>
                              <ExtendTableCell width={140}>Giảm giá</ExtendTableCell>
                              <ExtendTableCell width={140}>Thành tiền</ExtendTableCell>
                           </TableRow>
                        </TableHead>
                        <TableBody>
                           {data.map((item) => {
                              return <RowTablePay row={item as never} />;
                           })}
                        </TableBody>
                     </Table>
                  </ScrollbarBase>
               </Box>
               <Box mt={1.5}>
                  <Box mt={1.5} display="flex" justifyContent="space-between" gap={1.5}>
                     <Box width="40%" maxWidth={300} display="flex" justifyContent="space-between">
                        <ControllerLabel title="Tổng hóa đơn:" />
                        <ExtendTypography sx={{ fontWeight: 600, fontSize: '18px' }}>
                           {formatPrice(data.reduce((total, item) => (total += item.total_price), 0)) ?? 0}
                        </ExtendTypography>
                     </Box>
                     <Box display="flex" justifyContent="space-between" gap={1.5}>
                        <Button variant="contained" color="error" onClick={() => setOpen(false)}>
                           Hủy
                        </Button>
                        <LoadingButton variant="contained" onClick={handleClick}>
                           Thanh toán
                        </LoadingButton>
                     </Box>
                  </Box>
               </Box>
            </Box>
         </Modal>
      </div>
   );
};

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 1200,
   height: 680,
   bgcolor: 'background.paper',
   borderRadius: '6px',
   boxShadow: 24,
   border: 'none',
   p: 1.5,
};

const ExtendTableCell = styled(TableCell)({
   padding: '12px 6px !important',
   [`&.${tableCellClasses.head}`]: {
      backgroundColor: '#F9F8FA',
   },
});

const ExtendTypography = styled(Typography)(({ theme }) => ({
   color: theme.base.text.gray2,
   display: 'flex',
   alignItems: 'center',
   fontSize: 15,
   padding: '5px 0',
   fontWeight: 500,
   gap: 0.5,
   pt: 0,
   pb: 0.5,
   pl: 0.5,
}));

export default ModalPayComplete;
