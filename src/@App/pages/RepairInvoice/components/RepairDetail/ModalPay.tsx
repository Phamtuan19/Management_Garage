/* eslint-disable @typescript-eslint/no-misused-promises */
import { ResponseFindOneRepairInvoice } from '@App/types/repair-invoice';
import { useConfirm } from '@Core/Component/Comfirm/CoreComfirm';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Modal, Typography } from '@mui/material';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, useMutation, useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import repairInvoiceService from '@App/services/repair-invoice';
import { errorMessage, successMessage } from '@Core/Helper/message';
import { AxiosResponseData } from '@Core/Api/axios-config';
import { AxiosError } from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { STATUS_REPAIR } from '@App/configs/status-config';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import ControllerAutoComplate from '@Core/Component/Input/ControllerAutoComplate';
import personnelService from '@App/services/personnel.service';
import ControllerTextarea from '@Core/Component/Input/ControllerTextarea';

import { RepairInvoiceStatusPaySchema, repairInvoiceStatusPay } from '../../utils/repair-invoice-update';

interface ModalPayProps {
   open: boolean;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
   //    repairInvoice: ResponseFindOneRepairInvoice | undefined;
   refetchRepairInvoice: <TPageData>(
      options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
   ) => Promise<QueryObserverResult<ResponseFindOneRepairInvoice, unknown>>;
}

const ModalPay = ({ open, refetchRepairInvoice, setOpen }: ModalPayProps) => {
   const { id: repairInvoicId } = useParams();
   const coreConfirm = useConfirm();

   const { data: personnels } = useQuery(['getPersonnelsAllField'], async () => {
      const res = await personnelService.fieldAll({ position: 'technical' });
      return res.data;
   });

   const { handleSubmit, control } = useForm<RepairInvoiceStatusPaySchema>({
      resolver: yupResolver(repairInvoiceStatusPay),
      defaultValues: repairInvoiceStatusPay.getDefault(),
   });

   const { mutate: handleUpdateRepairInvoiceStatus, isLoading } = useMutation({
      mutationFn: async (data: RepairInvoiceStatusPaySchema) => {
         return await repairInvoiceService.update({ ...data, status: STATUS_REPAIR.pay.key }, repairInvoicId, 'patch');
      },
      onSuccess: async (data: AxiosResponseData) => {
         await refetchRepairInvoice();
         successMessage(data.message);
         setOpen(false);
         return data;
      },
      onError: (err: AxiosError) => {
         return errorMessage(err);
      },
   });

   const handleSubmitForm: SubmitHandler<RepairInvoiceStatusPaySchema> = (data) => {
      return coreConfirm({
         icon: <ErrorOutlineIcon sx={{ fontSize: '56px' }} color="warning" />,
         title: 'Cảnh báo',
         confirmOk: 'Xác nhận',
         content: 'Xác nhận thanh toán phiếu sửa chữa.',
         callbackOK: () => {
            handleUpdateRepairInvoiceStatus(data);
         },
         isIcon: true,
      });
   };

   return (
      <Modal open={open}>
         <Box sx={style}>
            <Box display="flex" justifyContent="space-between" borderBottom="1px solid #DADADA">
               <Typography id="modal-modal-title" variant="h6" component="h2">
                  Chuyển trạng thái
               </Typography>
            </Box>
            <Box sx={{ mt: 2 }}>
               <Box minHeight={90}>
                  <ControllerLabel title="Nhân viên sửa chữa" required />
                  <ControllerAutoComplate
                     name="repair_staff_id"
                     options={personnels ?? []}
                     valuePath="_id"
                     titlePath="full_name"
                     control={control}
                     multiple
                     disabled={isLoading}
                  />
               </Box>
               <Box mt={1}>
                  <ControllerLabel title="Ghi chú" />
                  <ControllerTextarea name="describe" minRows={10} control={control as never} disabled={isLoading} />
               </Box>
            </Box>
            <Box mt={3}>
               <Box display="flex" justifyContent="flex-end" gap={1.5}>
                  <Button disabled={isLoading} variant="contained" color="error" onClick={() => setOpen(false)}>
                     Hủy
                  </Button>
                  <LoadingButton variant="contained" loading={isLoading} onClick={handleSubmit(handleSubmitForm)}>
                     Xác nhận
                  </LoadingButton>
               </Box>
            </Box>
         </Box>
      </Modal>
   );
};

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 600,
   //    height: 680,
   bgcolor: 'background.paper',
   borderRadius: '6px',
   boxShadow: 24,
   border: 'none',
   p: '12px 24px',
};

export default ModalPay;
