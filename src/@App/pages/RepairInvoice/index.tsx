/* eslint-disable react-hooks/exhaustive-deps */
import FilterTable from '@App/component/common/FilterTable';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import PageContent from '@App/component/customs/PageContent';
import MODULE_PAGE from '@App/configs/module-page';
import PAGE_ACTION from '@App/configs/page-action';
import ROUTE_PATH from '@App/configs/router-path';
import { STATUS_REPAIR } from '@App/configs/status-config';
import useCoreTable from '@App/hooks/useCoreTable';
import useSearchParamsHook from '@App/hooks/useSearchParamsHook';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import repairInvoiceService from '@App/services/repair-invoice';
import { RepairOrdersResponse } from '@App/services/repairorder.service';
import TableCore, { columnHelper } from '@Core/Component/Table';
import { CoreTableActionEdit, CoreTableActionViewDetail } from '@Core/Component/Table/components/CoreTableAction';
import formatDateTime from '@Core/Helper/formatDateTime';
import { Box, Button, Chip } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const searchType = [
   {
      title: 'Mã phiếu',
      value: 'code',
   },
   {
      title: 'Tên khách hàng',
      value: 'customer.name',
   },
   {
      title: 'SĐT khách hàng',
      value: 'customer.phone',
   },
   {
      title: 'Tên xe',
      value: 'car.name',
   },
   {
      title: 'Biển số xe',
      value: 'car.license_plate',
   },
];

const sortList = [
   {
      title: 'Mã phiếu',
      value: 'code',
   },
   {
      title: 'Tên khách hàng',
      value: 'customer.name',
   },
   {
      title: 'SĐT khách hàng',
      value: 'customer.phone',
   },
   {
      title: 'Tên xe',
      value: 'car.name',
   },
   {
      title: 'Biển số xe',
      value: 'car.license_plate',
   },
   {
      title: 'Thời gian',
      value: 'createdAt',
   },
];

const RepairInvoice = () => {
   const navigate = useNavigate();
   const { searchParams } = useSearchParamsHook();

   const queryTable = useQuery(['readRepairInvoice', searchParams], async () => {
      const res = await repairInvoiceService.get(searchParams);
      return res.data;
   });

   const data = useCoreTable(queryTable);

   const columns = useMemo(() => {
      return [
         columnHelper.accessor('STT', {
            header: 'STT',
            cell: ({ row }) => {
               return <Box>{row.index + 1}</Box>;
            },
         }),
         columnHelper.accessor('code', {
            header: () => <Box textAlign="center">Mã Phiếu</Box>,
            cell: (info) => {
               return <Box textAlign="center">#{info.getValue()} </Box>;
            },
         }),
         columnHelper.accessor('customer_id.name', {
            header: () => <Box>Khách hàng</Box>,
            cell: (info) => {
               return <Box>{info.getValue()} </Box>;
            },
         }),
         columnHelper.accessor('customer_id.phone', {
            header: () => <Box>Số điện thoại</Box>,
            cell: (info) => {
               return <Box>{info.getValue()} </Box>;
            },
         }),
         columnHelper.accessor('car_id.name', {
            header: () => <Box textAlign="center">Xe</Box>,
            cell: (info) => {
               return <Box textAlign="center">{info.getValue()} </Box>;
            },
         }),
         columnHelper.accessor('car_id.license_plate', {
            header: () => <Box textAlign="center">Biển số xe</Box>,
            cell: (info) => {
               return <Box textAlign="center">{info.getValue()} </Box>;
            },
         }),
         columnHelper.accessor('personnel_id.full_name', {
            header: () => <Box textAlign="center">NV Tạo</Box>,
            cell: (info) => {
               return <Box textAlign="center">{info.getValue()} </Box>;
            },
         }),
         columnHelper.accessor('status', {
            header: () => <Box textAlign="center">Trạng thái</Box>,
            cell: ({ row }) => {
               const repairOrder = row.original as RepairOrdersResponse;
               return (
                  <Box display="flex" justifyContent="center" alignItems="center">
                     <Chip
                        label={STATUS_REPAIR[repairOrder.status]?.title}
                        color={STATUS_REPAIR[repairOrder.status]?.color}
                     />
                  </Box>
               );
            },
         }),
         columnHelper.accessor('createdAt', {
            header: () => <Box textAlign="center">Ngày tạo</Box>,
            cell: ({ row }) => {
               return <Box textAlign="center">{formatDateTime(row.getValue('createdAt'))}</Box>;
            },
         }),
         columnHelper.accessor('', {
            header: 'Thao tác',
            cell: ({ row }) => {
               const repairOrder = row.original as RepairOrdersResponse;
               return (
                  <Box>
                     <PermissionAccessRoute module={MODULE_PAGE.REPAIR_INVOICE} action="VIEW_ONE">
                        <CoreTableActionViewDetail
                           callback={() => navigate(ROUTE_PATH.REPAIR_INVOICE + '/' + repairOrder._id + '/details')}
                        />
                     </PermissionAccessRoute>
                     {repairOrder.status !== STATUS_REPAIR.pay.key &&
                        repairOrder.status !== STATUS_REPAIR.complete.key &&
                        repairOrder.status !== STATUS_REPAIR.close.key && (
                           <PermissionAccessRoute module={MODULE_PAGE.REPAIR_INVOICE} action="VIEW_ALL">
                              <CoreTableActionEdit
                                 callback={() =>
                                    navigate(ROUTE_PATH.REPAIR_INVOICE + '/' + repairOrder._id + '/update')
                                 }
                              />
                           </PermissionAccessRoute>
                        )}
                  </Box>
               );
            },
         }),
      ];
   }, []);

   return (
      <BaseBreadcrumbs arialabel="Phiếu sửa chữa">
         <Box>
            <PermissionAccessRoute module={MODULE_PAGE.REPAIR_INVOICE} action={PAGE_ACTION.CREATE}>
               <Button component={Link} to="create" size="medium">
                  Thêm mới
               </Button>
            </PermissionAccessRoute>
         </Box>
         <PageContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <FilterTable sortList={sortList} searchType={searchType} />
            </Box>
            <TableCore columns={columns} {...data} />
         </PageContent>
      </BaseBreadcrumbs>
   );
};
export default RepairInvoice;
