/* eslint-disable @typescript-eslint/naming-convention */
import PageContent from '@App/component/customs/PageContent';
import React from 'react';
import { Grid, Tab, Tabs, styled } from '@mui/material';
import useSearchParamsHook from '@App/hooks/useSearchParamsHook';
import { TabContext, TabPanel } from '@mui/lab';
import { UseFormReturn } from 'react-hook-form';

import { RepairInvoiceSchema } from '../../utils/repair-invoice-create';

import ClientInformation from './ClientInformation';
import VehicleInformation from './VehicleInformation';
import RepairSupplies from './RepairSupplies';
import RepairService from './RepairService';

interface BaseFormOrderCreateProps {
   form: UseFormReturn<RepairInvoiceSchema>;
}

const BaseFormRepairInvoiceCreate = ({ form }: BaseFormOrderCreateProps) => {
   const { searchParams, setParams } = useSearchParamsHook();

   const handleChange = (_e: React.SyntheticEvent, newValue: string) => {
      setParams('tab', newValue);
   };

   return (
      <>
         <PageContent>
            <ClientInformation form={form} />
            <VehicleInformation form={form} />
         </PageContent>
         <Grid container spacing={1}>
            <Grid item xs={12}>
               <PageContent>
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
                        <RepairService form={form} />
                     </ExtendTabPanel>
                     <ExtendTabPanel value="2">
                        <RepairSupplies form={form} />
                     </ExtendTabPanel>
                  </TabContext>
               </PageContent>
            </Grid>
         </Grid>
      </>
   );
};

const ExtendTabPanel = styled(TabPanel)({
   padding: '12px 0px',
});

const ExtendTab = styled(Tab)({
   padding: '6px 12px',
   minHeight: 'auto',
});

export default BaseFormRepairInvoiceCreate;
