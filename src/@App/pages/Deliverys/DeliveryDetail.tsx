/* eslint-disable @typescript-eslint/naming-convention */
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
// import HistoryIcon from '@mui/icons-material/History';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import DetailDeliveryInfo from './components/DetailDeliveryInfo';
import RenderSubComponent from './components/RenderSubComponent';
import ModalExportSupplies from './components/ModalExportSupplies';
import { DeliveryUpdateExportQuantity, deliveryUpdateExportQuantity } from './utils/delivery';
import { ModalExportSuppliesRef } from './utils/modal-export-supplies';

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

   const {
      data: delivery,
      refetch: refetchDelivery,
      isLoading: isLoadingDelivery,
   } = useQuery(
      ['getDeliveryNote', deliveryId],
      async () => {
         const res = await deliveryNotesService.find(deliveryId as string);
         return res.data as DeliveryNoteData;
      },
      {
         staleTime: 0,
      },
   );

   const columns = useMemo(() => {
      return [
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
               return <Box sx={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis' }}>{info.getValue()}</Box>;
            },
         }),
         columnHelper.accessor('distributors_name', {
            header: () => <Box>Nhà phân phối</Box>,
            cell: (info) => {
               return <Box sx={{ maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis' }}>{info.getValue()}</Box>;
            },
         }),
         columnHelper.accessor('unit', {
            header: () => <Box>Đvt</Box>,
            cell: (info) => {
               return <Box>{info.getValue()}</Box>;
            },
         }),
         columnHelper.accessor('supplies_detail_isInStock', {
            header: () => <Box sx={{ textAlign: 'center' }}>Trạng thái Vt</Box>,
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

         columnHelper.accessor('export_quantity', {
            header: () => <Box>SL đã xuất</Box>,
            cell: ({ row }) => {
               const delivery = row.original as DeliveryNoteDataDetail;

               const export_quantity =
                  delivery.options.length > 0
                     ? delivery.options.reduce((total, item) => (total += item.export_quantity), 0)
                     : 0;

               return (
                  <Box sx={{ textAlign: 'center' }}>
                     <Chip label={export_quantity} variant="outlined" color="success" />
                  </Box>
               );
            },
         }),
         columnHelper.accessor('quantity', {
            header: () => <Box>Sl yêu cầu</Box>,
            cell: ({ row }) => {
               const delivery = row.original as DeliveryNoteDataDetail;

               return (
                  <Box sx={{ textAlign: 'center' }}>
                     <Chip label={delivery.quantity} variant="outlined" color="warning" />
                  </Box>
               );
            },
         }),
         columnHelper.accessor('type', {
            header: () => <Box sx={{ textAlign: 'center' }}>Trạng thái</Box>,
            cell: ({ row }) => {
               const delivery = row.original as DeliveryNoteDataDetail;

               const quantity = delivery.quantity;

               const export_quantity =
                  delivery.options.length > 0
                     ? delivery.options.reduce((total, item) => (total += item.export_quantity), 0)
                     : 0;

               const statusCheck = {
                  color:
                     quantity === export_quantity
                        ? quantity !== 0
                           ? 'default'
                           : 'error'
                        : quantity > export_quantity
                          ? 'warning'
                          : 'secondary',
                  title:
                     quantity === export_quantity
                        ? quantity !== 0
                           ? 'Hoàn thành'
                           : 'Hủy'
                        : quantity > export_quantity
                          ? 'Chờ Xuất kho'
                          : 'Chờ Thu hồi',
               };

               return (
                  <Box sx={{ textAlign: 'center' }}>
                     <Chip label={statusCheck.title} color={statusCheck?.color as never} />
                  </Box>
               );
            },
         }),
         columnHelper.accessor('action', {
            header: () => <Box sx={{ textAlign: 'center' }}>Thao tác</Box>,
            cell: ({ row }) => {
               const delivery = row.original as DeliveryNoteDataDetail;

               const option = delivery.options.map((item) => ({
                  ...item,
                  quantity_exported: item.export_quantity,
               }));

               const export_options =
                  delivery.options.length > 0
                     ? (option as never)
                     : [
                          {
                             _id: '',
                             delivery_detail_id: '',
                             quantity_exported: 0,
                             export_quantity: 0,
                             repair_invoice_detail_id: '',
                             supplies_invoice_code: '',
                             selling_price: 0,
                             quantity_sold: 0,
                             supplies_invoice_detail_id: '',
                             discount: 0,
                             supplies_invoice_id: '',
                             supplies_service_id: '',
                          },
                       ];

               return (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                     {delivery.status !== STATUS_DELIVERY.confirmed.key && (
                        <PermissionAccessRoute module={MODULE_PAGE.DELIVERY} action="VIEW_ALL">
                           <CoreTableActionOutput
                              title="Xuất kho"
                              callback={() => {
                                 refModalExport?.current?.setOpen(true);
                                 refModalExport?.current?.setData(delivery);
                                 form.setValue('total_quantity', delivery.quantity);
                                 form.setValue('exports', export_options);
                              }}
                           />
                        </PermissionAccessRoute>
                     )}
                     {/* <PermissionAccessRoute module={MODULE_PAGE.DELIVERY} action="VIEW_ALL">
                        <CoreTableActionEdit callback={() => {}} />
                     </PermissionAccessRoute> */}
                     {/* <PermissionAccessRoute module={MODULE_PAGE.DELIVERY} action="VIEW_ALL">
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

   return (
      <BaseBreadcrumbs
         arialabel={'#' + delivery?.code}
         breadcrumbs={breadcrumbs}
         isCheck
         data={delivery}
         isLoading={isLoadingDelivery}
      >
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
      </BaseBreadcrumbs>
   );
};

export default DeliveryUpdate;
