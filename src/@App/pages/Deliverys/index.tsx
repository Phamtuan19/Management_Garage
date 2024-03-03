/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/naming-convention */
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import PageContent from '@App/component/customs/PageContent';
import MODULE_PAGE from '@App/configs/module-page';
import ROUTE_PATH from '@App/configs/router-path';
import { STATUS_DELIVERY } from '@App/configs/status-config';
import useCoreTable from '@App/hooks/useCoreTable';
import useSearchParamsHook from '@App/hooks/useSearchParamsHook';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import deliveryNotesService, { DeliveryNoteData } from '@App/services/deliveryNotes.service';
import TableCore, { columnHelper } from '@Core/Component/Table';
import { CoreTableActionViewDetail } from '@Core/Component/Table/components/CoreTableAction';
import hendleDateTime from '@Core/Helper/formatDateTime';
import { Box, Chip } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const Deliverys = () => {
   const navigate = useNavigate();

   const { searchParams } = useSearchParamsHook();

   const queryTable = useQuery(['getDeliveryNotesList', searchParams], async () => {
      const res = await deliveryNotesService.get(searchParams);
      return res.data;
   });

   const data = useCoreTable(queryTable);

   const columns = useMemo(() => {
      return [
         columnHelper.accessor((_, index) => index + 1, {
            id: 'STT',
            header: 'STT',
            cell: ({ getValue }) => {
               return <Box alignItems="center">{getValue()}</Box>;
            },
         }),
         columnHelper.accessor('code', {
            header: () => <Box textAlign="center">Mã</Box>,
            cell: ({ row }) => {
               return <Box textAlign="center">{row.getValue('code')} </Box>;
            },
         }),
         columnHelper.accessor('personnel', {
            header: () => <Box textAlign="center">NV tạo</Box>,
            cell: ({ row }) => {
               const delivery = row.original as DeliveryNoteData;

               return <Box textAlign="center">{delivery.personnel.full_name} </Box>;
            },
         }),
         columnHelper.accessor('repair_order', {
            header: () => <Box textAlign="center">Mã PSC</Box>,
            cell: ({ row }) => {
               const delivery = row.original as DeliveryNoteData;
               return <Box textAlign="center">#{delivery.repair_order.code} </Box>;
            },
         }),
         columnHelper.accessor('repair_order', {
            header: () => <Box textAlign="center">Số lượng</Box>,
            cell: ({ row }) => {
               const delivery = row.original as DeliveryNoteData;
               return <Box textAlign="center">{delivery.repair_order_details_size} Vật tư </Box>;
            },
         }),
         columnHelper.accessor('is_shipped', {
            header: () => <Box textAlign="center">Trạng thái</Box>,
            cell: ({ row }) => {
               const delivery = row.original as DeliveryNoteData;

               return (
                  <Box textAlign="center">
                     <Chip
                        label={STATUS_DELIVERY[delivery.status].title}
                        color={STATUS_DELIVERY[delivery.status].color}
                     />
                  </Box>
               );
            },
         }),
         columnHelper.accessor('createdAt', {
            header: () => <Box textAlign="center">Ngày tạo</Box>,
            cell: ({ row }) => {
               return <Box textAlign="center">{hendleDateTime(row.getValue('createdAt'))} </Box>;
            },
         }),
         columnHelper.accessor('', {
            header: 'Thao tác',
            cell: ({ row }) => {
               const delivery = row.original as DeliveryNoteData;
               return (
                  <Box>
                     <PermissionAccessRoute module={MODULE_PAGE.DELIVERY_NOTE} action="VIEW_ONE">
                        <CoreTableActionViewDetail
                           callback={() => navigate(ROUTE_PATH.DELIVERY_NOTES + '/' + delivery._id + '/details')}
                        />
                     </PermissionAccessRoute>
                  </Box>
               );
            },
         }),
      ];
   }, []);

   return (
      <BaseBreadcrumbs arialabel="Phiếu xuất kho">
         <PageContent>
            <TableCore columns={columns} {...data} />
         </PageContent>
      </BaseBreadcrumbs>
   );
};

export default Deliverys;
