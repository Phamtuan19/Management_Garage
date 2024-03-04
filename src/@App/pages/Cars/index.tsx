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
import { Box, Button, Chip } from '@mui/material';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCoreTable from '@App/hooks/useCoreTable';
import carsService from '@App/services/cars.service';
import { CAR_STATUS } from '@App/configs/status-config';
import FilterTable from '@App/component/common/FilterTable';
import PAGE_ACTION from '@App/configs/page-action';
import PageContent from '@App/component/customs/PageContent';

const sortList = [
   {
      title: 'Tên',
      value: 'name',
   },
   {
      title: 'Trạng thái',
      value: 'status',
   },
   {
      title: 'Loại xe',
      value: 'car_type',
   },
   {
      title: 'Thương hiệu',
      value: 'brand_car',
   },
   {
      title: 'Năm sản xuất',
      value: 'production_year',
   },
];

const MaterialsCatalog = () => {
   const navigate = useNavigate();

   const queryTable = useQuery(['getListCars'], async () => {
      const res = await carsService.get();
      return res.data;
   });

   const data = useCoreTable(queryTable);

   const columns = useMemo(() => {
      return [
         
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
            cell: ({ row }) => {
               const car = row.original as IMaterialsCatalog;
               return <Chip label={CAR_STATUS[car.status].title} color={CAR_STATUS[car.status].color} />;
            },
         }),
         columnHelper.accessor('_id', {
            header: 'Thao tác',
            cell: ({ row }) => {
               const car = row.original as IMaterialsCatalog;
               return (
                  <Box>
                     <PermissionAccessRoute module={MODULE_PAGE.CARS} action="VIEW_ONE">
                        <CoreTableActionViewDetail
                           callback={() => navigate(ROUTE_PATH.CARS + '/' + car._id + '/details')}
                        />
                     </PermissionAccessRoute>
                     <CoreTableActionDelete />
                     <CoreTableActionEdit callback={() => navigate(ROUTE_PATH.CARS + '/' + car._id + '/update')} />
                  </Box>
               );
            },
         }),
      ];
   }, []);

   return (
      <BaseBreadcrumbs arialabel="Thông tin xe">
         <Box>
            <PermissionAccessRoute module={MODULE_PAGE.CARS} action={PAGE_ACTION.CREATE}>
               <Button component={Link} to="create" size="medium">
                  Thêm mới
               </Button>
            </PermissionAccessRoute>
         </Box>

         <PageContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <FilterTable sortList={sortList} searchType={sortList} />

               {/* <Button component={Link} to="create" endIcon={<AddIcon />}>
                  Thêm mới
               </Button> */}
            </Box>
            <TableCore columns={columns} {...data} />
         </PageContent>
      </BaseBreadcrumbs>
   );
};

export default MaterialsCatalog;
