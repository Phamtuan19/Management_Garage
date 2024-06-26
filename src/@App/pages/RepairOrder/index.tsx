/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/naming-convention */
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
import repairorderService, { RepairOrdersResponse } from '@App/services/repairorder.service';
import TableCore, { columnHelper } from '@Core/Component/Table';
import { CoreTableActionEdit, CoreTableActionViewDetail } from '@Core/Component/Table/components/CoreTableAction';
import handlePrice from '@Core/Helper/formatPrice';
import { Box, Button, Chip } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const sortList = [
   {
      title: 'Mã phiếu',
      value: 'code',
   },
];

const Repairorder = () => {
   const navigate = useNavigate();
   const { searchParams } = useSearchParamsHook();

   const queryTable = useQuery(['getRepairorderList', searchParams], async () => {
      const res = await repairorderService.get(searchParams);
      return res.data;
   });

   const data = useCoreTable(queryTable);

   const columns = useMemo(() => {
      return [
         columnHelper.accessor((_, index) => index + 1, {
            id: 'STT',
            header: 'STT',
            cell: ({ getValue }) => {
               return <Box>{getValue()}</Box>;
            },
         }),
         columnHelper.accessor('code', {
            header: () => <Box textAlign="center">Mã</Box>,
            cell: ({ row }) => {
               return <Box textAlign="center">{row.getValue('code')} </Box>;
            },
         }),
         columnHelper.accessor('customer', {
            header: () => <Box textAlign="center">Khách hàng</Box>,
            cell: ({ row }) => {
               const repairOrder = row.original as RepairOrdersResponse;

               return <Box textAlign="center">{repairOrder.customer[0].name} </Box>;
            },
         }),
         columnHelper.accessor('car_id', {
            header: () => <Box textAlign="center">Tên xe</Box>,
            cell: ({ row }) => {
               const repairOrder = row.original as RepairOrdersResponse;
               return <Box textAlign="center">{repairOrder.car_id.name} </Box>;
            },
         }),
         columnHelper.accessor('license_plate', {
            header: () => <Box textAlign="center">Biển số xe</Box>,
            cell: ({ row }) => {
               const repairOrder = row.original as RepairOrdersResponse;
               return <Box textAlign="center">{repairOrder.car_id.license_plate} </Box>;
            },
         }),
         columnHelper.accessor('personnel_id', {
            header: () => <Box textAlign="center">NV Tạo</Box>,
            cell: ({ row }) => {
               const repairOrder = row.original as RepairOrdersResponse;
               return <Box textAlign="center">{repairOrder.personnel_id.full_name} </Box>;
            },
         }),
         columnHelper.accessor('repair_order_detail', {
            header: () => <Box textAlign="center">Số lượng</Box>,
            cell: ({ row }) => {
               const repairOrder = row.original as RepairOrdersResponse;
               return <Box textAlign="center">{repairOrder.repair_order_detail.totel_detail}</Box>;
            },
         }),
         columnHelper.accessor('totle_price', {
            header: () => <Box textAlign="center">Giá</Box>,
            cell: ({ row }) => {
               const repairOrder = row.original as RepairOrdersResponse;
               return <Box textAlign="center">{handlePrice(repairOrder.repair_order_detail.totle_price)}</Box>;
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
               return <Box textAlign="center">{format(row.getValue('createdAt'), 'yyyy-MM-dd')}</Box>;
            },
         }),
         columnHelper.accessor('', {
            header: 'Thao tác',
            cell: ({ row }) => {
               const repairOrder = row.original as RepairOrdersResponse;
               return (
                  <Box>
                     <PermissionAccessRoute module={MODULE_PAGE.REPAIR_INVOICE} action="VIEW_ALL">
                        <CoreTableActionEdit
                           callback={() => navigate(ROUTE_PATH.REPAIR_INVOICE + '/' + repairOrder._id + '/update')}
                        />
                     </PermissionAccessRoute>
                     <PermissionAccessRoute module={MODULE_PAGE.REPAIR_INVOICE} action="VIEW_ONE">
                        <CoreTableActionViewDetail
                           callback={() => navigate(ROUTE_PATH.REPAIR_INVOICE + '/' + repairOrder._id + '/details')}
                        />
                     </PermissionAccessRoute>
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
               <FilterTable sortList={sortList} searchType={sortList} />
            </Box>
            <TableCore columns={columns} {...data} />
         </PageContent>
      </BaseBreadcrumbs>
   );
};
export default Repairorder;
