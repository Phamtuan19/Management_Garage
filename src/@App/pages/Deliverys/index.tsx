/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/naming-convention */
import FilterTable from '@App/component/common/FilterTable';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import PageContent from '@App/component/customs/PageContent';
import MODULE_PAGE from '@App/configs/module-page';
import ROUTE_PATH from '@App/configs/router-path';
import { STATUS_DELIVERY } from '@App/configs/status-config';
import useCoreTable from '@App/hooks/useCoreTable';
import useSearchParamsHook from '@App/hooks/useSearchParamsHook';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import deliveryNotesService from '@App/services/delivery.service';
import { DeliveryNoteData } from '@App/types/delivery';
import TableCore, { columnHelper } from '@Core/Component/Table';
import { CoreTableActionViewDetail } from '@Core/Component/Table/components/CoreTableAction';
import hendleDateTime from '@Core/Helper/formatDateTime';
import { Box, Chip, MenuItem, Select } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const searchType = [
   {
      title: 'Mã phiếu',
      value: 'code',
   },
   {
      title: 'Nhân viên tạo',
      value: 'personnel.full_name',
   },
   {
      title: 'Mã phiếu sửa chữa',
      value: 'repair_invoice.code',
   },
];

const sortList = [
   {
      title: 'Mã phiếu',
      value: 'code',
   },
   {
      title: 'Nhân viên tạo',
      value: 'personnel.full_name',
   },
   {
      title: 'Mã phiếu sửa chữa',
      value: 'repair_invoice.code',
   },
   {
      title: 'Ngày tạo',
      value: 'createdAt',
   },
];

const Deliverys = () => {
   const navigate = useNavigate();

   const { searchParams, setParams } = useSearchParamsHook();

   const queryTable = useQuery(['getDeliveryNotesList', searchParams], async () => {
      const res = await deliveryNotesService.get({
         ...searchParams,
         status: searchParams['status'] === 'all' ? '' : searchParams['status'],
      });
      return res.data;
   });

   const data = useCoreTable(queryTable);

   const columns = useMemo(() => {
      return [
         columnHelper.accessor((_, index) => index + 1, {
            id: 'STT',
            header: () => <Box textAlign="center">STT</Box>,
            cell: ({ getValue }) => {
               return <Box textAlign="center">{getValue()}</Box>;
            },
         }),
         columnHelper.accessor('code', {
            header: () => <Box textAlign="center">Mã phiếu</Box>,
            cell: (info) => {
               return <Box textAlign="center">#{info.getValue()} </Box>;
            },
         }),
         columnHelper.accessor('personnel.full_name', {
            header: () => <Box>Nhân viên tạo</Box>,
            cell: (info) => {
               return <Box>{info.getValue()} </Box>;
            },
         }),
         columnHelper.accessor('repair_invoice.code', {
            header: () => <Box>Mã Psc</Box>,
            cell: (info) => {
               return <Box>#{info.getValue()} </Box>;
            },
         }),
         columnHelper.accessor('status', {
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
            header: () => <Box>Ngày tạo</Box>,
            cell: ({ row }) => {
               return <Box>{hendleDateTime(row.getValue('createdAt'))} </Box>;
            },
         }),
         columnHelper.accessor('', {
            header: 'Thao tác',
            cell: ({ row }) => {
               const delivery = row.original as DeliveryNoteData;
               return (
                  <Box>
                     <PermissionAccessRoute module={MODULE_PAGE.DELIVERY} action="VIEW_ONE">
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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <FilterTable sortList={sortList} searchType={searchType} isDate={true} isReset={true}>
                  <Select
                     placeholder=""
                     value={searchParams['status'] ?? 'all'}
                     fullWidth
                     onChange={(e) => setParams('status', e.target.value)}
                  >
                     <MenuItem value="all">Tất cả</MenuItem>
                     <MenuItem value={STATUS_DELIVERY.confirmed.key}>Đã xác nhận</MenuItem>
                     <MenuItem value={STATUS_DELIVERY.unconfimred.key}>Chờ xác nhận</MenuItem>
                  </Select>
               </FilterTable>
            </Box>
            <TableCore columns={columns} {...data} height={430} />
         </PageContent>
      </BaseBreadcrumbs>
   );
};

export default Deliverys;
