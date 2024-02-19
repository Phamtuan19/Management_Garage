/* eslint-disable @typescript-eslint/naming-convention */
import { Box, Tab } from '@mui/material';
import React, { useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { UseFormReturn } from 'react-hook-form';

import { RepairorderSchema } from '../utils/repairorderSchema';

import TabRepairOrderSupplies from './TabRepairOrderSupplies';
import TabRepairOrderService from './TabRepairOrderService';

interface RepairOrderServicePropType {
   form: UseFormReturn<RepairorderSchema>;
}

const RepairOrderService = ({ form }: RepairOrderServicePropType) => {
   const [value, setValue] = useState('1');

   const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
      setValue(newValue);
   };

   return (
      <Box sx={{ mt: '12px', width: '100%', typography: 'body1' }}>
         <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
               <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label="Dịch vụ" value="1" />
                  <Tab label="Vật tư" value="2" />
               </TabList>
            </Box>
            <TabPanel value="1" sx={{ px: 0 }}>
               <TabRepairOrderService form={form} />
            </TabPanel>
            <TabPanel value="2" sx={{ px: 0 }}>
               <TabRepairOrderSupplies form={form} />
            </TabPanel>
         </TabContext>
      </Box>
   );
};

export default RepairOrderService;
