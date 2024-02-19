/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { SubmitHandler, UseFormReturn } from 'react-hook-form';
import { Button, Grid } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import personnelService from '@App/services/personnel.service';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import PageContent from '@App/component/customs/PageContent';
import ControllerAutoComplate from '@Core/Component/Input/ControllerAutoComplate';
import { useAuth } from '@App/redux/slices/auth.slice';
import ScrollbarBase from '@App/component/customs/ScrollbarBase';

import { RepairorderSchema } from '../utils/repairorderSchema';

import RepairOrderInfo from './RepairOrderInfo';

interface BaseFormRepairOrderPropType {
   form: UseFormReturn<RepairorderSchema>;
   isLoading: boolean;
   onSubmitForm: SubmitHandler<RepairorderSchema>;
}
const BaseFormRepairOrder = ({ form }: BaseFormRepairOrderPropType) => {
   const { control } = form;
   const { user } = useAuth();

   const { data: personnels } = useQuery(['getAllPersonnels'], async () => {
      if (user) {
         form.setValue('personnel_id', user._id);
         const res = await personnelService.fieldAll();
         return res.data as { _id: string; full_name: string }[];
      }
   });

   return (
      <form>
         <Grid container spacing={2}>
            <Grid item xs={9}>
               <PageContent sx={{ mt: 0, px: 0 }}>
                  <ScrollbarBase sx={{ px: '12px', height: 'calc(100vh - 180px)' }}>
                     <RepairOrderInfo form={form} />
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
                        <Button type="submit" fullWidth>
                           Tạo lệnh sửa chữa
                        </Button>
                     </Grid>
                  </Grid>
               </PageContent>
            </Grid>
         </Grid>
      </form>
   );
};
export default BaseFormRepairOrder;
