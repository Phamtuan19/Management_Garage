/* eslint-disable react-hooks/exhaustive-deps */
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import PageContent from '@App/component/customs/PageContent';
import ROUTE_PATH from '@App/configs/router-path';
import deliveryNotesService from '@App/services/delivery.service';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { DeliveryNoteData, DeliveryNoteDataDetail } from '@App/types/delivery';
import TableCore, { columnHelper } from '@Core/Component/Table';
import { Box, Button, Chip } from '@mui/material';
import { STATUS_DELIVERY } from '@App/configs/status-config';
import { useMemo, useRef } from 'react';
import MODULE_PAGE from '@App/configs/module-page';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import { CoreTableActionOutput } from '@Core/Component/Table/components/CoreTableAction';
import HistoryIcon from '@mui/icons-material/History';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import DetailDeliveryInfo from './components/DetailDeliveryInfo';
import RenderSubComponent from './components/RenderSubComponent';
import ModalExportSupplies from './components/ModalExportSupplies';
import { DeliveryUpdateExportQuantity, deliveryUpdateExportQuantity } from './utils/delivery';
import { ModalExportSuppliesRef } from './utils/modal-export-supplies';
import ModalExportHistory from './components/ModalExportHistory';

const breadcrumbs = [
   {
      title: 'Phiếu xuất kho',
      link: ROUTE_PATH.DELIVERY_NOTES,
   },
];

const DeliveryUpdate = () => {
   const { id: deliveryId } = useParams();
   const form = useForm<DeliveryUpdateExportQuantity>({
      resolver: yupResolver(deliveryUpdateExportQuantity),
      defaultValues: deliveryUpdateExportQuantity.getDefault(),
   });

   const refModalExport = useRef<ModalExportSuppliesRef>(null);
   const refModalHistory = useRef<ModalExportSuppliesRef>(null);

   // const coreConfirm = useConfirm();

   const {
      data: delivery,
      refetch: refetchDelivery,
      isLoading: isLoadingDelivery,
   } = useQuery(['getDeliveryNote', deliveryId], async () => {
      const res = await deliveryNotesService.find(deliveryId as string);
      return res.data as DeliveryNoteData;
   });

   // const { mutate: updateExportAllDelivery, isLoading: isLoadingExport } = useMutation({
   //    mutationFn: async () => {
   //       return await deliveryOptionService.update({}, deliveryId as string);
   //    },
   //    onSuccess: (data) => {
   //       return successMessage(data.message);
   //    },
   //    onError: (err: AxiosError) => {
   //       return errorMessage(err);
   //    },
   // });

   const columns = useMemo(() => {
      return [
         // columnHelper.accessor('', {
         //    id: 'stt',
         //    header: () => <Box sx={{ textAlign: 'center' }}>STT</Box>,
         //    cell: ({ row }) => <Box sx={{ textAlign: 'center', p: 1 }}>{row.index + 1}</Box>,
         // }),
         columnHelper.accessor('expander', {
            header: 'Chi tiết',
            cell: ({ row }) => {
               return (
                  <Box textAlign="center" width="25px" py={1}>
                     {row.getCanExpand() ? (
                        <Button
                           variant="text"
                           sx={{ p: '1px 2px', minWidth: 'auto' }}
                           {...{
                              onClick: row.getToggleExpandedHandler(),
                              style: { cursor: 'pointer' },
                           }}
                        >
                           {row.getIsExpanded() ? '👇' : '👉'}
                        </Button>
                     ) : (
                        '🔵'
                     )}{' '}
                  </Box>
               );
            },
         }),
         columnHelper.accessor('supplies_detail_code', {
            header: () => <Box sx={{ textAlign: 'center' }}>Mã VT</Box>,
            cell: (info) => {
               return <Box sx={{ textAlign: 'center' }}>#{info.getValue()}</Box>;
            },
         }),
         columnHelper.accessor('supplies_detail_name', {
            header: () => <Box>Tên vật tư</Box>,
            cell: (info) => {
               return <Box>{info.getValue()}</Box>;
            },
         }),
         columnHelper.accessor('distributors_name', {
            header: () => <Box>Nhà phân phối</Box>,
            cell: (info) => {
               return <Box>{info.getValue()}</Box>;
            },
         }),
         columnHelper.accessor('unit', {
            header: () => <Box>Đvt</Box>,
            cell: (info) => {
               return <Box>{info.getValue()}</Box>;
            },
         }),
         columnHelper.accessor('quantity', {
            header: () => <Box>Số lượng</Box>,
            cell: (info) => {
               return <Box sx={{ textAlign: 'center' }}>{info.getValue()}</Box>;
            },
         }),
         columnHelper.accessor('supplies_detail_isInStock', {
            header: () => <Box sx={{ textAlign: 'center' }}>Trạng thái vt</Box>,
            cell: (info) => {
               return (
                  <Box sx={{ textAlign: 'center' }}>
                     <Chip
                        label={info.getValue() ? 'Còn hàng' : 'Hêt hàng'}
                        color={info.getValue() ? 'default' : 'error'}
                     />
                  </Box>
               );
            },
         }),
         columnHelper.accessor('status', {
            header: () => <Box sx={{ textAlign: 'center' }}>Trạng thái xuât kho</Box>,
            cell: ({ row }) => {
               const delivery = row.original as DeliveryNoteDataDetail;
               return (
                  <Box sx={{ textAlign: 'center' }}>
                     <Chip
                        label={STATUS_DELIVERY[delivery.status].title}
                        color={STATUS_DELIVERY[delivery.status].color}
                     />
                  </Box>
               );
            },
         }),
         columnHelper.accessor('action', {
            header: () => <Box sx={{ textAlign: 'center' }}>Thao tác</Box>,
            cell: ({ row }) => {
               const delivery = row.original as DeliveryNoteDataDetail;
               
               return (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                     {delivery.status !== STATUS_DELIVERY.confirmed.key && (
                        <PermissionAccessRoute module={MODULE_PAGE.DELIVERY_NOTE} action="VIEW_ALL">
                           <CoreTableActionOutput
                              title="Xuất kho"
                              callback={() => {
                                 refModalExport?.current?.setOpen(true);
                                 refModalExport?.current?.setData(delivery);
                                 form.setValue('total_quantity', delivery.quantity);
                                 form.setValue('exports', delivery.options as never);
                              }}
                           />
                        </PermissionAccessRoute>
                     )}
                     {/* <PermissionAccessRoute module={MODULE_PAGE.DELIVERY_NOTE} action="VIEW_ALL">
                        <CoreTableActionEdit callback={() => {}} />
                     </PermissionAccessRoute> */}
                     {/* <PermissionAccessRoute module={MODULE_PAGE.DELIVERY_NOTE} action="VIEW_ALL">
                        <CoreTableActionHistory
                           callback={() => {
                              refModalHistory.current?.setOpen(true);
                              refModalHistory.current?.setData(delivery);
                           }}
                        />
                     </PermissionAccessRoute> */}
                  </Box>
               );
            },
         }),
      ];
   }, []);

   // const handleSubmitForm: SubmitHandler<DeliveryUpdateExportQuantity> = (data) => {
   //    updateExportQuantity({ ...data, type: 'custom' });
   // };

   const handleClickHistory = () => {
      refModalHistory.current?.setOpen(true);
      refModalHistory.current?.setData(delivery?.history as never);
   };

   // const handleClickExportAll = () => {
   //    return coreConfirm({
   //       icon: <ErrorOutlineIcon sx={{ fontSize: '56px' }} color="warning" />,
   //       title: 'Cảnh báo',
   //       confirmOk: 'Xác nhận',
   //       content: 'Xác nhận xuất tất cả vật tư',
   //       callbackOK: () => {
   //          updateExportAllDelivery();
   //       },
   //       isIcon: true,
   //    });
   // };

   return (
      <BaseBreadcrumbs
         arialabel={'#' + delivery?.code}
         breadcrumbs={breadcrumbs}
         isCheck
         data={delivery}
         isLoading={isLoadingDelivery}
      >
         <Box display="flex" justifyContent="space-between">
            {/* <LoadingButton variant="contained" loading={isLoadingExport} onClick={handleClickExportAll}>
               Xuất tất cả
            </LoadingButton> */}
            <Button color="secondary" endIcon={<HistoryIcon />} onClick={handleClickHistory}>
               Lịch sử
            </Button>
         </Box>
         <PageContent>
            <DetailDeliveryInfo delivery={delivery} />
         </PageContent>
         <PageContent>
            <TableCore
               height={320}
               columns={columns}
               data={delivery?.details || []}
               isPagination={false}
               getRowCanExpand={() => true}
               renderSubComponent={(row) => <RenderSubComponent row={row} />}
            />
         </PageContent>
         <ModalExportSupplies ref={refModalExport} refetchDelivery={refetchDelivery} form={form} />
         <ModalExportHistory ref={refModalHistory} />
      </BaseBreadcrumbs>
   );
};

export default DeliveryUpdate;
