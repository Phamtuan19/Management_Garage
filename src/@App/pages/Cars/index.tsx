/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/naming-convention */
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import ROUTE_PATH from '@App/configs/router-path';
import MODULE_PAGE from '@App/configs/module-page';
import { IMaterialsCatalog } from '@App/services/materialsCatalog.service';
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
import { Link, useNavigate } from 'react-router-dom';
import useCoreTable from '@App/hooks/useCoreTable';
import PAGE_ACTION from '@App/configs/page-action';
import carsService from '@App/services/cars.service';

const MaterialsCatalog = () => {
   const navigate = useNavigate();
   const queryTable = useQuery(['getListCars'], async () => {
      const res = await carsService.get();
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
            header: 'Tên xe',
         }),
         columnHelper.accessor('brand_car', {
            header: 'Thương hiệu xe',
         }),
         columnHelper.accessor('license_plate', {
            header: 'Biển số xe',
         }),
         columnHelper.accessor('production_year', {
            header: 'Năm sản xuất',
         }),
         columnHelper.accessor('car_color', {
            header: 'Màu xe',
         }),
         columnHelper.accessor('car_type', {
            header: 'Loại xe',
         }),
         columnHelper.accessor('status', {
            header: 'Trạng thái',
         }),
         columnHelper.accessor('_id', {
            header: 'Thao tác',
            cell: ({ row }) => {
               const cars = row.original as IMaterialsCatalog;
               return (
                  <Box>
                     <PermissionAccessRoute module={MODULE_PAGE.CARS} action="VIEW_ONE">
                        <CoreTableActionViewDetail
                           callback={() => navigate(ROUTE_PATH.CARS + '/' + cars._id + '/details')}
                        />
                     </PermissionAccessRoute>
                     <CoreTableActionDelete />
                     <CoreTableActionEdit callback={() => navigate(ROUTE_PATH.CARS + '/' + cars._id + '/update')} />
                  </Box>
               );
            },
         }),
      ];
   }, []);

   return (
      <BaseBreadcrumbs arialabel="Thông tin xe">
         <Box>
            <TextField size="small" label="Tìm kiếm" />
            <PermissionAccessRoute module={MODULE_PAGE.CARS} action={PAGE_ACTION.CREATE}>
               <Button sx={{ float: 'right' }} component={Link} to="create" size="medium">
                  Thêm thông tin xe
               </Button>
            </PermissionAccessRoute>
         </Box>
         <TableCore columns={columns} {...data} />
      </BaseBreadcrumbs>
   );
};

export default MaterialsCatalog;
