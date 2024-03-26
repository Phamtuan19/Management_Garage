import { LoadingButton } from '@mui/lab';
import { Box, Button, Modal, Typography } from '@mui/material';

const ModalAddCustomer = () => {
   return (
      <Modal open={false}>
         <Box sx={style}>
            <Box display="flex" justifyContent="space-between" borderBottom="1px solid #DADADA">
               <Typography id="modal-modal-title" variant="h6" component="h2">
                  Hóa đơn thanh toán
               </Typography>
            </Box>

            <Box mt={1.5}>
               <Box mt={1.5} display="flex" justifyContent="space-between" gap={1.5}>
                  <Box display="flex" justifyContent="space-between" gap={1.5}>
                     <Button variant="contained" color="error">
                        Hủy
                     </Button>
                     <LoadingButton variant="contained">Thêm</LoadingButton>
                  </Box>
               </Box>
            </Box>
         </Box>
      </Modal>
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

export default ModalAddCustomer;
