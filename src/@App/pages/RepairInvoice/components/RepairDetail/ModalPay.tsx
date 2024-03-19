/* eslint-disable @typescript-eslint/naming-convention */
import {
   Box,
   ButtonBase,
   Modal,
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableRow,
   Typography,
   styled,
} from '@mui/material';
import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { ResponseFindOneRepairInvoice } from '@App/types/repair-invoice';
import formatPrice from '@Core/Helper/formatPrice';

interface ModalPayProps {
   open: boolean;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
   repairInvoice: ResponseFindOneRepairInvoice | undefined;
}

const ModalPay = ({ open, setOpen, repairInvoice }: ModalPayProps) => {
   const data = [
      ...(repairInvoice?.repairInvoiceService.map((item) => ({
         name: item.service_name,
         dvt: 'Lần',
         sl: 1,
         price: item.price ?? 0,
         discount: item.discount,
      })) ?? []),

      ...(repairInvoice?.repairInvoiceSupplies.map((item) => ({
         name: item.supplies_detail_name,
         dvt: 'Lần',
         sl: 1,
         price: item.price ?? 0,
         discount: item.discount ?? 0,
      })) ?? []),
   ];

   return (
      <div>
         <Modal open={open}>
            <Box sx={style}>
               <Box display="flex" justifyContent="space-between" borderBottom="1px solid #DADADA">
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                     Hóa đơn thanh toán
                  </Typography>
                  <ButtonBase onClick={() => setOpen(false)}>
                     <CloseIcon />
                  </ButtonBase>
               </Box>
               <Box sx={{ mt: 2 }}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                     <TableHead>
                        <TableRow>
                           <ExtendTableCell width={50}>STT</ExtendTableCell>
                           <ExtendTableCell>Vật tư & Dịch vụ</ExtendTableCell>
                           <ExtendTableCell width={70} align="center">
                              DVT
                           </ExtendTableCell>
                           <ExtendTableCell align="center">SL</ExtendTableCell>
                           <ExtendTableCell>Đơn giá</ExtendTableCell>
                           <ExtendTableCell>Thành tiền</ExtendTableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {data.map((item, index) => {
                           return (
                              <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                 <ExtendTableCell component="th" scope="row">
                                    {index + 1}
                                 </ExtendTableCell>
                                 <ExtendTableCell>{item.name}</ExtendTableCell>
                                 <ExtendTableCell align="center">Lần</ExtendTableCell>
                                 <ExtendTableCell align="center">1</ExtendTableCell>
                                 <ExtendTableCell>{formatPrice(item.price)}</ExtendTableCell>
                                 <ExtendTableCell>{formatPrice(item.price)}</ExtendTableCell>
                              </TableRow>
                           );
                        })}
                     </TableBody>
                  </Table>
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
   width: 750,
   minHeight: 680,
   bgcolor: 'background.paper',
   borderRadius: '6px',
   boxShadow: 24,
   border: 'none',
   p: 1.5,
};

const ExtendTableCell = styled(TableCell)({
   padding: '12px 6px !important',
});

export default ModalPay;
