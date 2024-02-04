/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useAuth } from '@App/redux/slices/auth.slice';
import personnelService from '@App/services/personnel.service';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import { Autocomplete, Box, Grid, TextField, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { UseFormReturn } from 'react-hook-form';
import PageContent from '@App/component/customs/PageContent';
import ControllerAutoComplate from '@Core/Component/Input/ControllerAutoComplate';
import ArrowRight from '@App/component/common/ArrowRight';
import distributorService from '@App/services/distributor.service';

import { SuppliesInvoicesSchema } from '../utils/suppliesInvoices.schema';

import SuppliesInvoicesTable from './SuppliesInvoicesTable';

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

   const { data: distributors } = useQuery(['getAllDistributor'], async () => {
      const res = await distributorService.getAllField();
      return res?.data?.map((item: any) => ({ label: item.name, _id: item._id })) || [];
   });

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
                  <Box>
                     <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={distributors}
                        sx={{ width: 300 }}
                        renderInput={(params) => <TextField {...params} label="Movie" />}
                     />
                  </Box>
                  <PageContent sx={{ mt: 0 }}>
                     <SuppliesInvoicesTable form={form} />
                  </PageContent>
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
