/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/naming-convention */
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import suppliesService, { ReadSupplies } from '@App/services/supplies.service';
import ROUTE_PATH from '@App/configs/router-path';
import MODULE_PAGE from '@App/configs/module-page';
import TableCore, { columnHelper } from '@Core/Component/Table';
import {
   CoreTableActionDelete,
   CoreTableActionEdit,
   CoreTableActionViewDetail,
} from '@Core/Component/Table/components/CoreTableAction';
import { Box, Button, Chip, Typography } from '@mui/material';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCoreTable from '@App/hooks/useCoreTable';
import PageContent from '@App/component/customs/PageContent';
import FilterTable from '@App/component/common/FilterTable';

const sortList = [
   {
      title: 'Tên',
      value: 'full_name',
   },
   {
      title: 'Email',
      value: 'email',
   },
   {
      title: 'Số điện thoại',
      value: 'phone',
   },
];

const Supplies = () => {
   const navigate = useNavigate();
   const queryTable = useQuery(['getListSupplies'], async () => {
      const res = await suppliesService.get();
      return res.data;
   });
   const data = useCoreTable(queryTable);

   const columns = useMemo(() => {
      return [
         columnHelper.accessor((_, index) => index + 1, {
            id: 'STT',
            header: () => <Box sx={{ textAlign: 'center' }}>STT</Box>,
            cell: (info) => <Box sx={{ textAlign: 'center' }}>{info.getValue()}</Box>,
         }),
         columnHelper.accessor('code', {
            header: () => <Box sx={{ textAlign: 'center' }}>Mã</Box>,
            cell: (info) => <Box sx={{ textAlign: 'center' }}>{info.getValue()}</Box>,
         }),
         columnHelper.accessor('name_supplie', {
            header: 'Nhóm vật tư',
         }),
         columnHelper.accessor('name_detail', {
            header: 'Tên vật tư',
         }),
         columnHelper.accessor('name_distributor', {
            header: 'Nhà cung cấp',
         }),
         columnHelper.accessor('unit', {
            header: 'DVT',
         }),
         columnHelper.accessor('discount', {
            header: () => <Typography textAlign="center">Giảm giá</Typography>,
            cell: ({ row }) => {
               const supplies = row.original as ReadSupplies;
               return <Typography textAlign="center">{supplies.discount}%</Typography>;
            },
         }),
         columnHelper.accessor('isInStock', {
            header: () => <Typography textAlign="center">Mô tả</Typography>,
            cell: ({ row }) => {
               const supplies = row.original as ReadSupplies;

               return (
                  <Box display="flex" justifyContent="center">
                     <Chip
                        label={supplies.isInStock ? 'Còn hàng' : 'Hết hàng'}
                        color={!supplies.isInStock ? 'error' : 'success'}
                     />
                  </Box>
               );
            },
         }),
         columnHelper.accessor('_id', {
            header: 'Thao tác',
            cell: ({ row }) => {
               const supplies = row.original as ReadSupplies;

               return (
                  <Box>
                     <PermissionAccessRoute module={MODULE_PAGE.SUPPLIES} action="VIEW_ONE">
                        <CoreTableActionViewDetail
                           callback={() => navigate(ROUTE_PATH.SUPPLIES + '/' + supplies.supplies_id + '/details')}
                        />
                     </PermissionAccessRoute>
                     <PermissionAccessRoute module={MODULE_PAGE.SUPPLIES} action="DELETE">
                        <CoreTableActionDelete />
                     </PermissionAccessRoute>

                     <CoreTableActionEdit
                        callback={() => navigate(ROUTE_PATH.SUPPLIES + '/' + supplies._id + '/update')}
                     />
                  </Box>
               );
            },
         }),
      ];
   }, []);
   return (
      <BaseBreadcrumbs arialabel="Danh sách vật tư">
         <Box display="flex" gap={1} alignItems="center">
            <PermissionAccessRoute module={MODULE_PAGE.SUPPLIES} action="CREATE">
               <Button component={Link} to="create" size="medium">
                  Thêm mới
               </Button>
            </PermissionAccessRoute>

            <PermissionAccessRoute module={MODULE_PAGE.SUPPLIES} action="CREATE">
               <Button
                  component={Link}
                  to={ROUTE_PATH.SUPPLIES_INVOICES + ROUTE_PATH.CREATE}
                  size="medium"
                  color="secondary"
               >
                  Hóa đơn nhập
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

export default Supplies;
