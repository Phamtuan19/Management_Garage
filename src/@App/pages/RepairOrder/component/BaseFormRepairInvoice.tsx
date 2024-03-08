/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-misused-promises */
import PageContent from '@App/component/customs/PageContent';
import personnelService from '@App/services/personnel.service';
import ControllerAutoComplate from '@Core/Component/Input/ControllerAutoComplate';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import { Box, Button, Grid, Modal, Tab, Typography, styled } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { Control, FieldValues, SubmitHandler, UseFormReturn, useFieldArray } from 'react-hook-form';
import { useAuth } from '@App/redux/slices/auth.slice';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import React, { useEffect, useMemo, useState } from 'react';
import ScrollbarBase from '@App/component/customs/ScrollbarBase';
import useSearchParamsHook from '@App/hooks/useSearchParamsHook';
import handlePrice from '@Core/Helper/formatPrice';
import { FindRepairOrder } from '@App/services/repairorder.service';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';
import CreateSharpIcon from '@mui/icons-material/CreateSharp';
import { STATUS_REPAIR } from '@App/configs/status-config';
import { useParams } from 'react-router-dom';

import { RepairInvoiceSchema } from '../utils/repair-invoice';

import TabRepairInvoiceCustomer from './TabRepairInvoice/TabRepairInvoiceCustomer';
import RepairInvoiceFilterSupplies from './TabRepairInvoice/RepairInvoiceFilterSupplies';
import TabRepairInvoiceSupplies from './TabRepairInvoice/TabRepairInvoiceSupplies';
import TabRepairService from './TabRepairService';
import TabRepairServiceFilter from './TabRepairService/TabRepairServiceFilter';

interface BaseFormRepairInvoicePropType {
   form: UseFormReturn<RepairInvoiceSchema>;
   isLoading: boolean;
   onSubmitForm: SubmitHandler<RepairInvoiceSchema>;
   isShipped?: boolean;
   repairOrder?: FindRepairOrder;
}

const BaseFormRepairInvoice = ({
   form,
   onSubmitForm,
   isLoading = false,
   repairOrder,
}: BaseFormRepairInvoicePropType) => {
   const { id: repairOrderId } = useParams();
   const { setValue, control, handleSubmit, watch } = form;
   const { user } = useAuth();
   const { searchParams, setParams } = useSearchParamsHook();
   const [isOpen, setIsOpen] = useState<boolean>(false);

   const total_price = watch('transaction.total_price') ?? 0;
   const transfer_money = watch('transaction.transfer_money') ?? 0;
   const cash_money = watch('transaction.cash_money') ?? 0;

   const debt = useMemo(() => {
      return Number(total_price) - (Number(transfer_money) + Number(cash_money));
   }, [total_price, transfer_money, cash_money]);

   const handleChange = (_e: React.SyntheticEvent, newValue: string) => {
      setParams('tab', newValue);
   };

   const suppliesInvoiceFieldArray = useFieldArray({
      name: 'suppliesInvoice',
      control: form.control,
   });

   const suppliesServiceFieldArray = useFieldArray({
      name: 'suppliesService',
      control: form.control,
   });

   const { data: personnels } = useQuery(['getAllPersonnels'], async () => {
      if (user) {
         setValue('personnel_id', user._id);
         const res = await personnelService.fieldAll();
         return res.data;
      }
   });

   const total_price_supplies = form.watch('suppliesInvoice').reduce((total, supplies) => {
      return total + (supplies.selling_price - (supplies.selling_price * supplies.quantity * supplies.discount) / 100);
   }, 0);
   const total_price_service = form.watch('suppliesService').reduce((total, service) => {
      return total + (service.price - (service.price * service.discount) / 100);
   }, 0);

   const handleOpen = () => {
      setIsOpen(true);
   };

   const handleClose = () => {
      setIsOpen(false);
      // form.setValue('transaction.transfer_money', 0);
      // form.setValue('transaction.cash_money', 0);
   };

   useEffect(() => {
      form.setValue('transaction.total_price', total_price_supplies + total_price_service);
   }, [total_price_supplies, total_price_service]);

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
                        <TabPanel value="2" sx={{ px: 0 }}>
                           <TabRepairServiceFilter form={form} fieldArray={suppliesServiceFieldArray as never} />
                           <TabRepairService fieldArray={suppliesServiceFieldArray as never} form={form} />
                        </TabPanel>
                        <TabPanel value="3" sx={{ px: 0 }}>
                           <RepairInvoiceFilterSupplies fieldArray={suppliesInvoiceFieldArray as never} />
                           <TabRepairInvoiceSupplies
                              personnels={personnels}
                              repairOrder={repairOrder}
                              form={form}
                              fieldArray={suppliesInvoiceFieldArray as never}
                           />
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
                           disabled={Boolean(repairOrderId)}
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <Box display="flex" justifyContent="space-between">
                           <ControllerLabel title="Dịch vụ:" />
                           <ExtendTypography sx={{ fontWeight: 600 }}>
                              {handlePrice(total_price_service)}
                           </ExtendTypography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                           <ControllerLabel title="Vật tư:" />
                           <ExtendTypography sx={{ fontWeight: 600 }}>
                              {handlePrice(total_price_supplies)}
                           </ExtendTypography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                           <ControllerLabel title="Thanh toán:" />
                           <Button
                              sx={{ minWidth: 'auto', px: '6px' }}
                              variant="text"
                              disabled={repairOrder?.status !== STATUS_REPAIR.pay.key}
                              onClick={handleOpen}
                           >
                              <CreateSharpIcon sx={{ fontSize: '16px' }} />
                           </Button>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                           <ControllerLabel title="Chuyển khoản:" />
                           <ExtendTypography sx={{ fontWeight: 600 }}>{handlePrice(transfer_money)}</ExtendTypography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                           <ControllerLabel title="Tiền mặt:" />
                           <ExtendTypography sx={{ fontWeight: 600 }}>{handlePrice(cash_money)}</ExtendTypography>
                        </Box>
                        <hr />
                        <Box display="flex" justifyContent="space-between">
                           <ControllerLabel title="Tổng tiền:" />
                           <ExtendTypography sx={{ fontWeight: 600 }}>
                              {handlePrice(total_price_supplies + total_price_service)}
                           </ExtendTypography>
                        </Box>
                        <Box display="flex" justifyContent="space-between">
                           <ControllerLabel title="Cần thanh toán:" />
                           <ExtendTypography
                              sx={{ fontWeight: 600, color: Number(total_price) >= 0 ? 'red' : '#555555' }}
                           >
                              {handlePrice(debt)}
                           </ExtendTypography>
                        </Box>
                     </Grid>

                     {/* Modal thanh toán */}
                     <Modal
                        open={isOpen}
                        aria-labelledby="child-modal-title"
                        aria-describedby="child-modal-description"
                     >
                        <Box sx={{ ...styleModal, width: 600 }}>
                           <h2 id="child-modal-title">Thanh Toán</h2>
                           <br />
                           <Box display="flex" gap="12px" flexDirection="column">
                              <Box sx={{ display: 'flex', gap: '12px' }}>
                                 <ExtendTypography sx={{ fontSize: '18px !important' }}>Tổng tiền:</ExtendTypography>
                                 <ExtendTypography sx={{ fontWeight: 600 }}>
                                    {handlePrice(total_price)}
                                 </ExtendTypography>
                              </Box>

                              <Typography sx={{ fontWeight: 600, pb: '3px', borderBottom: '.5px solid #ccc' }}>
                                 Thanh Toán
                              </Typography>

                              <Grid container spacing={1}>
                                 <Grid item xs={9}>
                                    <ExtendTypography sx={{ color: '#000' }}>Chuyển khoản :</ExtendTypography>
                                 </Grid>
                                 <Grid item xs={3}>
                                    <ExtendControllerTextField
                                       name="transaction.transfer_money"
                                       control={control as unknown as Control<FieldValues>}
                                       number
                                    />
                                 </Grid>
                              </Grid>
                              <Grid container spacing={1}>
                                 <Grid item xs={9}>
                                    <ExtendTypography sx={{ color: '#000' }}>Tiền mặt :</ExtendTypography>
                                 </Grid>
                                 <Grid item xs={3}>
                                    <ExtendControllerTextField
                                       name="transaction.cash_money"
                                       control={form.control as unknown as Control<FieldValues>}
                                       number
                                    />
                                 </Grid>
                              </Grid>
                              <Box display="flex" justifyContent="space-between" alignItems="center">
                                 <ExtendTypography sx={{ color: '#000' }}>Còn nợ :</ExtendTypography>
                                 <ExtendTypography sx={{ fontWeight: 600 }}>{handlePrice(debt)}</ExtendTypography>
                              </Box>
                           </Box>
                           <br />
                           <Box display="flex" gap="12px" justifyContent="flex-end" alignItems="center">
                              <Button onClick={handleClose} color="error" variant="outlined">
                                 Hủy
                              </Button>
                              <Button
                                 onClick={() => {
                                    setIsOpen(false);
                                 }}
                              >
                                 Xác nhận
                              </Button>
                           </Box>
                        </Box>
                     </Modal>

                     <Grid item xs={12}>
                        <Button type="submit" disabled={isLoading} fullWidth onClick={handleSubmit(onSubmitForm)}>
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

const styleModal = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 400,
   bgcolor: 'background.paper',
   border: '1px solid transparent',
   boxShadow: 24,
   pt: 2,
   px: 4,
   pb: 3,
   borderRadius: '6px',
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

const ExtendControllerTextField = styled(ControllerTextField)({
   '.css-1n4twyu-MuiInputBase-input-MuiOutlinedInput-input': { textAlign: 'right' },
});
