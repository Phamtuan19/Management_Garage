/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { Box, Button, Grid, Tab } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import personnelService from '@App/services/personnel.service';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import PageContent from '@App/component/customs/PageContent';
import ControllerAutoComplate from '@Core/Component/Input/ControllerAutoComplate';
import { useAuth } from '@App/redux/slices/auth.slice';
import ScrollbarBase from '@App/component/customs/ScrollbarBase';
import { useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import { RepairorderSchema } from '../utils/repairorderSchema';

import RepairOrderInfo from './RepairOrderInfo';
import TabRepairOrderService from './TabRepairOrderService';
import TabRepairOrderSupplies from './TabRepairOrderSupplies';

interface BaseFormRepairOrderPropType {
   form: UseFormReturn<RepairorderSchema>;
   isLoading: boolean;
   onSubmitForm: SubmitHandler<RepairorderSchema>;
}
const BaseFormRepairOrder = ({ form, onSubmitForm }: BaseFormRepairOrderPropType) => {
   const { control, handleSubmit } = form;
   const { user } = useAuth();
   const [valueTab, setValueTab] = useState<string>('1');

   const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
      setValueTab(newValue);
   };

   const { data: personnels } = useQuery(['getAllPersonnels'], async () => {
      if (user) {
         form.setValue('personnel_id', user._id);
         const res = await personnelService.fieldAll();
         return res.data as { _id: string; full_name: string }[];
      }
   });

   return (
      <Box component="form" sx={{ mt: 1 }}>
         <Grid container spacing={2}>
            <Grid item xs={9}>
               <PageContent sx={{ mt: 0, px: 0 }}>
                  <ScrollbarBase sx={{ px: '12px', height: 'calc(100vh - 185px)' }}>
                     <TabContext value={valueTab}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                           <TabList onChange={handleChange} aria-label="lab API tabs example">
                              <Tab label="Thôn tin khách hàng" value="1" />
                              <Tab label="Dịch vụ" value="2" />
                              <Tab label="Vật tư" value="3" />
                           </TabList>
                        </Box>
                        <TabPanel value="1" sx={{ px: 0 }}>
                           <RepairOrderInfo form={form} />
                        </TabPanel>
                        <TabPanel value="2" sx={{ px: 0 }}>
                           <TabRepairOrderService form={form} />
                        </TabPanel>
                        <TabPanel value="3" sx={{ px: 0 }}>
                           <TabRepairOrderSupplies form={form} />
                        </TabPanel>
                     </TabContext>
                  </ScrollbarBase>
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

                     <Grid item xs={12}>
                        <Button type="submit" fullWidth onClick={handleSubmit(onSubmitForm)}>
                           Tạo lệnh sửa chữa
                        </Button>
                     </Grid>
                  </Grid>
               </PageContent>
            </Grid>
         </Grid>
      </Box>
   );
};
export default BaseFormRepairOrder;
