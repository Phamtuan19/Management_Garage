/* eslint-disable @typescript-eslint/naming-convention */
import { Box, Button, Tab } from '@mui/material';
import PageContent from '@App/component/customs/PageContent';
import React, { useState } from 'react';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import ROUTE_PATH from '@App/configs/router-path';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import ArrowRight from '@App/component/common/ArrowRight';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import repairorderService, { FindRepairOrder } from '@App/services/repairorder.service';
import MODULE_PAGE from '@App/configs/module-page';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import { STATUS_REPAIR } from '@App/configs/status-config';
import { useConfirm } from '@Core/Component/Comfirm/CoreComfirm';
import { errorMessage, successMessage } from '@Core/Helper/message';
import { AxiosError } from 'axios';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import PepairOderBillDetails from './component/PepairOderBillDetails.tsx/PepairOderBillDetails';
import PepairOderServiceDetails from './component/PepairOderBillDetails.tsx/PepairOderServiceDetails';
import PepairOderSupplieDetails from './component/PepairOderBillDetails.tsx/PepairOderSupplieDetails';
import { arrowRightOption } from './utils';

const breadcrumbs = [
   {
      title: 'Phiếu sửa chữa',
      link: ROUTE_PATH.REPAIR_INVOICE,
   },
];
const RepairOrderDetails = () => {
   const { id: repairorderId } = useParams();
   const [valueTab, setValueTab] = useState<string>('1');
   const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
      setValueTab(newValue);
   };

   const coreConfirm = useConfirm();

   const { data: repairorder, refetch } = useQuery(['getRepairOrderDetails', repairorderId], async () => {
      const repairorderRes = await repairorderService.find(repairorderId as string);
      return repairorderRes.data as FindRepairOrder;
   });

   const { mutate: updateRepairOrderStatus } = useMutation({
      mutationFn: async (status: string) => {
         return await repairorderService.updateStatus({ status }, repairorderId as string);
      },
      onSuccess: () => {
         successMessage('Cập nhật thành công.');
         return refetch();
      },
      onError: (err: AxiosError) => {
         return errorMessage(err);
      },
   });

   const handleClickChangeStatus = () => {
      coreConfirm({
         icon: <ErrorOutlineIcon sx={{ fontSize: '56px' }} color="warning" />,
         title: 'Cảnh báo',
         confirmOk: 'Xác nhận',
         content:
            arrowRightOption[6].name === repairorder?.status
               ? 'Bạn có chắc chắn muốn hủy bỏ hóa phiếu này?.'
               : arrowRightOption[1].name === repairorder?.status
                 ? 'Xác nhận tạo lệnh lấy vật tư.'
                 : 'Bạn có chắc chắn chuyển trạng thái sang ' +
                   arrowRightOption[arrowRightOption.findIndex((item) => item.name === repairorder?.status) + 1]?.title,
         callbackOK: () => {
            switch (repairorder?.status) {
               case arrowRightOption[0].name:
                  updateRepairOrderStatus(arrowRightOption[1].name);
                  break;
               case arrowRightOption[1].name:
                  updateRepairOrderStatus(arrowRightOption[2].name);
                  break;
               case arrowRightOption[2].name:
                  updateRepairOrderStatus(arrowRightOption[3].name);
                  break;
               case arrowRightOption[3].name:
                  updateRepairOrderStatus(arrowRightOption[4].name);
                  break;
               case arrowRightOption[4].name:
                  updateRepairOrderStatus(arrowRightOption[5].name);
                  break;
               case arrowRightOption[5].name:
                  updateRepairOrderStatus(arrowRightOption[6].name);
                  break;
            }
         },
         isIcon: true,
      });
   };

   const handleClose = () => {
      coreConfirm({
         title: 'Cảnh báo',
         confirmOk: 'Xác nhận',
         content: 'Xác nhận hủy phiếu sửa chữa ',
         callbackOK: () => {
            updateRepairOrderStatus(arrowRightOption[6].name);
         },
         isIcon: true,
      });
   };

   return (
      <Box component="form" sx={{ mt: 1 }}>
         <BaseBreadcrumbs
            breadcrumbs={breadcrumbs}
            arialabel="Chi tiết phiếu sửa chữa"
            sx={({ base }) => ({ bgcolor: base.background.default, border: 'none', p: 0 })}
         >
            <Box mb={1} display="flex" justifyContent="space-between" gap={1}>
               <Box display="flex" gap={1}>
                  <PermissionAccessRoute module={MODULE_PAGE.REPAIR_ORDERS} action="CREATE">
                     <Button component={Link} to={ROUTE_PATH.REPAIR_INVOICE + ROUTE_PATH.CREATE} size="medium">
                        Thêm mới
                     </Button>
                  </PermissionAccessRoute>
                  {repairorderId && (
                     <PermissionAccessRoute module={MODULE_PAGE.REPAIR_ORDERS} action="UPDATE">
                        <Button
                           component={Link}
                           to={ROUTE_PATH.REPAIR_INVOICE + '/' + repairorderId + '/update'}
                           size="medium"
                           color="warning"
                        >
                           Chỉnh sửa
                        </Button>
                     </PermissionAccessRoute>
                  )}
               </Box>
               <Box display="flex" gap={1}>
                  {repairorder?.status !== STATUS_REPAIR.shipped.key &&
                     repairorder?.status !== STATUS_REPAIR.close.key && (
                        <PermissionAccessRoute module={MODULE_PAGE.REPAIR_ORDERS} action="UPDATE_STATUS_REPAIR_ORDER">
                           <Button size="medium" color="secondary" onClick={handleClickChangeStatus}>
                              {
                                 arrowRightOption[
                                    arrowRightOption.findIndex((item) => item.name === repairorder?.status) + 1
                                 ]?.title
                              }
                           </Button>
                        </PermissionAccessRoute>
                     )}
                  {repairorder?.status !== STATUS_REPAIR.close.key && (
                     <PermissionAccessRoute module={MODULE_PAGE.REPAIR_ORDERS} action="UPDATE_STATUS_REPAIR_ORDER">
                        <Button size="medium" color="error" onClick={handleClose}>
                           Hủy
                        </Button>
                     </PermissionAccessRoute>
                  )}

                  {repairorder?.status === STATUS_REPAIR.close.key && (
                     <PermissionAccessRoute module={MODULE_PAGE.REPAIR_ORDERS} action="DELETE">
                        <Button component={Link} to="create" size="medium" color="error">
                           Xóa Phiếu
                        </Button>
                     </PermissionAccessRoute>
                  )}
               </Box>
            </Box>
            <ArrowRight options={arrowRightOption} check={(repairorder?.status as string) ?? 'create'} />
            <PageContent>
               <Box sx={{ px: '12px', height: '430px' }}>
                  <TabContext value={valueTab}>
                     <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={handleChange} aria-label="lab API tabs example">
                           <Tab label="Thông tin" value="1" />
                           <Tab label="Dịch vụ" value="2" />
                           <Tab label="Vật tư thay thế" value="3" />
                        </TabList>
                     </Box>
                     <TabPanel value="1" sx={{ px: 0 }}>
                        <PepairOderBillDetails repairorder={repairorder as never} />
                     </TabPanel>
                     <TabPanel value="2" sx={{ px: 0 }}>
                        <PepairOderServiceDetails services={repairorder?.services || []} />
                     </TabPanel>
                     <TabPanel value="3" sx={{ px: 0 }}>
                        <PepairOderSupplieDetails supplies={repairorder?.supplies || []} />
                     </TabPanel>
                  </TabContext>
               </Box>
            </PageContent>
         </BaseBreadcrumbs>
      </Box>
   );
};

export default RepairOrderDetails;
