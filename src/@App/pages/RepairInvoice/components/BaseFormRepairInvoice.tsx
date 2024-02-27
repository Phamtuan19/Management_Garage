/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-misused-promises */
import PageContent from '@App/component/customs/PageContent';
import personnelService from '@App/services/personnel.service';
import ControllerAutoComplate from '@Core/Component/Input/ControllerAutoComplate';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import { Box, Button, Grid, Tab } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { SubmitHandler, UseFormReturn, useFieldArray } from 'react-hook-form';
import { useAuth } from '@App/redux/slices/auth.slice';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import React from 'react';
import ScrollbarBase from '@App/component/customs/ScrollbarBase';
import useSearchParamsHook from '@App/hooks/useSearchParamsHook';

import { RepairInvoiceSchema } from '../utils/repair-invoice';

import TabRepairInvoiceCustomer from './TabRepairInvoice/TabRepairInvoiceCustomer';
import RepairInvoiceFilterSupplies from './TabRepairInvoice/RepairInvoiceFilterSupplies';
import TabRepairInvoiceSupplies from './TabRepairInvoice/TabRepairInvoiceSupplies';

interface BaseFormRepairInvoicePropType {
   form: UseFormReturn<RepairInvoiceSchema>;
   isLoading: boolean;
   onSubmitForm: SubmitHandler<RepairInvoiceSchema>;
}

const BaseFormRepairInvoice = ({ form, onSubmitForm }: BaseFormRepairInvoicePropType) => {
   const { setValue, control, handleSubmit } = form;
   const { user } = useAuth();
   const { searchParams, setParams } = useSearchParamsHook();

   const handleChange = (_e: React.SyntheticEvent, newValue: string) => {
      setParams('tab', newValue);
   };

   const suppliesInvoiceFieldArray = useFieldArray({
      name: 'suppliesInvoice',
      control: form.control,
   });
   const { data: personnels } = useQuery(['getAllPersonnels'], async () => {
      if (user) {
         setValue('personnel_id', user._id);
         const res = await personnelService.fieldAll();
         return res.data;
      }
   });

   return (
      <Box component="form">
         <Grid container spacing={2}>
            <Grid item xs={9}>
               <PageContent sx={{ mt: 0 }}>
                  <TabContext value={searchParams['tab'] ?? '1'}>
                     <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                           <Tab label="khách hàng" value="1" />
                           <Tab label="Dịch vụ" value="2" />
                           <Tab label="Vật tư" value="3" />
                        </TabList>
                     </Box>
                     <ScrollbarBase sx={{ px: '12px', maxHeight: 'calc(100vh - 230px)' }}>
                        <TabPanel value="1" sx={{ px: 0 }}>
                           <TabRepairInvoiceCustomer form={form} />
                        </TabPanel>
                        <TabPanel value="2" sx={{ px: 0 }}></TabPanel>
                        <TabPanel value="3" sx={{ px: 0 }}>
                           <RepairInvoiceFilterSupplies fieldArray={suppliesInvoiceFieldArray} />
                           <TabRepairInvoiceSupplies form={form} fieldArray={suppliesInvoiceFieldArray} />
                        </TabPanel>
                     </ScrollbarBase>
                  </TabContext>
               </PageContent>
            </Grid>
            <Grid item xs={3}>
               <PageContent sx={{ mt: 0 }}>
                  <Grid container spacing={2}>
                     <Grid item xs={12}>
                        <ControllerLabel title="Nhân viên tạo phiếu" required />
                        <ControllerAutoComplate
                           options={personnels || []}
                           valuePath="_id"
                           titlePath="full_name"
                           name="personnel_id"
                           control={control}
                        />
                     </Grid>
                     {/* <Grid item xs={12}>
                        <RepairOrderBill form={form} />
                     </Grid> */}
                     <Grid item xs={12}>
                        <Button type="submit" fullWidth onClick={handleSubmit(onSubmitForm)}>
                           Lưu hóa đơn
                        </Button>
                     </Grid>
                  </Grid>
               </PageContent>
            </Grid>
         </Grid>
      </Box>
   );
};

export default BaseFormRepairInvoice;
