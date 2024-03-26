/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/naming-convention */
import useSearchParamsHook from '@App/hooks/useSearchParamsHook';
import repairInvoiceService from '@App/services/repair-invoice';
import { TabContext, TabPanel } from '@mui/lab';
import { Box, Modal, Tab, Tabs, Typography, styled } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { ResponseFindOneRepairInvoice } from '@App/types/repair-invoice';

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

      const { searchParams, setParams } = useSearchParamsHook();

      const handleChange = (_e: React.SyntheticEvent, newValue: string) => {
         setParams('tab', newValue);
      };

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
               <TabContext value={searchParams['tab'] ?? '1'}>
                  <Tabs
                     value={searchParams['tab'] ?? '1'}
                     onChange={handleChange}
                     sx={{
                        minHeight: '36px',
                        borderBottom: '1px solid #90909080',
                        '& .css-1aquho2-MuiTabs-indicator': {
                           height: '1px',
                        },
                     }}
                  >
                     <ExtendTab label="Dịch vụ" value="1" />
                     <ExtendTab label="Vật tư" value="2" />
                  </Tabs>
                  <ExtendTabPanel value="1">
                     <DetailRepairInvoiceService data={repairInvoice?.repairInvoiceService ?? []} />
                  </ExtendTabPanel>
                  <ExtendTabPanel value="2">
                     <DetailRepairInvoiceSupplies data={repairInvoice?.repairInvoiceSupplies ?? []} />
                  </ExtendTabPanel>
               </TabContext>
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
};

const ExtendTabPanel = styled(TabPanel)({
   padding: '12px 0px',
});

const ExtendTab = styled(Tab)({
   padding: '6px 12px',
   minHeight: 'auto',
});

export default ModalDetailRepairInvoice;
