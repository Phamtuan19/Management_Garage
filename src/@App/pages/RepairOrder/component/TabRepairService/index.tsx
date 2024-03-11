/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/naming-convention */
import { UseFieldArrayReturn, UseFormReturn } from 'react-hook-form';
import TableCore, { columnHelper } from '@Core/Component/Table';
import { Box, ButtonBase, Chip, Modal, Typography } from '@mui/material';
import handlePrice from '@Core/Helper/formatPrice';
import { useParams } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import repairOrderDetailService from '@App/services/repairOrderDetail.service';
import { AxiosResponseData, HandleErrorApi } from '@Core/Api/axios-config';
import { errorMessage, successMessage } from '@Core/Helper/message';
import { AxiosError } from 'axios';
import { CoreTableActionDelete, CoreTableActionViewDetail } from '@Core/Component/Table/components/CoreTableAction';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { STATUS_REPAIR_DETAIL, StatusRepairDetail } from '@App/configs/status-config';
import ScrollbarBase from '@App/component/customs/ScrollbarBase';

import { RepairInvoiceSchema } from '../../utils/repair-invoice';

import AccordionDetailItem from './AccordionDetailItem';

interface TabSuppliesServicePropType {
   form: UseFormReturn<RepairInvoiceSchema>;
   fieldArray: UseFieldArrayReturn<RepairInvoiceSchema>;
   columnVisibility: any;
   setColumnVisibility: React.Dispatch<any>;
}
interface ReapirService {
   _id: string;
   repair_service_id: string;
   repair_service_code: string;
   repair_service_name: string;
   quantity: number;
   price: number;
   discount: number;
   describe: string;
   details:
      | Array<{
           name: string;
           describe: string;
           status: StatusRepairDetail;
           personnel_id: string;
           note: string;
        }>
      | [];
}

const TabRepairService = ({ form, fieldArray, columnVisibility, setColumnVisibility }: TabSuppliesServicePropType) => {
   const { id: repairOrderId } = useParams();
   const [open, setOpen] = useState<boolean>(false);
   const [dataDetails, setDataDetails] = useState<
      Array<{
         suppliesServiceIndex: number;
         name: string;
         describe: string;
         status: StatusRepairDetail;
         personnel_id: string;
         note: string;
      }>
   >([]);
   const { watch } = form;

   const { remove } = fieldArray;

   const dataServices = watch('suppliesService');

   const { mutate: handleDeleteRepairDetailsSupplies } = useMutation({
      mutationFn: async (id: string) => {
         const res = await repairOrderDetailService.delete(id);
         return res;
      },
      onSuccess: (data: AxiosResponseData) => {
         successMessage(data.message || 'Xóa thành công');
      },
      onError: (err: AxiosError) => {
         const dataError = err.response?.data as HandleErrorApi;

         return errorMessage((dataError?.message as unknown as string) || 'Xóa thất bại');
      },
   });

   const handleDeleteItem = (invoice: ReapirService, index: number) => {
      if (repairOrderId) {
         if (invoice._id) {
            handleDeleteRepairDetailsSupplies(invoice._id);
         }
      }

      return remove(index);
   };

   const columnsService = [
      columnHelper.accessor('', {
         id: 'stt',
         header: () => <Box sx={{ textAlign: 'center' }}>STT</Box>,
         cell: ({ row }) => <Box sx={{ textAlign: 'center' }}>{row.index + 1}</Box>,
      }),
      columnHelper.accessor('repair_service_code', {
         header: () => <Box sx={{ textAlign: 'center' }}>Mã Dv</Box>,
         cell: (info) => <Box sx={{ textAlign: 'center' }}>#{info.getValue()}</Box>,
      }),
      columnHelper.accessor('repair_service_name', {
         header: () => <Box>Tên Dv</Box>,
         cell: (info) => (
            <Box sx={{ textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '200px' }}>{info.getValue()}</Box>
         ),
      }),
      columnHelper.accessor('price', {
         header: () => <Box sx={{ textAlign: 'center' }}>Giá</Box>,
         cell: ({ row }) => {
            const price = watch(`suppliesService.${row.index}.price`);
            return <Box sx={{ textAlign: 'center' }}>{handlePrice(price)}</Box>;
         },
      }),
      columnHelper.accessor('discount', {
         header: () => <Box sx={{ textAlign: 'center' }}>Giá Km</Box>,
         cell: (info) => <Box sx={{ textAlign: 'center' }}>{info.getValue()}%</Box>,
      }),
      columnHelper.accessor('quantity', {
         header: () => <Box sx={{ textAlign: 'center' }}>Số lượng</Box>,
         cell: (info) => <Box sx={{ textAlign: 'center' }}>{info.getValue()}</Box>,
      }),
      columnHelper.accessor('total_price', {
         header: () => <Box sx={{ textAlign: 'center' }}>Tổng</Box>,
         cell: ({ row }) => {
            const price = form.watch(`suppliesService.${row.index}.price`);
            const discount = form.watch(`suppliesService.${row.index}.discount`);

            const total_price = price - (price * discount) / 100;

            return <Box sx={{ textAlign: 'center' }}>{handlePrice(total_price)}</Box>;
         },
      }),
      repairOrderId &&
         columnHelper.accessor('status_order', {
            header: () => <Box sx={{ textAlign: 'center' }}>Trạng thái SC</Box>,
            cell: ({ row }) => {
               const invoice = row.original as ReapirService;
               const status = invoice.details.every((detail) => detail.status === STATUS_REPAIR_DETAIL.complete.key)
                  ? {
                       title: 'Hoàn thành',
                       color: 'success',
                    }
                  : invoice.details.some((detail) => detail.status === STATUS_REPAIR_DETAIL.close.key)
                    ? {
                         title: 'Hủy',
                         color: 'error',
                      }
                    : {
                         title: 'Chưa hoàn thành',
                         color: 'default',
                      };
               return (
                  <Box sx={{ textAlign: 'center' }}>
                     <Chip label={status.title} color={status.color as never} />
                  </Box>
               );
            },
         }),
      columnHelper.accessor('action', {
         header: () => <Box sx={{ textAlign: 'center' }}>Thao tác</Box>,
         cell: ({ row }) => {
            const invoice = row.original as ReapirService;

            return (
               <Box display="flex" justifyContent="right" gap="6px" px={1}>
                  <CoreTableActionViewDetail
                     callback={() => {
                        setOpen(true);
                        setDataDetails(invoice.details.map((item) => ({ ...item, suppliesServiceIndex: row.index })));
                     }}
                  />
                  <CoreTableActionDelete callback={() => handleDeleteItem(invoice, row.index)} />
               </Box>
            );
         },
      }),
   ].filter(Boolean);

   return (
      <>
         <TableCore
            height={340}
            columns={columnsService as never}
            data={dataServices}
            isPagination={false}
            noData="Chưa có dịch vụ sửa chữa."
            columnVisibility={columnVisibility}
            onColumnVisibilityChange={setColumnVisibility}
         />
         <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
            <Box sx={style}>
               <Box
                  sx={{
                     display: 'flex',
                     justifyContent: 'space-between',
                     px: '12px',
                     pb: 1,
                     borderBottom: '1px solid #E8EAEB',
                  }}
               >
                  <Typography id="modal-modal-title" variant="h6" component="h2">
                     Công việc thực hiện
                  </Typography>
                  <ButtonBase onClick={() => setOpen(false)}>
                     <CloseIcon />
                  </ButtonBase>
               </Box>
               <Box>
                  <ScrollbarBase sx={{ height: '430px', px: '12px' }}>
                     {dataDetails.map((item, index) => (
                        <AccordionDetailItem index={index} form={form} item={item} key={index} />
                     ))}
                  </ScrollbarBase>
               </Box>
            </Box>
         </Modal>
      </>
   );
};

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 600,
   height: 500,
   bgcolor: 'background.paper',
   borderRadius: '6px',
   boxShadow: 24,
   p: '12px 0px',
   zIndex: 99999,
};

export default TabRepairService;
