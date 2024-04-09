/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/naming-convention */
import FilterTable from '@App/component/common/FilterTable';
import MODULE_PAGE from '@App/configs/module-page';
import ROUTE_PATH from '@App/configs/router-path';
import useCoreTable from '@App/hooks/useCoreTable';
import useSearchParamsHook from '@App/hooks/useSearchParamsHook';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import suppliesService, { ReadSupplies } from '@App/services/supplies.service';
import TableCore, { columnHelper } from '@Core/Component/Table';
import { CoreTableActionEdit, CoreTableActionViewDetail } from '@Core/Component/Table/components/CoreTableAction';
import formatDateTime from '@Core/Helper/formatDateTime';
import { Box, Chip } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

const searchType = [
   {
      title: 'Mã',
      value: 'code',
   },
   {
      title: 'Nhóm vật tư',
      value: 'name_supplie',
   },
   {
      title: 'Tên vật tư',
      value: 'name_detail',
   },
   {
      title: 'Nhà cung cấp',
      value: 'name_distributor',
   },
];

const sortList = [
   {
      title: 'Mã',
      value: 'code',
   },
   {
      title: 'Nhóm',
      value: 'name_supplie',
   },
   {
      title: 'Tên',
      value: 'name_detail',
   },
   {
      title: 'Nhà cung cấp',
      value: 'name_distributor',
   },
   {
      title: 'Trạng thái',
      value: 'isInStock',
   },
   {
      title: 'Thời gian',
      value: 'createdAt',
   },
];

const SuppliesList = () => {
   const navigate = useNavigate();

   const { searchParams } = useSearchParamsHook();

   const queryTable = useQuery(['getListSupplies', searchParams], async () => {
      const res = await suppliesService.get(searchParams);
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
            cell: (info) => <Box sx={{ textAlign: 'center' }}>#{info.getValue()}</Box>,
         }),
         columnHelper.accessor('name_supplie', {
            header: 'Nhóm vật tư',
         }),
         columnHelper.accessor('name_detail', {
            header: 'Tên vật tư',
            cell: (info) => (
               <Box sx={{ textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '250px' }}>{info.getValue()}</Box>
            ),
         }),
         columnHelper.accessor('name_distributor', {
            header: 'Nhà cung cấp',
            cell: (info) => (
               <Box sx={{ textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '250px' }}>{info.getValue()}</Box>
            ),
         }),
         columnHelper.accessor('total_quantity_sold', {
            header: () => <Box textAlign="center">Số lượng tồn</Box>,
            cell: (info) => {
               return (
                  <Box display="flex" justifyContent="center">
                     <Chip label={info.getValue()} color="info" />
                  </Box>
               );
            },
         }),
         columnHelper.accessor('unit', {
            header: () => <Box textAlign="center">Dvt</Box>,
            cell: (info) => {
               return (
                  <Box display="flex" justifyContent="center">
                     <Chip label={info.getValue()} color="default" sx={{ width: '80px' }} />
                  </Box>
               );
            },
         }),
         columnHelper.accessor('isInStock', {
            header: () => <Box textAlign="center">Trạng thái</Box>,
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
         columnHelper.accessor('createdAt', {
            header: () => <Box textAlign="center">Ngày tạo</Box>,
            cell: ({ row }) => {
               return <Box textAlign="center">{formatDateTime(row.getValue('createdAt'))}</Box>;
            },
         }),
         columnHelper.accessor('', {
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
                     {/* <PermissionAccessRoute module={MODULE_PAGE.SUPPLIES} action="DELETE">
                      <CoreTableActionDelete />
                   </PermissionAccessRoute> */}
                     <PermissionAccessRoute module={MODULE_PAGE.SUPPLIES} action="UPDATE">
                        <CoreTableActionEdit
                           callback={() => navigate(ROUTE_PATH.SUPPLIES + '/' + supplies.supplies_id + '/update')}
                        />
                     </PermissionAccessRoute>
                  </Box>
               );
            },
         }),
      ];
   }, []);

   return (
      <>
         <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <FilterTable sortList={sortList} searchType={searchType} />
         </Box>
         <TableCore height={380} columns={columns as never} {...data} />
      </>
   );
};

export default SuppliesList;
