/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/naming-convention */
import repairInvoiceService from '@App/services/repair-invoice';
import { Box, Grid, Modal, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { ResponseFindOneRepairInvoice } from '@App/types/repair-invoice';
import ScrollbarBase from '@App/component/customs/ScrollbarBase';

import DetailRepairInvoiceService from '../RepairInvoice/components/RepairDetail/DetailRepairInvoiceService';
import DetailRepairInvoiceSupplies from '../RepairInvoice/components/RepairDetail/DetailRepairInvoiceSupplies';

interface ModalDetailRepairInvoiceProps {}

export interface ModalDetailRepairInvoicePropsRef {
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
   setId: React.Dispatch<React.SetStateAction<string>>;
}

const ModalDetailRepairInvoice = forwardRef<ModalDetailRepairInvoicePropsRef, ModalDetailRepairInvoiceProps>(
   ({}, ref) => {
      const [open, setOpen] = useState<boolean>(false);
      const [id, setId] = useState<string>('');

      useImperativeHandle(ref, () => ({
         setOpen: setOpen,
         setId: setId,
      }));

      const { data: repairInvoice } = useQuery(['findOneRepairInvoice', id], async () => {
         const res = await repairInvoiceService.find(id);
         return res.data as ResponseFindOneRepairInvoice;
      });

      return (
         <Modal open={open} onClose={() => setOpen(false)}>
            <Box sx={style} component="form">
               <Typography id="modal-modal-title" variant="h6" component="h2" mb={1.5}>
                  Hóa đơn sửa chữa
               </Typography>
               <ScrollbarBase sx={{ height: 500 }}>
                  <Grid container spacing={2}>
                     <DetailRepairInvoiceService data={repairInvoice?.repairInvoiceService ?? []} />
                     <DetailRepairInvoiceSupplies data={repairInvoice?.repairInvoiceSupplies ?? []} />
                  </Grid>
               </ScrollbarBase>
            </Box>
         </Modal>
      );
   },
);

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 1200,
   bgcolor: 'background.paper',
   boxShadow: 24,
   p: '12px',
   borderRadius: '6px',
   zIndex: 1,
};

export default ModalDetailRepairInvoice;
