/* eslint-disable @typescript-eslint/naming-convention */
import ButtonCreate from '@App/component/common/ButtonCreate';
import ButtonEdit from '@App/component/common/ButtonEdit';
import ROUTE_PATH from '@App/configs/router-path';
import { STATUS_REPAIR, STATUS_REPAIR_DETAIL } from '@App/configs/status-config';
import repairInvoiceService from '@App/services/repair-invoice';
import { ResponseFindOneRepairInvoice } from '@App/types/repair-invoice';
import { AxiosResponseData } from '@Core/Api/axios-config';
import { errorMessage, successMessage } from '@Core/Helper/message';
import { Box, Button } from '@mui/material';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import deliveryNotesService from '@App/services/delivery.service';
import { useConfirm } from '@Core/Component/Comfirm/CoreComfirm';
import { useMemo } from 'react';

interface RepairDetailActionProps {
   data: ResponseFindOneRepairInvoice | undefined;
   refetchRepairInvoice: <TPageData>(
      options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
   ) => Promise<QueryObserverResult<ResponseFindOneRepairInvoice, unknown>>;
}

const RepairDetailAction = ({ data, refetchRepairInvoice }: RepairDetailActionProps) => {
   const { id: repairInvoicId } = useParams();
   const status = data?.status;

   const coreConfirm = useConfirm();

   const { mutate: handleUpdateRepairInvoiceStatus } = useMutation({
      mutationFn: async (data: { status: string }) => {
         return await repairInvoiceService.update(data, repairInvoicId, 'patch');
      },
      onSuccess: async (data: AxiosResponseData) => {
         await refetchRepairInvoice();
         successMessage(data.message);
         return data;
      },
      onError: (err: AxiosError) => {
         return errorMessage(err);
      },
   });

   const { mutate: createDeliveryNotes } = useMutation({
      mutationFn: async () => {
         return await deliveryNotesService.create({ repair_invoice_id: data?._id });
      },
      onSuccess: async (data: AxiosResponseData) => {
         await refetchRepairInvoice();
         successMessage(data.message);
         return data;
      },
      onError: (err: AxiosError) => {
         return errorMessage(err);
      },
   });

   const handleUpdateStatusCheck = (status: string, content = 'Xác nhận yêu chuyển trạng thái') => {
      return coreConfirm({
         icon: <ErrorOutlineIcon sx={{ fontSize: '56px' }} color="warning" />,
         title: 'Cảnh báo',
         confirmOk: 'Xác nhận',
         content: content,
         callbackOK: () => {
            handleUpdateRepairInvoiceStatus({ status });
         },
         isIcon: true,
      });
   };

   const handleCreateDeliveryNotes = () => {
      coreConfirm({
         icon: <ErrorOutlineIcon sx={{ fontSize: '56px' }} color="warning" />,
         title: 'Cảnh báo',
         confirmOk: 'Xác nhận',
         content: 'Xác nhận yêu cầu lấy vật tư & chuyển trạng thái',
         callbackOK: createDeliveryNotes,
         isIcon: true,
      });
   };

   return (
      <Box mb={1} display="flex" justifyContent="space-between">
         <Box display="flex" gap={1}>
            <ButtonCreate to={ROUTE_PATH.REPAIR_INVOICE + ROUTE_PATH.CREATE} />
            <ButtonEdit to={ROUTE_PATH.REPAIR_INVOICE + '/' + repairInvoicId + '/update'} />
         </Box>
         <Box display="flex" gap={1}>
            {status === STATUS_REPAIR.create.key && (
               <Button color="warning" onClick={() => handleUpdateStatusCheck(STATUS_REPAIR.check.key)}>
                  Chuyển trạng thái
               </Button>
            )}
            {status === STATUS_REPAIR.shipped.key && (
               <Button color="warning" onClick={() => handleUpdateStatusCheck(STATUS_REPAIR.repair.key)}>
                  Chuyển trạng thái
               </Button>
            )}
            {status === STATUS_REPAIR.repair.key && (
               <Button
                  color="warning"
                  onClick={() =>
                     handleUpdateStatusCheck(STATUS_REPAIR.pay.key, 'Xác nhận chuyển trạng thái sang thanh toán')
                  }
               >
                  {STATUS_REPAIR.pay.title}
               </Button>
            )}
            {status === STATUS_REPAIR.pay.key && (
               <Button color="warning" onClick={() => handleUpdateStatusCheck(STATUS_REPAIR.complete.key)}>
                  {STATUS_REPAIR.complete.title}
               </Button>
            )}
            {status === STATUS_REPAIR.check.key && (
               <Button
                  color="secondary"
                  onClick={() => {
                     handleCreateDeliveryNotes();
                  }}
               >
                  {STATUS_REPAIR.shipped.title}
               </Button>
            )}
            {(status === STATUS_REPAIR.create.key || status === STATUS_REPAIR.check.key) && (
               <Button color="error">Hủy</Button>
            )}
         </Box>
      </Box>
   );
};

export default RepairDetailAction;
