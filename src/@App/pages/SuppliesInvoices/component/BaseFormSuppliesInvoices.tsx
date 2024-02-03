/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useAuth } from '@App/redux/slices/auth.slice';
import personnelService from '@App/services/personnel.service';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import { Box, Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { UseFormReturn } from 'react-hook-form';
import PageContent from '@App/component/customs/PageContent';
import ControllerAutoComplate from '@Core/Component/Input/ControllerAutoComplate';
import ArrowRight from '@App/component/common/ArrowRight';

import { SuppliesInvoicesSchema } from '../utils/suppliesInvoices.schema';

interface BaseFormSuppliesInvoicesPropType {
   form: UseFormReturn<SuppliesInvoicesSchema>;
}

const listArrowRight = [
   {
      title: 'Nháp',
      name: 'draft',
   },
   {
      title: 'Chờ phê duyệt',
      name: 'waiting_approval',
   },
   {
      title: 'Đã duyệt',
      name: 'approved',
   },
   {
      title: 'Đang tuyển',
      name: 'recruiting',
   },
   {
      title: 'Hoàn thành',
      name: 'done',
   },
   {
      title: 'Từ chối',
      name: 'refused',
   },
];

const BaseFormSuppliesInvoices = ({ form }: BaseFormSuppliesInvoicesPropType) => {
   const { control } = form;

   const { user } = useAuth();

   // const { data: distributors } = useQuery(['getAllDistributor'], async () => {
   //    const res = await distributorService.get({ limit: 10000 });
   //    return res.data;
   // });

   const { data: personnels } = useQuery(['getAllPersonnels'], async () => {
      const res = await personnelService.fieldAll();
      return res.data as { _id: string; full_name: string }[];
   });

   useEffect(() => {
      if (user?._id) {
         form.setValue('personnel_id', user._id);
      }
   }, [user?._id]);

   return (
      <>
         <Box component="form">
            <Grid container spacing={2}>
               <Grid item xs={12}>
                  <ArrowRight options={listArrowRight} check="refused" />
               </Grid>
               <Grid item xs={12} md={9}>
                  <PageContent sx={{ mt: 0 }}>{/* <SuppliesInvoicesTable form={form} /> */}</PageContent>
               </Grid>
               <Grid item xs={12} md={3} height="100% !important">
                  <PageContent sx={{ mt: 0 }}>
                     <Grid container spacing={2}>
                        <Grid item xs={12}>
                           <Box height="">
                              <ControllerLabel title="Nhân viên tạo phiếu" required />
                              <ControllerAutoComplate
                                 options={personnels || []}
                                 valuePath="_id"
                                 titlePath="full_name"
                                 name="personnel_id"
                                 control={control}
                              />
                           </Box>
                        </Grid>
                        <Grid item xs={12}>
                           <Box display="flex" justifyContent="space-between">
                              <ControllerLabel title="Trạng thái:" />
                              <Typography
                                 sx={({ base }) => ({
                                    color: base.text.gray2,
                                    display: 'flex',
                                    alignItems: 'center',
                                    fontSize: 15,
                                    padding: '5px 0',
                                    fontWeight: 500,
                                    gap: 0.5,
                                    pt: 0,
                                    pb: 0.5,
                                    pl: 0.5,
                                 })}
                              >
                                 Nháp
                              </Typography>
                           </Box>
                        </Grid>
                     </Grid>
                  </PageContent>
               </Grid>
            </Grid>
         </Box>
      </>
   );
};

export default BaseFormSuppliesInvoices;
