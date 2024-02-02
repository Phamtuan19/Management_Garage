/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/naming-convention */
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import suppliesService, { Supplies } from '@App/services/supplies.service';
import ROUTE_PATH from '@App/configs/router-path';
import MODULE_PAGE from '@App/configs/module-page';
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
import { Link, useNavigate } from 'react-router-dom';
import useCoreTable from '@App/hooks/useCoreTable';
import PageContent from '@App/component/customs/PageContent';

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
         columnHelper.accessor('name', {
            header: 'Tên vật tư',
         }),
         columnHelper.accessor('unit', {
            header: 'Đơn vị vật tư',
         }),
         columnHelper.accessor('discount', {
            header: 'Giảm giá',
         }),
         columnHelper.accessor('describe', {
            header: 'Mô tả',
         }),
         columnHelper.accessor('_id', {
            header: 'Thao tác',
            cell: ({ row }) => {
               const supplies = row.original as Supplies;
               return (
                  <Box>
                     <PermissionAccessRoute module={MODULE_PAGE.SUPPLIES} action="VIEW_ONE">
                        <CoreTableActionViewDetail
                           callback={() => navigate(ROUTE_PATH.SUPPLIES + '/' + supplies._id + '/details')}
                        />
                     </PermissionAccessRoute>
                     <CoreTableActionDelete />
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
                  Thêm mới vật tư
               </Button>
            </PermissionAccessRoute>

            <PermissionAccessRoute module={MODULE_PAGE.SUPPLIES} action="CREATE">
               <Button
                  component={Link}
                  to={ROUTE_PATH.SUPPLIES_INVOICES + ROUTE_PATH.CREATE}
                  size="medium"
                  color="secondary"
               >
                  Nhập vật tư
               </Button>
            </PermissionAccessRoute>
         </Box>
         <PageContent>
            <TableCore columns={columns} {...data} />
         </PageContent>
      </BaseBreadcrumbs>
   );
};

export default Supplies;
