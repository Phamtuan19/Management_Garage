/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/naming-convention */
import FilterTable from '@App/component/common/FilterTable';
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import PageContent from '@App/component/customs/PageContent';
import MODULE_PAGE from '@App/configs/module-page';
import PAGE_ACTION from '@App/configs/page-action';
import ROUTE_PATH from '@App/configs/router-path';
import { STATUS_PAYMENT } from '@App/configs/status-config';
import useCoreTable from '@App/hooks/useCoreTable';
import useSearchParamsHook from '@App/hooks/useSearchParamsHook';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import suppliesInvoiceService, { SuppliesInvoicesResponse } from '@App/services/supplies-invoice';
import TableCore, { columnHelper } from '@Core/Component/Table';
import {
   CoreTableActionDelete,
   CoreTableActionEdit,
   CoreTableActionViewDetail,
} from '@Core/Component/Table/components/CoreTableAction';
import handlePrice from '@Core/Helper/hendlePrice';
import { Box, Button, Chip } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SuppliesInvoices = () => {
   const navigate = useNavigate();
   const { searchParams } = useSearchParamsHook();

   const queryTable = useQuery(['getSuppliesInvoiceList', searchParams], async () => {
      const res = await suppliesInvoiceService.get(searchParams);
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
            header: () => <Box textAlign="center">Mã ĐH</Box>,
            cell: ({ row }) => {
               const suppliesInvoice = row.original as SuppliesInvoicesResponse;
               return <Box textAlign="center">#{suppliesInvoice.code}</Box>;
            },
         }),
         columnHelper.accessor('code', {
            header: () => <Box textAlign="center">Người tạo</Box>,
            cell: ({ row }) => {
               const suppliesInvoice = row.original as SuppliesInvoicesResponse;
               return <Box textAlign="center">{suppliesInvoice.personnel.full_name}</Box>;
            },
         }),
         columnHelper.accessor('total_supplies', {
            header: () => <Box textAlign="center">Tổng Loai VT</Box>,
            cell: ({ row }) => {
               const suppliesInvoice = row.original as SuppliesInvoicesResponse;
               return <Box textAlign="center">{suppliesInvoice.total_supplies_details}</Box>;
            },
         }),
         columnHelper.accessor('total_supplies', {
            header: () => <Box textAlign="center">Tổng số VT</Box>,
            cell: ({ row }) => {
               const suppliesInvoice = row.original as SuppliesInvoicesResponse;
               return <Box textAlign="center">{suppliesInvoice.total_supplies}</Box>;
            },
         }),
         columnHelper.accessor('total_price', {
            header: () => <Box textAlign="center">Tổng tiền</Box>,
            cell: ({ row }) => {
               const suppliesInvoice = row.original as SuppliesInvoicesResponse;
               return <Box textAlign="center">{handlePrice(suppliesInvoice.transaction.total_price)}</Box>;
            },
         }),
         columnHelper.accessor('status', {
            header: () => <Box textAlign="center">Thanh toán</Box>,
            cell: ({ row }) => {
               const suppliesInvoice = row.original as SuppliesInvoicesResponse;
               return (
                  <Box display="flex" justifyContent="center" alignItems="center">
                     <Chip
                        label={STATUS_PAYMENT[suppliesInvoice.transaction.status].title}
                        color={STATUS_PAYMENT[suppliesInvoice.transaction.status].color}
                     />
                  </Box>
               );
            },
         }),
         columnHelper.accessor('createdAt', {
            header: () => <Box textAlign="center">Ngày tạo</Box>,
            cell: ({ row }) => {
               return <Box textAlign="center">{format(row.getValue('updatedAt'), 'yyyy-MM-dd')}</Box>;
            },
         }),
         columnHelper.accessor('updatedAt', {
            header: () => <Box textAlign="center">Cập nhật</Box>,
            cell: ({ row }) => {
               return <Box textAlign="center">{format(row.getValue('updatedAt'), 'yyyy-MM-dd')}</Box>;
            },
         }),
         columnHelper.accessor('_id', {
            header: 'Thao tác',
            cell: ({ row }) => {
               return (
                  <Box>
                     <PermissionAccessRoute module={MODULE_PAGE.SUPPLIES_INVOICES} action="DELETE">
                        <CoreTableActionDelete callback={() => {}} />
                     </PermissionAccessRoute>
                     <PermissionAccessRoute module={MODULE_PAGE.SUPPLIES_INVOICES} action="VIEW_ALL">
                        <CoreTableActionEdit
                           callback={() =>
                              navigate(ROUTE_PATH.SUPPLIES_INVOICES + '/' + row.getValue('_id') + '/update')
                           }
                        />
                     </PermissionAccessRoute>
                     <PermissionAccessRoute module={MODULE_PAGE.SUPPLIES_INVOICES} action="VIEW_ONE">
                        <CoreTableActionViewDetail
                           callback={() =>
                              navigate(ROUTE_PATH.SUPPLIES_INVOICES + '/' + row.getValue('_id') + '/details')
                           }
                        />
                     </PermissionAccessRoute>
                  </Box>
               );
            },
         }),
      ];
   }, []);

   return (
      <BaseBreadcrumbs arialabel="Danh sách hóa đơn nhập">
         <PermissionAccessRoute module={MODULE_PAGE.SUPPLIES_INVOICES} action={PAGE_ACTION.CREATE}>
            <Button component={Link} to="create" size="medium">
               Thêm mới
            </Button>
         </PermissionAccessRoute>

         <PageContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <FilterTable sortList={[]} searchType={[]} />
            </Box>

            <TableCore columns={columns} {...data} />
         </PageContent>
      </BaseBreadcrumbs>
   );
};

export default SuppliesInvoices;
