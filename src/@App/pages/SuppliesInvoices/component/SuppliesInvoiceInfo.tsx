/* eslint-disable @typescript-eslint/naming-convention */
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import handlePrice from '@Core/Helper/formatPrice';
import { Box, Button, Chip, Grid, Modal, Typography, styled } from '@mui/material';
import CreateSharpIcon from '@mui/icons-material/CreateSharp';
import { Control, FieldValues, UseFormReturn } from 'react-hook-form';
import { format } from 'date-fns';
import { useMemo, useState } from 'react';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';
import { useParams } from 'react-router-dom';
import { ResponseGetSuppliesInvoice } from '@App/services/supplies-invoice';
import formatDateTime from '@Core/Helper/formatDateTime';
import { useAuth } from '@App/redux/slices/auth.slice';

import { SuppliesInvoicesSchema } from '../utils/suppliesInvoices.schema';

interface SuppliesInvoiceInfoProps {
   form: UseFormReturn<SuppliesInvoicesSchema>;
   isCheckStatusPayment: boolean;
   suppliesInvoice?: ResponseGetSuppliesInvoice;
}

const SuppliesInvoiceInfo = ({ form, isCheckStatusPayment = false, suppliesInvoice }: SuppliesInvoiceInfoProps) => {
   const [isOpen, setIsOpen] = useState<boolean>(false);
   const { id: suppliesInvoiceId } = useParams();
   const { user } = useAuth();

   const handleOpen = () => {
      setIsOpen(true);
   };

   const handleClose = () => {
      setIsOpen(false);
      form.setValue('transaction.transfer_money', 0);
      form.setValue('transaction.cash_money', 0);
   };

   const total_price = form.watch('transaction.total_price');
   const transfer_money = form.watch('transaction.transfer_money');
   const cash_money = form.watch('transaction.cash_money');

   const debt = useMemo(() => {
      return Number(total_price) - (Number(transfer_money) + Number(cash_money));
   }, [total_price, transfer_money, cash_money]);

   return (
      <>
         <Box display="flex" justifyContent="space-between">
            <ControllerLabel title="Người tạo phiếu: " />
            <ExtendTypography sx={{ fontWeight: 600 }}>{user?.full_name + `(#${user?.code})`}</ExtendTypography>
         </Box>
         <Box display="flex" justifyContent="space-between">
            <ControllerLabel title="Ngày tạo" />
            <ExtendTypography sx={{ fontWeight: 600 }}>
               {suppliesInvoice?.createdAt ? formatDateTime(suppliesInvoice?.createdAt) : format(Date(), 'dd-MM-yyyy')}
            </ExtendTypography>
         </Box>
         <Box display="flex" justifyContent="space-between">
            <ControllerLabel title="Trạng thái:" />
            <ExtendTypography>
               {suppliesInvoiceId ? (
                  <Chip
                     label={isCheckStatusPayment ? 'Đã thanh toán' : 'Chưa thanh toán'}
                     color={isCheckStatusPayment ? 'success' : 'warning'}
                  />
               ) : (
                  'Nháp'
               )}
            </ExtendTypography>
         </Box>
         <Box display="flex" justifyContent="space-between">
            <ControllerLabel title="Tổng tiền:" />
            <ExtendTypography sx={{ fontWeight: 600 }}>{handlePrice(total_price)}</ExtendTypography>
         </Box>
         <br />

         {!isCheckStatusPayment && (
            <Box display="flex" justifyContent="space-between">
               <ControllerLabel title="Thanh toán:" />
               <Button sx={{ minWidth: 'auto', px: '6px' }} variant="text" onClick={handleOpen}>
                  <CreateSharpIcon sx={{ fontSize: '16px' }} />
               </Button>
            </Box>
         )}
         <Box display="flex" justifyContent="space-between">
            <ControllerLabel title="Chuyển khoản:" />
            <ExtendTypography sx={{ fontWeight: 600 }}>{handlePrice(transfer_money)}</ExtendTypography>
         </Box>
         <Box display="flex" justifyContent="space-between">
            <ControllerLabel title="Tiền mặt:" />
            <ExtendTypography sx={{ fontWeight: 600 }}>{handlePrice(cash_money)}</ExtendTypography>
         </Box>
         <br />
         {!isCheckStatusPayment && (
            <Box display="flex" justifyContent="space-between">
               <ControllerLabel title="Cần thanh toán:" />
               <ExtendTypography sx={{ fontWeight: 600, color: Number(total_price) >= 0 ? 'red' : '#555555' }}>
                  {handlePrice(debt)}
               </ExtendTypography>
            </Box>
         )}

         {/* Modal thanh toán */}
         <Modal open={isOpen} aria-labelledby="child-modal-title" aria-describedby="child-modal-description">
            <Box sx={{ ...styleModal, width: 600 }}>
               <h2 id="child-modal-title">Thanh Toán</h2>
               <br />
               <Box display="flex" gap="12px" flexDirection="column">
                  <Box sx={{ display: 'flex', gap: '12px' }}>
                     <ExtendTypography sx={{ fontSize: '18px !important' }}>Tổng tiền:</ExtendTypography>
                     <ExtendTypography sx={{ fontWeight: 600 }}>{handlePrice(total_price)}</ExtendTypography>
                  </Box>

                  <Typography sx={{ fontWeight: 600, pb: '3px', borderBottom: '.5px solid #ccc' }}>
                     Thanh Toán
                  </Typography>

                  <Grid container spacing={1}>
                     <Grid item xs={9}>
                        <ExtendTypography sx={{ color: '#000' }}>Chuyển khoản :</ExtendTypography>
                     </Grid>
                     <Grid item xs={3}>
                        <ExtendControllerTextField
                           name="transaction.transfer_money"
                           control={form.control as unknown as Control<FieldValues>}
                           number
                        />
                     </Grid>
                  </Grid>
                  <Grid container spacing={1}>
                     <Grid item xs={9}>
                        <ExtendTypography sx={{ color: '#000' }}>Tiền mặt :</ExtendTypography>
                     </Grid>
                     <Grid item xs={3}>
                        <ExtendControllerTextField
                           name="transaction.cash_money"
                           control={form.control as unknown as Control<FieldValues>}
                           number
                        />
                     </Grid>
                  </Grid>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                     <ExtendTypography sx={{ color: '#000' }}>Còn nợ :</ExtendTypography>
                     <ExtendTypography sx={{ fontWeight: 600 }}>{handlePrice(debt)}</ExtendTypography>
                  </Box>
               </Box>
               <br />
               <Box display="flex" gap="12px" justifyContent="flex-end" alignItems="center">
                  <Button onClick={handleClose} color="error" variant="outlined">
                     Hủy
                  </Button>
                  <Button
                     onClick={() => {
                        setIsOpen(false);
                     }}
                  >
                     Xác nhận
                  </Button>
               </Box>
            </Box>
         </Modal>
      </>
   );
};

const styleModal = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 400,
   bgcolor: 'background.paper',
   border: '1px solid transparent',
   boxShadow: 24,
   pt: 2,
   px: 4,
   pb: 3,
   borderRadius: '6px',
};

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

const ExtendControllerTextField = styled(ControllerTextField)({
   '.css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input': { textAlign: 'right' },
});

export default SuppliesInvoiceInfo;
