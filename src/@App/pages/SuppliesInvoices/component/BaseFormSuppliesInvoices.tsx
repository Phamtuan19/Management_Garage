/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect } from 'react';
import { useAuth } from '@App/redux/slices/auth.slice';
import personnelService from '@App/services/personnel.service';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import { Box, Button, Grid, Typography, styled } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { UseFormReturn } from 'react-hook-form';
import PageContent from '@App/component/customs/PageContent';
import ControllerAutoComplate from '@Core/Component/Input/ControllerAutoComplate';
import ArrowRight from '@App/component/common/ArrowRight';
import handlePrice from '@Core/Helper/hendlePrice';
import { format } from 'date-fns';
import { useConfirm } from '@Core/Component/Comfirm/CoreComfirm';
import CreateSharpIcon from '@mui/icons-material/CreateSharp';

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
   const coreConfirm = useConfirm();

   const total_price =
      form.watch('details') && form.watch('details').length > 0
         ? form.watch('details').reduce((current, item) => {
              return current + Number(item.cost_price) * Number(item.quantity_received);
           }, 0)
         : 0;

   const { data: personnels } = useQuery(['getAllPersonnels'], async () => {
      const res = await personnelService.fieldAll();
      return res.data as { _id: string; full_name: string }[];
   });

   useEffect(() => {
      if (user?._id) {
         form.setValue('personnel_id', user._id);
      }
   }, [user?._id]);

   useEffect(() => {
      form.setValue('total_price', total_price);
   }, [total_price]);

   const handleClickAddSuppliesInvoice = () => {
      coreConfirm({
         content: 'Xác nhận lưu hóa đơn nhập hàng',
         isIcon: true,
         color: 'error',
         callback: () => {},
      });
   };

   return (
      <>
         <Box component="form">
            <Grid container spacing={2}>
               <Grid item xs={12}>
                  <ArrowRight options={listArrowRight} check="refused" />
               </Grid>
               <Grid item xs={12} md={9}>
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
                              <ControllerLabel title="Ngày tạo" />
                              <ExtendTypography sx={{ fontWeight: 600 }}>
                                 {format(Date(), 'MM/dd/yyyy')}
                              </ExtendTypography>
                           </Box>
                           <Box display="flex" justifyContent="space-between">
                              <ControllerLabel title="Trạng thái:" />
                              <ExtendTypography>Nháp</ExtendTypography>
                           </Box>
                           <Box display="flex" justifyContent="space-between">
                              <ControllerLabel title="Tổng tiền:" />
                              <ExtendTypography sx={{ fontWeight: 600 }}>
                                 {handlePrice(form.watch('total_price'))}
                              </ExtendTypography>
                           </Box>
                           <Box display="flex" justifyContent="space-between">
                              <ControllerLabel title="Cần thanh toán:" />
                              <ExtendTypography sx={{ fontWeight: 600 }}>
                                 {handlePrice(form.watch('total_price'))}
                              </ExtendTypography>
                           </Box>
                           <br />
                           <Box display="flex" justifyContent="space-between">
                              <ControllerLabel title="Thanh toán:" />
                              {/* <ExtendTypography sx={{ fontWeight: 600 }}>{handlePrice(form.watch('total_price'))}</ExtendTypography> */}
                              <Button sx={{ minWidth: 'auto', px: '6px' }} variant="text" onClick={() => {}}>
                                 <CreateSharpIcon sx={{ fontSize: '16px' }} />
                              </Button>
                           </Box>
                           <br />
                           <Box display="flex" justifyContent="space-between">
                              <ControllerLabel title="Công nợ:" />
                              <ExtendTypography sx={{ fontWeight: 600 }}>
                                 {handlePrice(form.watch('total_price'))}
                              </ExtendTypography>
                           </Box>
                        </Grid>
                        <Grid item xs={12}>
                           <Button
                              disabled={form.watch('details') && form.watch('details').length === 0}
                              fullWidth
                              onClick={handleClickAddSuppliesInvoice}
                           >
                              Lưu hóa đơn
                           </Button>
                        </Grid>
                     </Grid>
                  </PageContent>
               </Grid>
            </Grid>
         </Box>
      </>
   );
};

const ExtendTypography = styled(Typography)(({ theme }) => ({
   color: theme.base.text.gray2,
   display: 'flex',
   alignItems: 'center',
   fontSize: 15,
   padding: '5px 0',
   fontWeight: 500,
   gap: 0.5,
   pt: 0,
   pb: 0.5,
   pl: 0.5,
}));

export default BaseFormSuppliesInvoices;
