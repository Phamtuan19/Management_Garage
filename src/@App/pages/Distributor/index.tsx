/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/naming-convention */
import BaseBreadcrumbs from '@App/component/customs/BaseBreadcrumbs';
import ROUTE_PATH from '@App/configs/router-path';
import MODULE_PAGE from '@App/configs/module-page';
import TableCore, { columnHelper } from '@Core/Component/Table';
import { CoreTableActionEdit, CoreTableActionViewDetail } from '@Core/Component/Table/components/CoreTableAction';
import { Box, Button, Chip } from '@mui/material';
import PermissionAccessRoute from '@App/routes/components/PermissionAccessRoute';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useCoreTable from '@App/hooks/useCoreTable';
import distributorService, { IDistributor } from '@App/services/distributor.service';
import { Link } from 'react-router-dom';
import useSearchParamsHook from '@App/hooks/useSearchParamsHook';
import PageContent from '@App/component/customs/PageContent';
import FilterTable from '@App/component/common/FilterTable';

const sortOptions = [
   {
      title: 'Mã',
      value: 'code',
   },
   {
      title: 'Tên nhà phân phối',
      value: 'name',
   },
   {
      title: 'Số điện thoại',
      value: 'phone',
   },
];
const sortList = [
   {
      title: 'Mã',
      value: 'code',
   },
   {
      title: 'Tên nhà phân phối',
      value: 'name',
   },
   {
      title: 'Số điện thoại',
      value: 'phone',
   },
   {
      title: 'Email',
      value: 'email',
   },
];

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
            cell: (info) => (
               <Box sx={{ maxWidth: 300, textOverflow: 'ellipsis', overflow: 'hidden' }}>{info.getValue()}</Box>
            ),
         }),
         columnHelper.accessor('phone', {
            header: 'Số điện thoại',
         }),
         columnHelper.accessor('email', {
            header: 'Địa chỉ email',
         }),
         columnHelper.accessor('materials_catalogs', {
            header: 'Danh mục',
            cell: ({ row }) => {
               const distributor = row.original as IDistributor;
               return (
                  <Box display="flex" alignItems="center" flexWrap="wrap" maxWidth="250px" gap={1}>
                     {distributor.materials_catalogs.map((item) => {
                        return <Chip label={item.name} color="info" />;
                     })}
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
                     {/* <CoreTableActionDelete /> */}
                     <PermissionAccessRoute module={MODULE_PAGE.DISTRIBUTORS} action="UPDATE">
                        <CoreTableActionEdit
                           callback={() => navigate(ROUTE_PATH.DISTRIBUTORS + '/' + distributor._id + '/update')}
                        />
                     </PermissionAccessRoute>
                  </Box>
               );
            },
         }),
      ];
   }, []);

   return (
      <BaseBreadcrumbs arialabel="Nhà phân phối">
         <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <PermissionAccessRoute module={MODULE_PAGE.DISTRIBUTORS} action="CREATE">
               <Button component={Link} to="create" size="medium">
                  Thêm mới
               </Button>
            </PermissionAccessRoute>
         </Box>
         <PageContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <FilterTable sortList={sortOptions} searchType={sortList} />
            </Box>
            <TableCore columns={columns} {...data} />
         </PageContent>
      </BaseBreadcrumbs>
   );
};

export default Distributors;
