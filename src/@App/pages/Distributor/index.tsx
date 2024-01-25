/* eslint-disable @typescript-eslint/naming-convention */
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import ROUTE_PATH from '@App/configs/router-path';
import MODULE_PAGE from '@App/configs/module-page';
import TableCore, { columnHelper } from '@Core/Component/Table';
import {
   CoreTableActionDelete,
   CoreTableActionEdit,
   CoreTableActionViewDetail,
} from '@Core/Component/Table/components/CoreTableAction';
import { Box, Button, TextField } from '@mui/material';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useCoreTable from '@App/hooks/useCoreTable';
import distributorService, { IDistributors } from '@App/services/distributor.service';

const Distributors = () => {
   const navigate = useNavigate();
   const queryTable = useQuery(['getListDistribtutors'], async () => {
      const res = await distributorService.get();
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
         }),
         columnHelper.accessor('bankAcountId', {
            header: 'ID tài khoản ngân hàng',
         }),
         columnHelper.accessor('_id', {
            header: 'Thao tác',
            cell: ({ row }) => {
               const material = row.original as IDistributors;
               return (
                  <Box>
                     <PermissionAccessRoute module={MODULE_PAGE.DISTRIBUTORS} action="VIEW_ONE">
                        <CoreTableActionViewDetail
                           callback={() => navigate(ROUTE_PATH.DISTRIBUTORS + '/' + material._id + '/details')}
                        />
                     </PermissionAccessRoute>
                     <CoreTableActionDelete />
                     <CoreTableActionEdit
                        callback={() => navigate(ROUTE_PATH.DISTRIBUTORS + '/' + material._id)}
                     />
                  </Box>
               );
            },
         }),
      ];
   }, []);

   return (
      <BaseBreadcrumbs arialabel="Danh sách nhà phân phối">
         <Box>
            <TextField size="small" label="Tìm kiếm" />
            <Button>
               Thêm mới
            </Button>
         </Box>
         <TableCore columns={columns} {...data} />
      </BaseBreadcrumbs>
   );
};

export default Distributors;
