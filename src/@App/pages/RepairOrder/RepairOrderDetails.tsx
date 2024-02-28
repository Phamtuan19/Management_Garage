/* eslint-disable @typescript-eslint/naming-convention */
import { Box, Grid, Tab } from '@mui/material';
import PageContent from '@App/component/customs/PageContent';
import ScrollbarBase from '@App/component/customs/ScrollbarBase';
import { useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ROUTE_PATH from '@App/configs/router-path';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';

import PepairOderBillDetails from './component/PepairOderBillDetails.tsx/PepairOderBillDetails';
import PepairOderCarDetails from './component/PepairOderBillDetails.tsx/PepairOderCarDetails';
import PepairOderServiceDetails from './component/PepairOderBillDetails.tsx/PepairOderServiceDetails';
import PepairOderSupplieDetails from './component/PepairOderBillDetails.tsx/PepairOderSupplieDetails';

const breadcrumbs = [
   {
      title: 'Phiếu sửa chữa',
      link: ROUTE_PATH.REPAIR_INVOICE,
   },
];
const RepairOrderDetails = () => {
   const [valueTab, setValueTab] = useState<string>('1');
   const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
      setValueTab(newValue);
   };
   return (
      <Box component="form" sx={{ mt: 1 }}>
         <BaseBreadcrumbs
            breadcrumbs={breadcrumbs}
            arialabel="Chi tiết phiếu sửa chữa"
            sx={({ base }) => ({ bgcolor: base.background.default, border: 'none', p: 0 })}
         >
            <Grid item xs={9}>
               <PageContent sx={{ mt: 0, px: 0 }}>
                  <ScrollbarBase sx={{ px: '12px', height: 'calc(100vh - 185px)' }}>
                     <TabContext value={valueTab}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                           <TabList onChange={handleChange} aria-label="lab API tabs example">
                              <Tab label="Thông tin phiếu sửa chữa" value="1" />
                              <Tab label="Thông tin xe" value="2" />
                           </TabList>
                        </Box>
                        <TabPanel value="1" sx={{ px: 0 }}>
                           <PepairOderBillDetails />
                        </TabPanel>
                        <TabPanel value="2" sx={{ px: 0 }}>
                           <PepairOderCarDetails />
                        </TabPanel>
                        <TabPanel value="1" sx={{ px: 0 }}>
                           <PepairOderSupplieDetails />
                        </TabPanel>
                        <TabPanel value="1" sx={{ px: 0 }}>
                           <PepairOderServiceDetails />
                        </TabPanel>
                     </TabContext>
                  </ScrollbarBase>
               </PageContent>
            </Grid>
         </BaseBreadcrumbs>
      </Box>
   );
};

export default RepairOrderDetails;
