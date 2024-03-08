/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/naming-convention */
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import PageContent from '@App/component/customs/PageContent';
import Switch from '@App/component/customs/Switch';
import MODULE_PAGE from '@App/configs/module-page';
import ROUTE_PATH from '@App/configs/router-path';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import deliveryNotesService, { FindOneDeliveryNode } from '@App/services/deliveryNotes.service';
import repairOrderDetailService from '@App/services/repairOrderDetail.service';
import { RepairOrderSupplies } from '@App/services/repairorder.service';
import { useConfirm } from '@Core/Component/Comfirm/CoreComfirm';
import TableCore, { columnHelper } from '@Core/Component/Table';
import { CoreTableActionEdit } from '@Core/Component/Table/components/CoreTableAction';
import handlePrice from '@Core/Helper/formatPrice';
import { errorMessage, successMessage } from '@Core/Helper/message';
import { LoadingButton } from '@mui/lab';
import { Box, Button, Chip, Modal, Typography } from '@mui/material';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useParams } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useState } from 'react';
import { Control, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ControllerLabel from '@Core/Component/Input/ControllerLabel';
import ControllerTextField from '@Core/Component/Input/ControllerTextField';
import ControllerTextarea from '@Core/Component/Input/ControllerTextarea';

import { DeliveryUpdateExportQuantity, deliveryUpdateExportQuantity } from './utils/delivery';

const breadcrumbs = [
   {
      title: 'Phiếu xuất kho',
      link: ROUTE_PATH.DELIVERY_NOTES,
   },
];

const DeliveryUpdate = () => {
   const { id: deliveryId } = useParams();
   const coreConfirm = useConfirm();
   const [open, setOpen] = useState(false);

   const { control, setValue, handleSubmit, reset, watch } = useForm<DeliveryUpdateExportQuantity>({
      mode: 'onSubmit',
      reValidateMode: 'onSubmit',
      resolver: yupResolver(deliveryUpdateExportQuantity),
      defaultValues: deliveryUpdateExportQuantity.getDefault(),
   });

   const { data: delivery, refetch } = useQuery(['getDeliveryNote', deliveryId], async () => {
      const res = await deliveryNotesService.find(deliveryId as string);
      return res.data as FindOneDeliveryNode;
   });

   const { mutate: updateExportQuantity, isLoading: isLoadingExportQuantityCustom } = useMutation({
      mutationFn: async ({
         id,
         export_quantity,
         type,
         describe = '',
      }: {
         id: string;
         export_quantity: number;
         type: 'full' | 'custom';
         describe?: string;
      }) => {
         return await repairOrderDetailService.updateExportQuantity(id, { export_quantity, type, describe });
      },
      onSuccess: () => {
         successMessage('Xuất vật tư thành công.');
         setOpen(false);
         reset();
         return refetch();
      },
      onError: (err: AxiosError) => {
         return errorMessage(err);
      },
   });

   const hanleUpdateFullExportQuantity = (id: string, export_quantity: number) => {
      coreConfirm({
         icon: <ErrorOutlineIcon sx={{ fontSize: '56px' }} color="warning" />,
         title: 'Xác nhận',
         confirmOk: 'Lưu',
         content:
            export_quantity > 0
               ? `Xác nhận xuất ${export_quantity} vật tư?.`
               : `Xác nhận thu hồi số lượng vật tư đã xuất?.`,
         callbackOK: () => {
            updateExportQuantity({
               id: id,
               export_quantity: export_quantity,
               type: export_quantity === 0 ? 'custom' : 'full',
            });
         },
         isIcon: true,
      });
   };

   const columns = [
      columnHelper.accessor('', {
         id: 'stt',
         header: () => <Box sx={{ textAlign: 'center' }}>STT</Box>,
         cell: ({ row }) => <Box sx={{ textAlign: 'center', p: 1 }}>{row.index + 1}</Box>,
      }),
      columnHelper.accessor('supplies_detail_code', {
         header: () => <Box sx={{ textAlign: 'center' }}>Mã VT</Box>,
         cell: ({ row }) => {
            const supplies = row.original as RepairOrderSupplies;
            return <Box sx={{ textAlign: 'center' }}>#{supplies.supplies_detail.code}</Box>;
         },
      }),
      columnHelper.accessor('supplies_detail_name', {
         header: () => <Box sx={{ textAlign: 'center' }}>Tên VT</Box>,
         cell: ({ row }) => {
            const supplies = row.original as RepairOrderSupplies;
            return <Box sx={{ textAlign: 'center' }}>{supplies.supplies_detail.name_detail}</Box>;
         },
      }),
      columnHelper.accessor('distributor_name', {
         header: () => <Box>Nhà phân phối</Box>,
         cell: (info) => {
            return <Box>{info.getValue()}</Box>;
         },
      }),
      columnHelper.accessor('supplies_invoices_code', {
         header: () => <Box sx={{ textAlign: 'center' }}>Mã lô</Box>,
         cell: ({ row }) => {
            const supplies = row.original as RepairOrderSupplies;
            return <Box sx={{ textAlign: 'center' }}>#{supplies.supplies_invoices_code}</Box>;
         },
      }),
      columnHelper.accessor('supplies_detail_quantity_received', {
         header: () => <Box sx={{ textAlign: 'center' }}>Tồn kho</Box>,
         cell: ({ row }) => {
            const supplies = row.original as RepairOrderSupplies;
            return (
               <Box sx={{ textAlign: 'center' }}>
                  <Chip label={supplies.supplies_detail_quantity_received} color="info" />
               </Box>
            );
         },
      }),
      columnHelper.accessor('selling_price', {
         header: () => <Box sx={{ textAlign: 'center' }}>Giá bán</Box>,
         cell: ({ row }) => {
            const supplies = row.original as RepairOrderSupplies;
            return <Box sx={{ textAlign: 'center' }}>{handlePrice(supplies.price)}</Box>;
         },
      }),
      columnHelper.accessor('quantity', {
         header: () => <Box sx={{ textAlign: 'center' }}>SL cần xuất</Box>,
         cell: ({ row }) => {
            const supplies = row.original as RepairOrderSupplies;

            return (
               <Box sx={{ textAlign: 'center' }}>
                  <Chip label={supplies.quantity} color="warning" />
               </Box>
            );
         },
      }),
      columnHelper.accessor('export_quantity', {
         header: () => <Box sx={{ textAlign: 'center' }}>SL đã xuất</Box>,
         cell: ({ row }) => {
            const supplies = row.original as RepairOrderSupplies;

            return (
               <Box sx={{ textAlign: 'center' }}>
                  <Chip label={supplies.export_quantity} color="success" />
               </Box>
            );
         },
      }),
      columnHelper.accessor('export_quantity_1', {
         header: () => <Box sx={{ textAlign: 'center' }}>SL thiếu</Box>,
         cell: ({ row }) => {
            const supplies = row.original as RepairOrderSupplies;

            return (
               <Box sx={{ textAlign: 'center' }}>
                  <Chip label={supplies.quantity - supplies.export_quantity} color="error" />
               </Box>
            );
         },
      }),
      columnHelper.accessor('status_export_quantity', {
         header: () => <Box sx={{ textAlign: 'center' }}>Trạng thái xuất</Box>,
         cell: ({ row }) => {
            const supplies = row.original as RepairOrderSupplies;

            return (
               <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Switch
                     sx={{ m: 1 }}
                     checked={supplies.is_shipped}
                     onChange={(e) => {
                        hanleUpdateFullExportQuantity(supplies._id, e.target.checked ? supplies.quantity : 0);
                     }}
                  />
               </Box>
            );
         },
      }),
      columnHelper.accessor('action', {
         header: () => <Box sx={{ textAlign: 'center' }}>Thao tác</Box>,
         cell: ({ row }) => {
            const supplies = row.original as RepairOrderSupplies;

            return (
               <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <PermissionAccessRoute module={MODULE_PAGE.DELIVERY_NOTE} action="VIEW_ALL">
                     <CoreTableActionEdit
                        callback={() => {
                           setOpen(true);
                           setValue('id', supplies._id);
                           setValue('describe', supplies.describe_export);
                           setValue('inventory', supplies.supplies_detail_quantity_received);
                        }}
                     />
                  </PermissionAccessRoute>
               </Box>
            );
         },
      }),
   ];

   const handleSubmitForm: SubmitHandler<DeliveryUpdateExportQuantity> = (data) => {
      updateExportQuantity({ ...data, type: 'custom' });
   };

   return (
      <BaseBreadcrumbs arialabel={'#' + delivery?.code} breadcrumbs={breadcrumbs}>
         <LoadingButton type="submit" variant="contained" loading={false}>
            Xuất tất cả
         </LoadingButton>
         <PageContent>
            <TableCore height={320} columns={columns} data={delivery?.supplies_order || []} isPagination={false} />
         </PageContent>
         <Modal
            open={open}
            // onClose={handleClose}
         >
            <Box sx={style} component="form">
               <Typography id="modal-modal-title" variant="h6" component="h2">
                  Tùy chọn
               </Typography>
               <Box mt={2} display="flex" flexDirection="column" gap={2}>
                  <Box minHeight="80px">
                     <ControllerLabel title="Tồn kho" />
                     <ControllerTextField name="inventory" number control={control} disabled />
                  </Box>
                  <Box minHeight="80px">
                     <ControllerLabel title="Số lượng xuất" required />
                     <ControllerTextField name="export_quantity" number control={control} />
                  </Box>
                  <Box minHeight="150px">
                     <ControllerLabel title="Mô tả" required />
                     <ControllerTextarea
                        name="describe"
                        minRows={10}
                        control={control as unknown as Control<FieldValues>}
                     />
                  </Box>
               </Box>
               <Box mt={2} display="flex" justifyContent="flex-end" gap={2}>
                  <Button
                     variant="outlined"
                     color="error"
                     onClick={() => {
                        setOpen(false);
                        reset();
                     }}
                  >
                     Hủy
                  </Button>
                  <LoadingButton
                     variant="contained"
                     onClick={handleSubmit(handleSubmitForm)}
                     disabled={Number(watch('export_quantity')) === 0}
                     loading={isLoadingExportQuantityCustom}
                  >
                     Lưu
                  </LoadingButton>
               </Box>
            </Box>
         </Modal>
      </BaseBreadcrumbs>
   );
};

const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 500,
   bgcolor: 'background.paper',
   boxShadow: 24,
   p: '24px',
   borderRadius: '6px',
};

export default DeliveryUpdate;
