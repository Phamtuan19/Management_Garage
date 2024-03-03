import { FindRepairOrder } from '@App/services/repairorder.service';
import { Box, Modal, Typography } from '@mui/material';
import React from 'react';

const ModalDetailSuppliesItem = ({
   open,
   onClose,
}: {
   open: boolean;
   onClose: React.Dispatch<React.SetStateAction<boolean>>;
   repairOrder: FindRepairOrder;
}) => {
   return (
      <Modal
         open={open}
         onClose={() => {
            onClose(false);
         }}
      >
         <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
               Chi tiết vật tư
            </Typography>
            <Box>Thông tin chi tiết các vật tư đã được bên kho xuất ra hay chưa</Box>
         </Box>
      </Modal>
   );
};

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   minWidth: 600,
   bgcolor: 'background.paper',
   border: 'none',
   boxShadow: 24,
   p: '12px',
};

export default React.memo(ModalDetailSuppliesItem);
