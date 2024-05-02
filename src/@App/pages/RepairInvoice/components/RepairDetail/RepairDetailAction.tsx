/* eslint-disable @typescript-eslint/naming-convention */
import ButtonCreate from '@App/component/common/ButtonCreate';
import ButtonEdit from '@App/component/common/ButtonEdit';
import ROUTE_PATH from '@App/configs/router-path';
import { STATUS_REPAIR, STATUS_REPAIR_DETAIL } from '@App/configs/status-config';
import { ResponseFindOneRepairInvoice } from '@App/types/repair-invoice';
import { AxiosResponseData } from '@Core/Api/axios-config';
import { errorMessage, successMessage } from '@Core/Helper/message';
import { Box, Button } from '@mui/material';
import { QueryObserverResult, RefetchOptions, RefetchQueryFilters, useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useConfirm } from '@Core/Component/Comfirm/CoreComfirm';
import { useMemo } from 'react';
import repairInvoiceService from '@App/services/repair-invoice';
// import PDFExportRepairInvoice from '@App/helpers/export-file-pdf';
// import exportFileExcel from '@App/helpers/export-file-excel';

import { arrowRightOption } from '../../utils';

interface RepairDetailActionProps {
   data: ResponseFindOneRepairInvoice | undefined;
   refetchRepairInvoice: <TPageData>(
      options?: (RefetchOptions & RefetchQueryFilters<TPageData>) | undefined,
   ) => Promise<QueryObserverResult<ResponseFindOneRepairInvoice, unknown>>;
   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
   setOpenModalPay: React.Dispatch<React.SetStateAction<boolean>>;
}

const RepairDetailAction = ({ data, refetchRepairInvoice, setOpen, setOpenModalPay }: RepairDetailActionProps) => {
   // const [openPdf, setOpenPdf] = useState(false);
   // const handleOpen = () => setOpenPdf(true);
   // const handleClose = () => setOpenPdf(false);
   const { id: repairInvoicId } = useParams();
   const status = data?.status;

   const isCheckPay = data?.repairInvoiceSupplies.every((item) => item.options.length > 0);

   const isCheckShipped = data?.repairInvoiceSupplies.every((item) => {
      const total_option = item.options.reduce((total, option) => (total += option.export_quantity), 0);

      return total_option === item.quantity;
   });

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

   const handleUpdateStatusCheck = (status: string, content = 'Xác nhận yêu chuyển trạng thái') => {
      if (status === STATUS_REPAIR.complete.key) {
         return setOpen(true);
      }

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

   const indexStatusRepairInvoice = useMemo(() => {
      return arrowRightOption.findIndex((item) => item.name === status);
   }, [status]);

   return (
      <Box mb={1} display="flex" justifyContent="space-between">
         {status !== STATUS_REPAIR.complete.key && status !== STATUS_REPAIR.close.key && (
            <Box display="flex" gap={1}>
               <ButtonCreate to={ROUTE_PATH.REPAIR_INVOICE + ROUTE_PATH.CREATE} />
               <ButtonEdit to={ROUTE_PATH.REPAIR_INVOICE + '/' + repairInvoicId + '/update'} />
            </Box>
         )}
         <Box display="flex" gap={1}>
            {status !== STATUS_REPAIR.complete.key &&
               status !== STATUS_REPAIR.repair.key &&
               status !== STATUS_REPAIR.shipped.key && (
                  <Button
                     color="warning"
                     onClick={() => handleUpdateStatusCheck(arrowRightOption[indexStatusRepairInvoice + 1].name)}
                  >
                     {arrowRightOption[indexStatusRepairInvoice + 1].title}
                  </Button>
               )}
            {/* shipped */}
            {isCheckShipped && status === STATUS_REPAIR.shipped.key && (
               <Button
                  color="warning"
                  onClick={() => handleUpdateStatusCheck(arrowRightOption[indexStatusRepairInvoice + 1].name)}
               >
                  {arrowRightOption[indexStatusRepairInvoice + 1].title}
               </Button>
            )}
            {/* Pay */}
            {isCheckPay && status === STATUS_REPAIR.repair.key && (
               <Button color="warning" onClick={() => setOpenModalPay(true)}>
                  {arrowRightOption[indexStatusRepairInvoice + 1].title}
               </Button>
            )}
            {(status === STATUS_REPAIR.create.key || status === STATUS_REPAIR.check.key) && (
               <Button color="error" onClick={() => handleUpdateStatusCheck(STATUS_REPAIR_DETAIL.close.key)}>
                  Hủy
               </Button>
            )}
            {/* {status === STATUS_REPAIR.complete.key && (
               <>
                  <Button color="inherit" onClick={handleOpen}>
                     Xuất File PDF
                  </Button>
                  <Button
                     color="inherit"
                     onClick={() => {
                        exportFileExcel({ data });
                     }}
                  >
                     Xuất File Excel
                  </Button>
               </>
            )} */}

            {/* <Modal
               open={openPdf}
               onClose={handleClose}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description"
            >
               <Box sx={style}>
                  <PDFExportRepairInvoice />
               </Box>
            </Modal> */}
         </Box>
      </Box>
   );
};

// const style = {
//    position: 'absolute',
//    top: '50%',
//    left: '50%',
//    transform: 'translate(-50%, -50%)',
//    width: '1200px',
//    bgcolor: 'background.paper',
//    boxShadow: 24,
// };

export default RepairDetailAction;
