/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/naming-convention */
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import ROUTE_PATH from '@App/configs/router-path';
import MODULE_PAGE from '@App/configs/module-page';
import PAGE_ACTION from '@App/configs/page-action';
import TableCore, { columnHelper } from '@Core/Component/Table';
import {
   CoreTableActionDelete,
   CoreTableActionEdit,
   CoreTableActionViewDetail,
} from '@Core/Component/Table/components/CoreTableAction';
import { Box, Button } from '@mui/material';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useCoreTable from '@App/hooks/useCoreTable';
import distributorService, { IDistributor } from '@App/services/distributor.service';
import { Link } from 'react-router-dom';
import useSearchParamsHook from '@App/hooks/useSearchParamsHook';

const Distributors = () => {
   const navigate = useNavigate();
   const { searchParams } = useSearchParamsHook();

   const queryTable = useQuery(['getListDistribtutors', searchParams], async () => {
      const res = await distributorService.get(searchParams);

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
         columnHelper.accessor('name', {
            header: 'Tên nhà phân phối',
         }),
         columnHelper.accessor('phone', {
            header: 'Số điện thoại',
         }),
         columnHelper.accessor('email', {
            header: 'Địa chỉ email',
         }),
         columnHelper.accessor('address', {
            header: 'Địa chỉ',
            cell: ({ row }) => {
               const distributor = row.original as IDistributor;
               return (
                  <Box display="flex" alignItems="center" gap={1}>
                     <Box component="span">
                        {distributor?.address?.province?.name ? distributor?.address?.province?.name + ' -' : ''}
                     </Box>
                     <Box component="span">
                        {distributor?.address?.district?.name ? distributor?.address?.district?.name + ' -' : ''}
                     </Box>
                     <Box component="span">{distributor?.address?.wards?.name}</Box>
                  </Box>
               );
            },
         }),
         columnHelper.accessor('_id', {
            header: 'Thao tác',
            cell: ({ row }) => {
               const distributor = row.original as IDistributor;
               return (
                  <Box>
                     <PermissionAccessRoute module={MODULE_PAGE.DISTRIBUTORS} action="VIEW_ONE">
                        <CoreTableActionViewDetail
                           callback={() => navigate(ROUTE_PATH.DISTRIBUTORS + '/' + distributor._id + '/details')}
                        />
                     </PermissionAccessRoute>
                     <CoreTableActionDelete />
                     <CoreTableActionEdit
                        callback={() => navigate(ROUTE_PATH.DISTRIBUTORS + '/' + distributor._id + '/update')}
                     />
                  </Box>
               );
            },
         }),
      ];
   }, []);

   return (
      <BaseBreadcrumbs arialabel="Danh sách nhà phân phối">
         <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
            <PermissionAccessRoute module={MODULE_PAGE.DISTRIBUTORS} action={PAGE_ACTION.CREATE}>
               <Button component={Link} to="create" size="medium">
                  Thêm mới
               </Button>
            </PermissionAccessRoute>
         </Box>
         <TableCore columns={columns} {...data} />
      </BaseBreadcrumbs>
   );
};

export default Distributors;
